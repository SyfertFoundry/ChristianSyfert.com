/**
 * Frees the dev port and clears orphaned Next.js workers before `next dev`,
 * so the server always starts on the same predictable port instead of hopping
 * (3000 → 3001 → 3002 …) when a previous run left a worker behind.
 *
 * Usage (via package.json):
 *   node scripts/dev-clean.mjs            # free the port, then dev starts
 *   node scripts/dev-clean.mjs --reset    # also wipe .next (fixes module errors)
 *
 * Pass a port with PORT=4000 npm run dev. Defaults to 3001.
 */
import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

const PORT = Number(process.env.PORT) || 3001;
const reset = process.argv.includes("--reset");

const quiet = (cmd) => {
  try {
    execSync(cmd, { stdio: "ignore" });
  } catch {
    // best-effort: the tool may be missing or nothing was listening
  }
};

// Kill anything bound to the port, plus any stray Next workers (the usual
// culprit behind port-hopping after an unclean shutdown).
quiet(`fuser -k ${PORT}/tcp`);
quiet(`pkill -9 -f next-server`);

// `next build` and `next dev` share .next; running a build while dev is up can
// corrupt it ("Cannot find module './###.js'"). --reset clears it.
if (reset) {
  rmSync(".next", { recursive: true, force: true });
  console.log("✓ Removed .next");
}

console.log(`✓ Freed port ${PORT}. Starting dev server…`);
