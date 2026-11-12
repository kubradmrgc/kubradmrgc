const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");

const outDir = path.join(__dirname, "..", "assets");
const FONT = "Segoe UI, Ubuntu, Helvetica, Arial, sans-serif";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function png(name, svg, width) {
  const rendered = new Resvg(svg, { fitTo: { mode: "width", value: width } })
    .render()
    .asPng();
  fs.writeFileSync(path.join(outDir, name), rendered);
  console.log("wrote", name, rendered.length);
}

png(
  "header.png",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 220" width="1100" height="220">
  <defs>
    <linearGradient id="banner" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <path fill="url(#banner)" d="M0,0 H1100 V168 C920,208 730,128 550,168 C370,208 180,128 0,168 Z"/>
  <text x="550" y="86" text-anchor="middle" font-family="${FONT}" font-size="48" font-weight="700" fill="#ffffff">${esc("K\u00fcbra Demirg\u00fc\u00e7")}</text>
  <text x="550" y="122" text-anchor="middle" font-family="${FONT}" font-size="17" fill="#f5d0fe">${esc("Software Engineer \u00b7 Backend & Full-Stack")}</text>
</svg>`,
  1100
);

png(
  "footer.png",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 120" width="1100" height="120">
  <defs>
    <linearGradient id="foot" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <path fill="url(#foot)" d="M0,52 C180,12 370,92 550,52 C730,12 920,92 1100,52 V120 H0 Z"/>
</svg>`,
  1100
);

png(
  "live-banner.png",
  `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="84" viewBox="0 0 720 84">
  <rect x="1.5" y="1.5" width="717" height="81" rx="16" fill="#0d1117" stroke="#a855f7" stroke-width="1.5"/>
  <text x="28" y="34" font-family="${FONT}" font-size="11" font-weight="700" letter-spacing="2" fill="#c084fc">PORTFOLIO</text>
  <text x="28" y="60" font-family="${FONT}" font-size="20" font-weight="700" fill="#f0f6fc">${esc("kubradmrgc.github.io/portfolio  \u2192")}</text>
</svg>`,
  720
);

function card(file, { title, line1, line2, stack, tag, accent, dot }) {
  const tagWidth = tag.length * 7 + 22;
  png(
    file,
    `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="150" viewBox="0 0 420 150">
  <rect x="1.5" y="1.5" width="417" height="147" rx="14" fill="#0d1117" stroke="${accent}" stroke-width="1.5"/>
  <text x="22" y="40" font-family="${FONT}" font-size="18" font-weight="700" fill="${accent}">${esc(title)}</text>
  <rect x="${398 - tagWidth}" y="22" width="${tagWidth}" height="24" rx="12" fill="none" stroke="${accent}" stroke-opacity="0.6"/>
  <text x="${398 - tagWidth / 2}" y="38" text-anchor="middle" font-family="${FONT}" font-size="11" font-weight="600" fill="${accent}">${esc(tag)}</text>
  <text x="22" y="72" font-family="${FONT}" font-size="13" fill="#e6edf3">${esc(line1)}</text>
  <text x="22" y="92" font-family="${FONT}" font-size="13" fill="#8b949e">${esc(line2)}</text>
  <circle cx="28" cy="123" r="5" fill="${dot}"/>
  <text x="40" y="127" font-family="${FONT}" font-size="12" fill="#c9d1d9">${esc(stack)}</text>
</svg>`,
    420
  );
}

card("card-terravision.png", {
  title: "TerraVision",
  tag: "Full-stack",
  line1: "Plant marketplace with AR product preview",
  line2: "One API for web and mobile, real-time updates",
  stack: "ASP.NET Core 9 \u00b7 Next.js \u00b7 React Native",
  accent: "#67e8f9",
  dot: "#512BD4",
});

card("card-cve.png", {
  title: "CVE Analysis Assistant",
  tag: "AI \u00b7 Security",
  line1: "LLM-powered vulnerability triage",
  line2: "NVD sync, risk scoring, vector search",
  stack: "FastAPI \u00b7 PostgreSQL / pgvector \u00b7 React",
  accent: "#c084fc",
  dot: "#3572A5",
});

card("card-taksimetre.png", {
  title: "Taksimetre",
  tag: "Live demo",
  line1: "Taxi fare calculator for all 81 provinces",
  line2: "Live GPS trips, route map, installable PWA",
  stack: "JavaScript \u00b7 PWA",
  accent: "#fde047",
  dot: "#f1e05a",
});

card("card-portfolio.png", {
  title: "Portfolio",
  tag: "Live site",
  line1: "Personal engineering portfolio",
  line2: "Selected work, experience and contact",
  stack: "React \u00b7 TypeScript \u00b7 Vite \u00b7 Tailwind",
  accent: "#f9a8d4",
  dot: "#3178c6",
});

const badges = [
  [["Python", "#3776AB"], ["FastAPI", "#009688"], ["C#", "#239120"], [".NET", "#512BD4"], ["Go", "#00ADD8"], ["TypeScript", "#3178C6"], ["Next.js", "#000000"], ["React", "#20232A", "#61DAFB"], ["React Native", "#0EA5E9"]],
  [["PostgreSQL", "#4169E1"], ["SQL Server", "#CC2927"], ["Docker", "#2496ED"], ["SignalR", "#0EA5E9"], ["Git", "#F05032"], ["GitHub Actions", "#181717"]],
];

function badgeRow(row, y, totalWidth) {
  const widths = row.map(([label]) => label.length * 8 + 28);
  const gap = 10;
  const rowWidth = widths.reduce((a, b) => a + b, 0) + gap * (row.length - 1);
  let x = (totalWidth - rowWidth) / 2;
  return row
    .map(([label, bg, fg = "#ffffff"], i) => {
      const w = widths[i];
      const out = `<rect x="${x}" y="${y}" width="${w}" height="32" rx="8" fill="${bg}"/>
  <text x="${x + w / 2}" y="${y + 21}" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="600" fill="${fg}">${esc(label)}</text>`;
      x += w + gap;
      return out;
    })
    .join("\n  ");
}

png(
  "tech.png",
  `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="100" viewBox="0 0 960 100">
  ${badgeRow(badges[0], 8, 960)}
  ${badgeRow(badges[1], 56, 960)}
</svg>`,
  960
);
