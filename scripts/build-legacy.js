// Legacy ES3 build (additive only). Stages a copy of src/ with the
// exact solver backend swapped for src/compat/solver-es3.ts, bundles it
// with tsdown, then downlevels the bundle to ES3 syntax with SWC.
//
// Usage: node scripts/build-legacy.js
import { execSync } from "node:child_process";
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    readFileSync,
    readdirSync,
    rmSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");
const STAGE = join(ROOT, ".legacy-stage");
const OUT = join(ROOT, "dist", "legacy");

function copy(src, dest) {
    mkdirSync(join(dest, ".."), { recursive: true });
    copyFileSync(src, dest);
}

rmSync(STAGE, { recursive: true, force: true });
rmSync(OUT, { recursive: true, force: true });
mkdirSync(STAGE, { recursive: true });
mkdirSync(OUT, { recursive: true });

// 1. Copy library sources (never touches src/).
for (const f of readdirSync(SRC)) {
    const p = join(SRC, f);
    if (statSync(p).isDirectory()) {
        continue;
    }
    if (f === "solver.ts") {
        continue; // swapped below
    }
    if (f.endsWith(".ts")) {
        copy(p, join(STAGE, f));
    }
}

// 2. Swap in the exact ES3 solver backend (import paths re-rooted).
let solver = readFileSync(join(SRC, "compat", "solver-es3.ts"), "utf8");
solver = solver
    .replace(/from "\.\.\/fraction"/g, 'from "./fraction"')
    .replace(/from "\.\.\/errors"/g, 'from "./errors"')
    .replace(/from "\.\.\/parse"/g, 'from "./parse"');
writeFileSync(join(STAGE, "solver.ts"), solver);

// 2b. SWC lowers `[...setA, ...setB]` to `[].concat(setA, setB)`, which does
// not iterate sets. Rewrite the single set-spread in symbols.ts (src is
// never edited) to forEach accumulation, which is exact in every engine.
const SYM_SRC =
    "const ALLOWED: ReadonlySet<string> = new Set([...REAL_ELEMENTS, ...PSEUDO_ELEMENTS]);";
const SYM_ES3 = [
    "const ALLOWED_MUTABLE: Set<string> = new Set<string>();",
    "REAL_ELEMENTS.forEach(function (s: string): void { ALLOWED_MUTABLE.add(s); });",
    "PSEUDO_ELEMENTS.forEach(function (s: string): void { ALLOWED_MUTABLE.add(s); });",
    "const ALLOWED: ReadonlySet<string> = ALLOWED_MUTABLE;",
].join("\n");
const symPath = join(STAGE, "symbols.ts");
let sym = readFileSync(symPath, "utf8");
if (sym.indexOf(SYM_SRC) < 0) {
    throw new Error("symbols.ts ALLOWED line changed; update stage rewrite");
}
writeFileSync(symPath, sym.replace(SYM_SRC, SYM_ES3));

// 3. Runtime shims (side-effect import, runs first).
copy(join(SRC, "compat", "es3-shims.js"), join(STAGE, "es3-shims.js"));

// 4. Stage entry: shims first, then the unchanged public surface.
writeFileSync(join(STAGE, "entry.ts"), 'import "./es3-shims";\nexport * from "./index";\n');

// 5. Bundle to a single CJS file (still ES2020 syntax).
execSync("npx tsdown --config tsdown.legacy.config.js", { cwd: ROOT, stdio: "inherit" });

const intermediate = join(OUT, "index.cjs");
if (!existsSync(intermediate)) {
    const alt = readdirSync(OUT);
    throw new Error("Legacy bundle missing, dist/legacy holds: " + alt.join(", "));
}

// 6. Downlevel to ES3 with SWC (no .swcrc lookup).
const { transformFile } = await import("@swc/core");
const es3 = await transformFile(intermediate, {
    swcrc: false,
    configFile: false,
    jsc: { target: "es3", parser: { syntax: "ecmascript" }, loose: true },
    module: { type: "commonjs" },
    minify: false,
});
// tsdown's CJS preamble touches Object.defineProperty/Symbol before the
// shims run; guard it so the bundle loads on engines lacking either.
var es3code = es3.code;
var PREAMBLE_RE =
    /Object\.defineProperty\(exports,\s*Symbol\.toStringTag,\s*\{\s*value:\s*['"]Module['"]\s*\}\)/;
if (PREAMBLE_RE.test(es3code)) {
    es3code = es3code.replace(
        PREAMBLE_RE,
        "void (function () { try { Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }); } catch (e0) {} })()",
    );
}
writeFileSync(join(OUT, "index.cjs"), es3code);

// 7. UMD browser build (hand-wrapped, ES3-safe) exposing `FastBalance`.
var es3src = readFileSync(join(OUT, "index.cjs"), "utf8");
if (es3src.indexOf("_es3Items") < 0) {
    throw new Error("Legacy bundle lost es3-shims.js (tree-shaken?); aborting");
}
const cjs = es3src;
const umd =
    "(function (G, F) {\n" +
    'if (typeof module !== "undefined" && module.exports) { module.exports = F(); }\n' +
    'else if (typeof define === "function" && define.amd) { define([], F); }\n' +
    "else { G.FastBalance = F(); }\n" +
    '}(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this, function () {\n' +
    "var module = { exports: {} }; var exports = module.exports;\n" +
    cjs +
    "\nreturn module.exports;\n}));\n";
writeFileSync(join(OUT, "fast-balance.global.js"), umd);

rmSync(STAGE, { recursive: true, force: true });
console.log("legacy ES3 build written to dist/legacy/");
