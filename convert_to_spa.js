const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src", "pages");
const jsPagesDir = path.join(__dirname, "src", "asset", "js", "pages");

const pages = [
  { name: "home", file: "index.html" },
  { name: "feature", file: "feature.html" },
  { name: "showcase", file: "showcase.html" },
  { name: "pricing", file: "pricing.html" },
];

pages.forEach((page) => {
  const filePath = path.join(srcDir, page.file);
  if (!fs.existsSync(filePath)) {
    console.log(`${filePath} not found`);
    return;
  }
  const content = fs.readFileSync(filePath, "utf8");

  const startIdx = content.indexOf("</nav>");
  const endIdx = content.indexOf('<footer class="footer"');

  if (startIdx === -1 || endIdx === -1) {
    console.log(`Could not find bounds in ${page.file}`);
    return;
  }

  const extracted = content.substring(startIdx + 6, endIdx).trim();
  let jsContent = "";
  const jsPath = path.join(jsPagesDir, `${page.name}.js`);
  if (fs.existsSync(jsPath)) {
    jsContent = fs.readFileSync(jsPath, "utf8");
  }

  const templateStr = `
export const ${page.name}Template = \`
${extracted.replace(/`/g, "\\`")}
\`;

export function init${page.name.charAt(0).toUpperCase() + page.name.slice(1)}() {
${
  page.name === "home" || page.name === "feature" || page.name === "showcase"
    ? `  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  setTimeout(() => {
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 100);`
    : ""
}
}
`;

  fs.writeFileSync(jsPath, jsContent + "\n" + templateStr);
  console.log(`Generated template for ${page.name}`);

  if (page.name !== "home") {
    fs.unlinkSync(filePath);
    console.log(`Deleted ${page.file}`);
  }
});
