// Legacy parity + no-BigInt smoke test (additive only).
// Usage: node scripts/smoke-legacy.js
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.join(__dirname, "..");
var modern = require(path.join(ROOT, "dist", "index.cjs"));
var legacy = require(path.join(ROOT, "dist", "legacy", "index.cjs"));

var CORPUS = [
    "H2 + O2 -> H2O",
    "Fe + O2 -> Fe2O3",
    "C3H8 + O2 -> CO2 + H2O",
    "C3H8 + O2 + N2 -> CO2 + H2O + N2",
    "MnO4- + H+ + e- -> Mn2+ + H2O",
    "Cr2O7^2- + Fe2+ + H+ -> Cr3+ + Fe3+ + H2O",
    "Fe2+ + Cl- -> FeCl2",
    "[Fe(CN)6]4- + K+ -> K4[Fe(CN)6]",
    "CuSO4·5H2O -> CuSO4 + H2O",
    "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
    "C + O2 -> CO + CO2",
    "KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O",
    "H2 + O2 -> H2O",
    "N2 + H2 -> NH3",
    "CH4 + O2 -> CO2 + H2O",
    "Ag+ + Cl- -> AgCl",
    "Ba2+ + SO4^2- -> BaSO4",
    "H2 + O2 -> H2O",
    "C10H22 + O2 -> CO2 + H2O",
    "C6H6 + O2 -> CO2 + H2O",
    "Fe2O3 + CO -> Fe + CO2",
    "H2O -> H2",
    "Fe -> Au",
    "H2O -> CH4",
    "NaCl -> Na + Cl3",
    "not an equation",
    "H2 + O2",
    "Xx2 + O2 -> H2O",
    "H₂ + O₂ -> H₂O",
    "Fe²⁺ + Cl⁻ -> FeCl₂",
    "CuSO4·5H2O -> CuSO4 + H2O",
    "C-14 + O2 -> CO2",
    "C200H402 + O2 -> CO2 + H2O",
    "C1000H2002 + O2 -> CO2 + H2O",
];
var OPTSETS = [
    {},
    { showOne: false },
    { format: "html" },
    { format: "latex" },
    { analyze: true },
    { mode: "nuclear" },
    { autoComplete: true },
];

function snap(fn) {
    try {
        var r = fn();
        return (
            "OK " +
            r.equation +
            " |" +
            JSON.stringify(r.underdetermined) +
            " |" +
            JSON.stringify(r.warnings)
        );
    } catch (e) {
        return "THROW " + (e && e.code ? e.code : "?") + ":" + (e && e.message);
    }
}

var fails = 0;
for (var i = 0; i < CORPUS.length; i++) {
    for (var k = 0; k < OPTSETS.length; k++) {
        (function (eq, opt) {
            var a = snap(function () {
                return modern.balance(eq, opt);
            });
            var b = snap(function () {
                return legacy.balance(eq, opt);
            });
            if (a !== b) {
                fails++;
                console.log("DIFF " + JSON.stringify(eq) + " " + JSON.stringify(opt));
                console.log("  modern: " + a);
                console.log("  legacy: " + b);
            }
            var c = snap(function () {
                return modern.balanceAll(eq, opt);
            });
            var d = snap(function () {
                return legacy.balanceAll(eq, opt);
            });
            var cn = c;
            var dn = d;
            if (cn !== dn) {
                fails++;
                console.log("DIFF(balanceAll) " + JSON.stringify(eq));
            }
            var ib1 = modern.isBalanced(eq, opt);
            var ib2 = legacy.isBalanced(eq, opt);
            if (ib1 !== ib2) {
                fails++;
                console.log("DIFF(isBalanced) " + JSON.stringify(eq) + " " + ib1 + " vs " + ib2);
            }
        })(CORPUS[i], OPTSETS[k]);
    }
}
console.log("modern-vs-legacy parity fails: " + fails);

// Export-surface check: same keys, no additions/removals.
var mk = Object.keys(modern).sort();
var lk = Object.keys(legacy).sort();
if (JSON.stringify(mk) !== JSON.stringify(lk)) {
    fails++;
    console.log("EXPORT DIFF modern=" + JSON.stringify(mk));
    console.log("EXPORT DIFF legacy=" + JSON.stringify(lk));
} else {
    console.log("exports match (" + mk.length + " keys)");
}

// Sandbox runner: loads a legacy bundle file inside a vm context whose
// globals are stripped to simulate the target engine, then snapshots
// balance()/balanceAll()/isBalanced() over the corpus for comparison.
function runSandbox(file, strip, extraGlobals) {
    var src = fs.readFileSync(file, "utf8");
    var sandbox = {
        module: { exports: {} },
        console: console,
        Math: Math,
        JSON: JSON,
        isFinite: isFinite,
        isNaN: isNaN,
        parseInt: parseInt,
        parseFloat: parseFloat,
    };
    if (extraGlobals) {
        for (var k in extraGlobals) {
            sandbox[k] = extraGlobals[k];
        }
    }
    sandbox.exports = sandbox.module.exports;
    sandbox.global = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(strip, sandbox, { filename: "strip.js" });
    vm.runInContext(src, sandbox, { filename: path.basename(file) });
    return sandbox;
}

function sandboxSnap(api, eq, opt) {
    try {
        var r = api.balance(eq, opt);
        return (
            "OK " +
            r.equation +
            " |" +
            JSON.stringify(r.underdetermined) +
            " |" +
            JSON.stringify(r.warnings)
        );
    } catch (e) {
        return "THROW " + (e && e.code ? e.code : "?") + ":" + (e && e.message);
    }
}

// Variant A: modern engine minus BigInt (detection path).
(function () {
    var box = runSandbox(
        path.join(ROOT, "dist", "legacy", "index.cjs"),
        "var BigInt = undefined;",
        {
            Object: Object,
            Array: Array,
            String: String,
            Number: Number,
            RegExp: RegExp,
            Error: Error,
            TypeError: TypeError,
            RangeError: RangeError,
            Set: Set,
        },
    );
    var api = box.module.exports;
    if (typeof api.balance !== "function") {
        fails++;
        console.log("VARIANT-A EXPORTS MISSING");
        return;
    }
    var bad = 0;
    for (var i = 0; i < CORPUS.length; i++) {
        for (var k = 0; k < OPTSETS.length; k++) {
            (function (eq, opt) {
                var expected = snap(function () {
                    return modern.balance(eq, opt);
                });
                if (sandboxSnap(api, eq, opt) !== expected) {
                    bad++;
                    console.log("VARIANT-A DIFF " + JSON.stringify(eq) + " " + JSON.stringify(opt));
                }
                var aAll, bAll;
                try {
                    aAll = JSON.stringify(
                        modern.balanceAll(eq, opt).map(function (r) {
                            return r.equation;
                        }),
                    );
                } catch (e) {
                    aAll = "THROW " + (e && e.code ? e.code : "?");
                }
                try {
                    bAll = JSON.stringify(
                        api.balanceAll(eq, opt).map(function (r) {
                            return r.equation;
                        }),
                    );
                } catch (e) {
                    bAll = "THROW " + (e && e.code ? e.code : "?");
                }
                if (aAll !== bAll) {
                    bad++;
                    console.log("VARIANT-A balanceAll DIFF " + JSON.stringify(eq));
                }
                if (modern.isBalanced(eq, opt) !== api.isBalanced(eq, opt)) {
                    bad++;
                    console.log("VARIANT-A isBalanced DIFF " + JSON.stringify(eq));
                }
            })(CORPUS[i], OPTSETS[k]);
        }
    }
    try {
        api.balance("Fe -> Au");
        bad++;
        console.log("VARIANT-A: expected throw for Fe -> Au");
    } catch (e) {
        if (!(e instanceof Error) || e.name !== "BalanceError" || e.code !== "UNBALANCEABLE") {
            bad++;
            console.log("VARIANT-A BalanceError shape wrong: " + e);
        }
    }
    fails += bad;
    console.log("variant-A (no BigInt) diffs: " + bad);
})();

// Variant B: ancient engine (no BigInt/Set/Array.from/fromEntries/
// Number statics/String.trim/String.startsWith/Object.keys). Exercises
// every shim in es3-shims.js. Array.prototype/Object statics the bundle
// needs beyond this list do not exist in the bundle's dependency set.
(function () {
    var box = runSandbox(
        path.join(ROOT, "dist", "legacy", "index.cjs"),
        [
            "var BigInt = undefined;",
            "var Set = undefined;",
            "Array.from = undefined;",
            "Array.isArray = undefined;",
            "Object.fromEntries = undefined;",
            "Object.keys = undefined;",
            "Object.create = undefined;",
            "Object.defineProperty = undefined;",
            "Object.getPrototypeOf = undefined;",
            "Object.setPrototypeOf = undefined;",
            "Number.isInteger = undefined;",
            "Number.isFinite = undefined;",
            "Number.MAX_SAFE_INTEGER = undefined;",
            "String.prototype.trim = undefined;",
            "String.prototype.startsWith = undefined;",
            "Function.prototype.bind = undefined;",
            "Array.prototype.map = undefined;",
            "Array.prototype.filter = undefined;",
            "Array.prototype.some = undefined;",
            "Array.prototype.every = undefined;",
            "Array.prototype.forEach = undefined;",
            "Array.prototype.indexOf = undefined;",
            "Array.prototype.reduce = undefined;",
        ].join("\n"),
        {
            Object: Object,
            Array: Array,
            String: String,
            Number: Number,
            RegExp: RegExp,
            Error: Error,
            TypeError: TypeError,
            RangeError: RangeError,
        },
    );
    var api = box.module.exports;
    if (typeof api.balance !== "function") {
        fails++;
        console.log("VARIANT-B EXPORTS MISSING");
        return;
    }
    var bad = 0;
    for (var i = 0; i < CORPUS.length; i++) {
        for (var k = 0; k < OPTSETS.length; k++) {
            (function (eq, opt) {
                var expected = snap(function () {
                    return modern.balance(eq, opt);
                });
                if (sandboxSnap(api, eq, opt) !== expected) {
                    bad++;
                    console.log("VARIANT-B DIFF " + JSON.stringify(eq) + " " + JSON.stringify(opt));
                }
            })(CORPUS[i], OPTSETS[k]);
        }
    }
    // balanceAll/isBalanced parity in the stripped engine.
    for (var j = 0; j < CORPUS.length; j++) {
        (function (eq) {
            var a1, b1;
            try {
                a1 = JSON.stringify(
                    modern.balanceAll(eq).map(function (r) {
                        return r.equation;
                    }),
                );
            } catch (e) {
                a1 = "THROW " + (e && e.code ? e.code : "?");
            }
            try {
                b1 = JSON.stringify(
                    api.balanceAll(eq).map(function (r) {
                        return r.equation;
                    }),
                );
            } catch (e) {
                b1 = "THROW " + (e && e.code ? e.code : "?");
            }
            if (a1 !== b1) {
                bad++;
                console.log("VARIANT-B balanceAll DIFF " + JSON.stringify(eq));
            }
            if (modern.isBalanced(eq) !== api.isBalanced(eq)) {
                bad++;
                console.log("VARIANT-B isBalanced DIFF " + JSON.stringify(eq));
            }
        })(CORPUS[j]);
    }
    // Error contract: code/name survive; instanceof Error survives.
    try {
        api.balance("Fe -> Au");
        bad++;
        console.log("VARIANT-B: expected throw for Fe -> Au");
    } catch (e) {
        if (
            !e ||
            e.name !== "BalanceError" ||
            e.code !== "UNBALANCEABLE" ||
            !(e instanceof Error)
        ) {
            bad++;
            console.log("VARIANT-B BalanceError shape wrong: " + e);
        }
    }
    fails += bad;
    console.log("variant-B (ancient engine) diffs: " + bad);
})();

// Variant C: browser global build via a fake window (classic script).
(function () {
    var src = fs.readFileSync(path.join(ROOT, "dist", "legacy", "fast-balance.global.js"), "utf8");
    var win = {};
    var sandbox = { window: win, console: console };
    sandbox.globalThis = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(src, sandbox, { filename: "fast-balance.global.js" });
    var api = win.FastBalance || sandbox.FastBalance;
    if (!api || typeof api.balance !== "function") {
        fails++;
        console.log("VARIANT-C GLOBAL MISSING");
        return;
    }
    var bad = 0;
    [
        "H2 + O2 -> H2O",
        "Fe2+ + Cl- -> FeCl2",
        "K4Fe(CN)6 + KMnO4 + H2SO4 -> KHSO4 + Fe2(SO4)3 + MnSO4 + HNO3 + CO2 + H2O",
    ].forEach(function (eq) {
        var expected = snap(function () {
            return modern.balance(eq);
        });
        if (sandboxSnap(api, eq, {}) !== expected) {
            bad++;
            console.log("VARIANT-C DIFF " + eq);
        }
    });
    fails += bad;
    console.log("variant-C (browser global) diffs: " + bad);
})();

if (fails > 0) {
    console.log("SMOKE FAILED (" + fails + ")");
    process.exit(1);
}
console.log("SMOKE PASSED");
