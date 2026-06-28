// Concatenates the CSS modules in css/ back into styles.css, in cascade order.
// styles.css is a BUILD ARTIFACT — edit the modules in css/, not styles.css.
//
// Run:  node scripts/build-css.js   (also runs automatically via `npm start`)

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "css");
const OUT = path.join(ROOT, "styles.css");

// Cascade order — must not change without understanding CSS specificity impact.
const ORDER = [
  "tokens.css",
  "base.css",
  "modals.css",
  "forms.css",
  "animations.css",
  "chat.css",
  "desktop-icons.css",
  "window.css",
  "windows-content.css",
  "terminal.css",
  "taskbar.css",
  "effects.css",
  "responsive.css",
  "about-theme.css",
];

function build() {
  const missing = ORDER.filter(
    (name) => !fs.existsSync(path.join(SRC_DIR, name))
  );
  if (missing.length) {
    console.error("Missing CSS modules:", missing.join(", "));
    process.exit(1);
  }

  const css = ORDER.map((name) =>
    fs.readFileSync(path.join(SRC_DIR, name), "utf8")
  ).join("");

  fs.writeFileSync(OUT, css, "utf8");
  console.log("Built styles.css from css/*.css");
}

build();
