const fs = require("fs");
const path = require("path");
const { Resvg } = require("@resvg/resvg-js");

const outDir = path.join(__dirname, "..", "assets");

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
  const file = path.join(outDir, name);
  fs.writeFileSync(file, rendered);
  console.log("wrote", name, rendered.length);
}

const name = "K\u00fcbra Demirg\u00fc\u00e7";
const subtitle = "Yaz\u0131l\u0131m M\u00fchendisli\u011fi \u00b7 Backend & Full-stack";
const hello = "Merhaba, ben K\u00fcbra";
const uni = "F\u0131rat \u00dcniversitesi Yaz\u0131l\u0131m M\u00fchendisli\u011fi";
const role = "Backend API & Full-stack geli\u015ftirici";
const cve1 = "NVD'den CVE \u00e7eker, AI ile \u00f6zetler";
const cve2 = "ve \u00f6nceliklendirir";
const terra1 = "Backend API geli\u015ftirme";
const terra2 = "C# ile servis katman\u0131";
const omdb1 = "Film veritaban\u0131 API entegrasyonu";
const omdb2 = "Arama, detay ve listeleme";
const web1 = "Web laboratuvar ve frontend denemeleri";
const web2 = "TypeScript ile aray\u00fcz \u00e7al\u0131\u015fmalar\u0131";
const statsTitle = "GitHub istatistikleri";
const repos = "A\u00e7\u0131k repolar";
const followers = "Takip\u00e7i";
const following = "Takip edilen";
const since = "GitHub'da";
const langsTitle = "Kulland\u0131\u011f\u0131m diller";

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
  <text x="550" y="86" text-anchor="middle" font-family="Segoe UI, Ubuntu, Helvetica, Arial, sans-serif" font-size="48" font-weight="700" fill="#ffffff">${esc(name)}</text>
  <text x="550" y="122" text-anchor="middle" font-family="Segoe UI, Ubuntu, Helvetica, Arial, sans-serif" font-size="16" fill="#f5d0fe">${esc(subtitle)}</text>
</svg>`,
  1100
);

png(
  "typing.png",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 56" width="720" height="56">
  <text x="350" y="36" text-anchor="middle" font-family="Consolas, Courier New, monospace" font-size="22" font-weight="600" fill="#c084fc">${esc(hello)}</text>
  <rect x="545" y="18" width="10" height="22" rx="1" fill="#c084fc"/>
</svg>`,
  720
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

function card(file, title, line1, line2, color, lang, langColor, widthColor) {
  png(
    file,
    `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="150" viewBox="0 0 420 150">
  <rect x="1.5" y="1.5" width="417" height="147" rx="14" fill="#0d1117" stroke="${widthColor}" stroke-width="1.5"/>
  <text x="22" y="38" font-family="Segoe UI, Ubuntu, sans-serif" font-size="18" font-weight="700" fill="${color}">${esc(title)}</text>
  <text x="22" y="68" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" fill="#c9d1d9">${esc(line1)}</text>
  <text x="22" y="88" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" fill="#8b949e">${esc(line2)}</text>
  <circle cx="28" cy="122" r="6" fill="${langColor}"/>
  <text x="42" y="127" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" fill="#c9d1d9">${esc(lang)}</text>
</svg>`,
    420
  );
}

card("card-cve.png", "akilli-cve-analizi", cve1, cve2, "#c084fc", "Python  FastAPI  React", "#3572A5", "#a855f7");
card("card-terravision.png", "TerraVision", terra1, terra2, "#67e8f9", "C#  .NET", "#178600", "#22d3ee");
card("card-omdb.png", "omdb-project", omdb1, omdb2, "#fde047", "JavaScript", "#f1e05a", "#f7df1e");
card("card-weblab.png", "web-lab-hello", web1, web2, "#7dd3fc", "TypeScript", "#3178c6", "#3178c6");

png(
  "stats.png",
  `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="210" viewBox="0 0 420 210">
  <rect x="1.5" y="1.5" width="417" height="207" rx="14" fill="#0d1117" stroke="#30363d" stroke-width="1.5"/>
  <text x="22" y="36" font-family="Segoe UI, Ubuntu, sans-serif" font-size="16" font-weight="700" fill="#c084fc">${esc(statsTitle)}</text>
  <text x="22" y="78" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" fill="#8b949e">${esc(repos)}</text>
  <text x="250" y="78" font-family="Segoe UI, Ubuntu, sans-serif" font-size="18" font-weight="700" fill="#f0f6fc">17</text>
  <text x="22" y="112" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" fill="#8b949e">${esc(followers)}</text>
  <text x="250" y="112" font-family="Segoe UI, Ubuntu, sans-serif" font-size="18" font-weight="700" fill="#f0f6fc">8</text>
  <text x="22" y="146" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" fill="#8b949e">${esc(following)}</text>
  <text x="250" y="146" font-family="Segoe UI, Ubuntu, sans-serif" font-size="18" font-weight="700" fill="#f0f6fc">7</text>
  <text x="22" y="180" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" fill="#8b949e">${esc(since)}</text>
  <text x="250" y="180" font-family="Segoe UI, Ubuntu, sans-serif" font-size="18" font-weight="700" fill="#f0f6fc">2023</text>
</svg>`,
  420
);

png(
  "langs.png",
  `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="210" viewBox="0 0 420 210">
  <rect x="1.5" y="1.5" width="417" height="207" rx="14" fill="#0d1117" stroke="#30363d" stroke-width="1.5"/>
  <text x="22" y="36" font-family="Segoe UI, Ubuntu, sans-serif" font-size="16" font-weight="700" fill="#c084fc">${esc(langsTitle)}</text>
  <text x="22" y="68" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" fill="#c9d1d9">Python</text>
  <rect x="110" y="56" width="280" height="14" rx="7" fill="#21262d"/>
  <rect x="110" y="56" width="252" height="14" rx="7" fill="#3572A5"/>
  <text x="22" y="98" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" fill="#c9d1d9">Java</text>
  <rect x="110" y="86" width="280" height="14" rx="7" fill="#21262d"/>
  <rect x="110" y="86" width="224" height="14" rx="7" fill="#b07219"/>
  <text x="22" y="128" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" fill="#c9d1d9">C#</text>
  <rect x="110" y="116" width="280" height="14" rx="7" fill="#21262d"/>
  <rect x="110" y="116" width="196" height="14" rx="7" fill="#178600"/>
  <text x="22" y="158" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" fill="#c9d1d9">JavaScript</text>
  <rect x="110" y="146" width="280" height="14" rx="7" fill="#21262d"/>
  <rect x="110" y="146" width="168" height="14" rx="7" fill="#f1e05a"/>
  <text x="22" y="188" font-family="Segoe UI, Ubuntu, sans-serif" font-size="12" fill="#c9d1d9">TypeScript</text>
  <rect x="110" y="176" width="280" height="14" rx="7" fill="#21262d"/>
  <rect x="110" y="176" width="154" height="14" rx="7" fill="#3178c6"/>
</svg>`,
  420
);

png(
  "tech.png",
  `<svg xmlns="http://www.w3.org/2000/svg" width="860" height="120" viewBox="0 0 860 120">
  <rect x="0" y="18" width="92" height="32" rx="8" fill="#3776AB"/>
  <text x="46" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">Python</text>
  <rect x="102" y="18" width="92" height="32" rx="8" fill="#009688"/>
  <text x="148" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">FastAPI</text>
  <rect x="204" y="18" width="80" height="32" rx="8" fill="#E76F00"/>
  <text x="244" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">Java</text>
  <rect x="294" y="18" width="64" height="32" rx="8" fill="#239120"/>
  <text x="326" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">C#</text>
  <rect x="368" y="18" width="72" height="32" rx="8" fill="#512BD4"/>
  <text x="404" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">.NET</text>
  <rect x="450" y="18" width="108" height="32" rx="8" fill="#F7DF1E"/>
  <text x="504" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#111">JavaScript</text>
  <rect x="568" y="18" width="108" height="32" rx="8" fill="#3178C6"/>
  <text x="622" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">TypeScript</text>
  <rect x="686" y="18" width="80" height="32" rx="8" fill="#20232A"/>
  <text x="726" y="39" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#61DAFB">React</text>
  <rect x="80" y="68" width="110" height="32" rx="8" fill="#4169E1"/>
  <text x="135" y="89" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">PostgreSQL</text>
  <rect x="200" y="68" width="86" height="32" rx="8" fill="#2496ED"/>
  <text x="243" y="89" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">Docker</text>
  <rect x="296" y="68" width="64" height="32" rx="8" fill="#F05032"/>
  <text x="328" y="89" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">Git</text>
  <rect x="370" y="68" width="86" height="32" rx="8" fill="#181717"/>
  <text x="413" y="89" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">GitHub</text>
  <rect x="466" y="68" width="72" height="32" rx="8" fill="#0078D4"/>
  <text x="502" y="89" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#fff">VS Code</text>
  <rect x="548" y="68" width="72" height="32" rx="8" fill="#FCC624"/>
  <text x="584" y="89" text-anchor="middle" font-family="Segoe UI, Ubuntu, sans-serif" font-size="13" font-weight="600" fill="#111">Linux</text>
</svg>`,
  860
);
