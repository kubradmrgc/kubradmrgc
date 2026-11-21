const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");
const homeRequire = createRequire("C:\\Users\\hp\\node_modules\\gifenc\\package.json");
const { Resvg } = homeRequire("@resvg/resvg-js");
const { PNG } = homeRequire("pngjs");
const { GIFEncoder, quantize, applyPalette } = homeRequire("gifenc");

const outFile = path.join(__dirname, "..", "assets", "typing.gif");
const WIDTH = 760;
const HEIGHT = 68;

const lines = [
  "Hi, I'm K\u00fcbra.",
  "Software Engineering @ F\u0131rat University",
  "APIs, full-stack apps and desktop systems",
  "Open to internships and junior roles",
];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function frameSvg(typed, cursorOn) {
  const cursor = cursorOn
    ? `<tspan fill="#e879f9">\u258c</tspan>`
    : `<tspan fill="#161b22">\u00a0</tspan>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0d1117"/>
  <rect x="6" y="8" width="${WIDTH - 12}" height="52" rx="12" fill="#161b22" stroke="#a855f7" stroke-width="2"/>
  <text x="28" y="43" font-family="Consolas, Courier New, monospace" font-size="20" font-weight="700" fill="#22d3ee">&gt;</text>
  <text x="52" y="43" font-family="Consolas, Courier New, monospace" font-size="20" font-weight="600" fill="#c084fc">${esc(typed)}${cursor}</text>
</svg>`;
}

function renderRgba(svg) {
  const png = PNG.sync.read(Buffer.from(new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng()));
  return { data: new Uint8Array(png.data), width: png.width, height: png.height };
}

function chars(s) {
  return [...s];
}

const scenes = [];
for (const line of lines) {
  const letters = chars(line);
  for (let i = 1; i <= letters.length; i += 1) {
    scenes.push({ text: letters.slice(0, i).join(""), cursor: true, delay: 70 });
  }
  for (let b = 0; b < 8; b += 1) {
    scenes.push({ text: line, cursor: b % 2 === 0, delay: 180 });
  }
  for (let i = letters.length - 1; i >= 0; i -= 2) {
    scenes.push({ text: letters.slice(0, Math.max(i, 0)).join(""), cursor: true, delay: 35 });
  }
  scenes.push({ text: "", cursor: true, delay: 200 });
}

console.log("frames", scenes.length);
const gif = GIFEncoder();
let palette;
for (let i = 0; i < scenes.length; i += 1) {
  const scene = scenes[i];
  const { data, width, height } = renderRgba(frameSvg(scene.text, scene.cursor));
  if (!palette) palette = quantize(data, 64);
  const index = applyPalette(data, palette);
  gif.writeFrame(index, width, height, { palette, delay: scene.delay, repeat: i === 0 ? 0 : undefined });
  if (i % 40 === 0) console.log("encoded", i);
}
gif.finish();
fs.writeFileSync(outFile, Buffer.from(gif.bytes()));
console.log("wrote", outFile, fs.statSync(outFile).size);
