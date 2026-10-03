import { defineConfig } from "tsdown";

// Legacy staging bundle (ES2020 syntax). scripts/build-legacy.js then
// downlevels the output to ES3 with SWC. Additive only; the modern
// build in tsdown.config.js is untouched.
export default defineConfig({
    entry: { index: "./.legacy-stage/entry.ts" },
    outDir: "dist/legacy",
    format: ["cjs"],
    dts: false,
    minify: true,
    target: "es2020",
    sourcemap: false,
    // Never tree-shake the legacy bundle: src/compat/es3-shims.js works
    // purely through side effects and must survive bundling.
    treeshake: false,
});
