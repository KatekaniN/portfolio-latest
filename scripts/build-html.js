// Builds index.html from src/index.template.html by injecting windows/*.html
// partials at their `<!-- include: windows/NAME.html -->` markers.
// index.html is a BUILD ARTIFACT — edit the template/partials, not index.html.
//
// Run:  node scripts/build-html.js   (also runs automatically via `npm start`)

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE = path.join(ROOT, "src", "index.template.html");
const OUT = path.join(ROOT, "index.html");

const lf = (s) => s.replace(/\r\n/g, "\n");

function build() {
  let html = lf(fs.readFileSync(TEMPLATE, "utf8"));

  html = html.replace(
    /<!--\s*include:\s*(\S+)\s*-->/g,
    (match, includePath) => {
      const filePath = path.join(ROOT, includePath);
      if (!fs.existsSync(filePath)) {
        console.warn("Include not found, skipping:", includePath);
        return "";
      }
      return lf(fs.readFileSync(filePath, "utf8"));
    }
  );

  fs.writeFileSync(OUT, html, "utf8");
  console.log("Built index.html from template + windows/*.html");
}

build();
