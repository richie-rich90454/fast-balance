/** Legacy ES3 entry (new file, additive only).
 *
 * Imported first so shims install before library code runs.
 * The legacy build swaps `solver.ts` for `compat/solver-es3.ts`
 * (see `scripts/build-legacy.js`); this file itself is unchanged
 * between modern and legacy builds.
 */
import "./es3-shims";

export * from "../index";
