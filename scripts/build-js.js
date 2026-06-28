// Concatenates the JS modules in js/ back into index.js, in load order.
// index.js is a BUILD ARTIFACT — edit the modules in js/, not index.js.
//
// Run:  node scripts/build-js.js   (also runs automatically via `npm start`)

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "js");
const OUT = path.join(ROOT, "index.js");

// Load order — must not change without understanding runtime dependencies.
const ORDER = [
  "error-suppression.js",
  "windows11-manager.js",
  "power-menu.js",
  "start-menu.js",
  "notifications.js",
  "terminal.js",
  "personal-features.js",
  "bootstrap.js",
];

function build() {
  const missing = ORDER.filter(
    (name) => !fs.existsSync(path.join(SRC_DIR, name))
  );
  if (missing.length) {
    console.error("Missing JS modules:", missing.join(", "));
    process.exit(1);
  }

  const js = ORDER.map((name) =>
    fs.readFileSync(path.join(SRC_DIR, name), "utf8")
  ).join("");

  fs.writeFileSync(OUT, js, "utf8");
  console.log("Built index.js from js/*.js");
}

build();
