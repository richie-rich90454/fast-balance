import { defineConfig } from "tsdown"

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    minify: true,
    target: "es2020",
    sourcemap: false,
    inputOptions: {
        treeshake: true,
    },
})
