// AAA-Or-It-Doesn't-Ship: verify every text/background pairing in the design
// system meets WCAG AAA. Converts OKLCH -> sRGB -> relative luminance -> ratio.
// No dependencies; run with `npm run check:contrast`.

// --- OKLCH -> linear sRGB ---------------------------------------------------
function oklchToLinearSrgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function relativeLuminance(L, C, h) {
  const lin = oklchToLinearSrgb(L, C, h).map((v) => Math.max(0, Math.min(1, v)));
  // WCAG relative luminance uses linear-light sRGB coefficients.
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(fg, bg) {
  const L1 = relativeLuminance(...fg);
  const L2 = relativeLuminance(...bg);
  const [hi, lo] = L1 >= L2 ? [L1, L2] : [L2, L1];
  return (hi + 0.05) / (lo + 0.05);
}

// --- Tokens (keep in sync with app/globals.css @theme) ----------------------
const t = {
  bg: [0.99, 0.005, 215],
  surface: [0.97, 0.008, 215],
  surface2: [0.945, 0.01, 215],
  ink: [0.24, 0.02, 245],
  ink2: [0.42, 0.022, 245],
  sea: [0.46, 0.1, 224],
  seaInk: [0.4, 0.09, 226],
  seaDrench: [0.34, 0.085, 228],
  amberDeep: [0.52, 0.13, 56],
  amberBright: [0.84, 0.11, 74],
  onSea: [0.985, 0.01, 215],
};

// --- Pairings that carry text; each must clear its AAA bar ------------------
const AAA_BODY = 7.0;
const AAA_LARGE = 4.5;

const checks = [
  ["body ink on bg", t.ink, t.bg, AAA_BODY],
  ["body ink on surface", t.ink, t.surface, AAA_BODY],
  ["body ink on surface2", t.ink, t.surface2, AAA_BODY],
  ["secondary ink2 on bg", t.ink2, t.bg, AAA_BODY],
  ["secondary ink2 on surface", t.ink2, t.surface, AAA_BODY],
  ["sea-ink link on bg", t.seaInk, t.bg, AAA_BODY],
  ["sea-ink link on surface", t.seaInk, t.surface, AAA_BODY],
  ["white on sea button (large)", t.onSea, t.sea, AAA_LARGE],
  ["white on sea-drench section", t.onSea, t.seaDrench, AAA_BODY],
  ["amber-bright on sea-drench (large)", t.amberBright, t.seaDrench, AAA_LARGE],
  ["amber-deep on bg (large)", t.amberDeep, t.bg, AAA_LARGE],
  ["ink on amber-bright button", t.ink, t.amberBright, AAA_BODY],
];

let failed = 0;
console.log("\n  WCAG AAA contrast audit\n  " + "-".repeat(48));
for (const [name, fg, bg, bar] of checks) {
  const ratio = contrast(fg, bg);
  const ok = ratio >= bar;
  if (!ok) failed++;
  const tag = ok ? "PASS" : "FAIL";
  console.log(
    `  [${tag}] ${name.padEnd(34)} ${ratio.toFixed(2)}:1 (need ${bar})`,
  );
}
console.log("  " + "-".repeat(48));
if (failed) {
  console.error(`\n  ${failed} pairing(s) below AAA. Fix tokens before shipping.\n`);
  process.exit(1);
}
console.log("\n  All pairings meet WCAG AAA.\n");
