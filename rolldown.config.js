import {defineConfig} from "rolldown"
export default defineConfig([
    {
        input: "src/index.ts",
        output: {
            file: "dist/index.js",
            format: "esm",
            sourcemap: false,
            minify: true,
        },
        target: "es6",
        external: ["chemparse"]
    },
    {
        input: "src/index.ts",
        output: {
            file: "dist/index.cjs",
            format: "cjs",
            sourcemap: false,
            minify: true,
        },
        target: "es6",
        external: ["chemparse"]
    }
])