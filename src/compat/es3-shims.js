/* fast-balance ES3 compatibility shims (new file, additive only).
 *
 * Pure ES3 syntax (var, function only). Defines missing globals only when
 * absent, scoped to the legacy bundle. Modern bundle is untouched.
 * Cooperates with solver-es3: Set shim exposes _es3Items for Array.from.
 */
var __fb_global = (function () {
    try {
        if (typeof globalThis !== "undefined") {
            return globalThis;
        }
    } catch (e) {}
    try {
        if (typeof global !== "undefined") {
            return global;
        }
    } catch (e) {}
    try {
        if (typeof window !== "undefined") {
            return window;
        }
    } catch (e) {}
    try {
        if (typeof self !== "undefined") {
            return self;
        }
    } catch (e) {}
    try {
        return Function("return this")();
    } catch (e) {
        return {};
    }
})();

(function (G) {
    function def(name, value) {
        try {
            if (typeof G[name] === "undefined") {
                G[name] = value;
            }
        } catch (e) {}
    }
    function defProto(obj, name, fn) {
        try {
            if (obj && typeof obj[name] === "undefined") {
                obj[name] = fn;
            }
        } catch (e) {}
    }

    /* Object.keys (ES5) */
    if (typeof Object === "function" && typeof Object.keys === "undefined") {
        Object.keys = function (o) {
            var out = [];
            if (o === null || o === undefined) {
                return out;
            }
            for (var k in o) {
                if (Object.prototype.hasOwnProperty.call(o, k)) {
                    out.push(k);
                }
            }
            return out;
        };
    }

    /* Array.isArray */
    if (typeof Array !== "undefined" && typeof Array.isArray === "undefined") {
        Array.isArray = function (a) {
            return Object.prototype.toString.call(a) === "[object Array]";
        };
    }

    /* Array.prototype methods (ES5) */
    defProto(Array.prototype, "map", function (fn, self) {
        var out = [];
        for (var i = 0; i < this.length; i++) {
            if (i in this) {
                out[i] = fn.call(self, this[i], i, this);
            }
        }
        out.length = this.length;
        return out;
    });
    defProto(Array.prototype, "filter", function (fn, self) {
        var out = [];
        for (var i = 0; i < this.length; i++) {
            if (i in this && fn.call(self, this[i], i, this)) {
                out.push(this[i]);
            }
        }
        return out;
    });
    defProto(Array.prototype, "some", function (fn, self) {
        for (var i = 0; i < this.length; i++) {
            if (i in this && fn.call(self, this[i], i, this)) {
                return true;
            }
        }
        return false;
    });
    defProto(Array.prototype, "every", function (fn, self) {
        for (var i = 0; i < this.length; i++) {
            if (i in this && !fn.call(self, this[i], i, this)) {
                return false;
            }
        }
        return true;
    });
    defProto(Array.prototype, "forEach", function (fn, self) {
        for (var i = 0; i < this.length; i++) {
            if (i in this) {
                fn.call(self, this[i], i, this);
            }
        }
    });
    defProto(Array.prototype, "indexOf", function (v, from) {
        var i = from ? Number(from) : 0;
        if (i < 0) {
            i = Math.max(0, this.length + i);
        }
        for (; i < this.length; i++) {
            if (i in this && this[i] === v) {
                return i;
            }
        }
        return -1;
    });
    defProto(Array.prototype, "reduce", function (fn, init) {
        var i = 0;
        var acc = init;
        if (arguments.length < 2) {
            while (i < this.length && !(i in this)) {
                i++;
            }
            if (i >= this.length) {
                throw new TypeError("Reduce of empty array");
            }
            acc = this[i++];
        }
        for (; i < this.length; i++) {
            if (i in this) {
                acc = fn(acc, this[i], i, this);
            }
        }
        return acc;
    });

    /* Array.from (ES6) : handles arrays, array-likes, strings, ES3 Set shim */
    if (typeof Array !== "undefined" && typeof Array.from === "undefined") {
        Array.from = function (src, fn, self) {
            if (src === null || src === undefined) {
                throw new TypeError("Array.from of null");
            }
            var out = [];
            var i;
            if (src && src._es3Items) {
                var items = src._es3Items;
                for (i = 0; i < items.length; i++) {
                    out.push(fn ? fn.call(self, items[i], i) : items[i]);
                }
                return out;
            }
            if (typeof src === "string") {
                for (i = 0; i < src.length; i++) {
                    var ch = src.charAt(i);
                    out.push(fn ? fn.call(self, ch, i) : ch);
                }
                return out;
            }
            var len = 0;
            try {
                len = Number(src.length) || 0;
            } catch (e) {
                len = 0;
            }
            if (len > 0 && (typeof src === "object" || typeof src === "function")) {
                for (i = 0; i < len; i++) {
                    var v = src[i];
                    out.push(fn ? fn.call(self, v, i) : v);
                }
                return out;
            }
            if (src && typeof src.forEach === "function" && !src.length) {
                try {
                    src.forEach(function (v, k) {
                        out.push(fn ? fn.call(self, v, out.length) : v);
                    });
                    return out;
                } catch (e) {}
            }
            return out;
        };
    }

    /* Object.defineProperty (ES5): assignment fallback when missing.
     * Needed before Object.create below; the legacy bundle only uses it
     * for metadata (e.g. Symbol.toStringTag on exports). */
    if (typeof Object === "function" && typeof Object.defineProperty === "undefined") {
        Object.defineProperty = function (o, p, d) {
            o[p] = d && "value" in d ? d.value : undefined;
            return o;
        };
    }

    /* Object.create (ES5) */
    if (typeof Object === "function" && typeof Object.create === "undefined") {
        Object.create = function (proto, descriptors) {
            if (proto !== null && typeof proto !== "object" && typeof proto !== "function") {
                throw new TypeError("Object.create prototype must be an object");
            }
            var F = function () {};
            F.prototype = proto;
            var out = new F();
            if (descriptors) {
                for (var k in descriptors) {
                    if (Object.prototype.hasOwnProperty.call(descriptors, k)) {
                        var d = descriptors[k];
                        out[k] = d && "value" in d ? d.value : undefined;
                    }
                }
            }
            return out;
        };
    }

    /* Object.getPrototypeOf (ES5) */
    if (typeof Object === "function" && typeof Object.getPrototypeOf === "undefined") {
        Object.getPrototypeOf = function (o) {
            return o.__proto__ || o.constructor.prototype;
        };
    }

    /* Object.setPrototypeOf (ES6): best effort; silently keeps the object
     * unchanged where __proto__ is unavailable (pre-ES3 engines). */
    if (typeof Object === "function" && typeof Object.setPrototypeOf === "undefined") {
        Object.setPrototypeOf = function (o, p) {
            try {
                o.__proto__ = p;
            } catch (e) {}
            return o;
        };
    }

    /* Function.prototype.bind (ES5): needed by the downlevelled
     * `extends Error` helper in engines without native bind. */
    defProto(Function.prototype, "bind", function (self) {
        var fn = this;
        var pre = [];
        for (var i = 1; i < arguments.length; i++) {
            pre.push(arguments[i]);
        }
        var bound = function () {
            var args = pre.slice(0);
            for (var j = 0; j < arguments.length; j++) {
                args.push(arguments[j]);
            }
            if (this instanceof bound) {
                var out = fn.apply(this, args);
                return Object(out) === out ? out : this;
            }
            return fn.apply(self, args);
        };
        if (fn.prototype) {
            var F = function () {};
            F.prototype = fn.prototype;
            bound.prototype = new F();
        }
        return bound;
    });

    /* Object.fromEntries (ES2019) */
    if (typeof Object === "function" && typeof Object.fromEntries === "undefined") {
        Object.fromEntries = function (entries) {
            var out = {};
            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                out[e[0]] = e[1];
            }
            return out;
        };
    }

    /* String.trim (ES5) */
    defProto(String.prototype, "trim", function () {
        return this.replace(/^\s+|\s+$/g, "");
    });

    /* String.startsWith (ES6) with position arg (used by parse.ts) */
    defProto(String.prototype, "startsWith", function (s, pos) {
        var p = pos ? Number(pos) : 0;
        if (p < 0) {
            p = 0;
        }
        return this.substr(p, String(s).length) === String(s);
    });

    /* Number helpers */
    if (typeof Number !== "undefined") {
        if (typeof Number.isInteger === "undefined") {
            Number.isInteger = function (x) {
                return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
            };
        }
        if (typeof Number.isFinite === "undefined") {
            Number.isFinite = function (x) {
                return typeof x === "number" && isFinite(x);
            };
        }
        if (typeof Number.MAX_SAFE_INTEGER === "undefined") {
            Number.MAX_SAFE_INTEGER = 9007199254740991;
        }
    }

    /* Minimal Set (cooperates with Array.from above) */
    if (typeof G.Set === "undefined") {
        var SetShim = function (init) {
            this._es3Items = [];
            if (init) {
                var arr = init && init._es3Items ? init._es3Items : init;
                var n = 0;
                try {
                    n = arr.length || 0;
                } catch (e) {
                    n = 0;
                }
                for (var i = 0; i < n; i++) {
                    this.add(arr[i]);
                }
            }
        };
        SetShim.prototype.has = function (v) {
            var items = this._es3Items;
            for (var i = 0; i < items.length; i++) {
                if (items[i] === v) {
                    return true;
                }
            }
            return false;
        };
        SetShim.prototype.add = function (v) {
            if (!this.has(v)) {
                this._es3Items.push(v);
            }
            return this;
        };
        SetShim.prototype.forEach = function (fn, self) {
            var items = this._es3Items.slice(0);
            for (var i = 0; i < items.length; i++) {
                fn.call(self, items[i], items[i], this);
            }
        };
        try {
            if (typeof Symbol !== "undefined" && Symbol.iterator) {
                SetShim.prototype[Symbol.iterator] = function () {
                    var items = this._es3Items.slice(0);
                    var i = 0;
                    return {
                        next: function () {
                            if (i < items.length) {
                                return { value: items[i++], done: false };
                            }
                            return { value: undefined, done: true };
                        },
                    };
                };
            }
        } catch (e) {}
        G.Set = SetShim;
    }
})(__fb_global);
