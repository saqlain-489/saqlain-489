import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SANS = "ui-sans-serif, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, Consolas, monospace";

export const THEMES = {
  dark: {
    bg: '#0d1117', panel: '#161b22', border: '#30363d', ink: '#e6edf3', muted: '#9198a1', grid: 0.05,
    teal: '#2dd4bf', violet: '#a78bfa', amber: '#fbbf24', glow: 0.22,
  },
  light: {
    bg: '#ffffff', panel: '#f6f8fa', border: '#d1d9e0', ink: '#1f2328', muted: '#59636e', grid: 0.07,
    teal: '#0f766e', violet: '#6d28d9', amber: '#b45309', glow: 0.1,
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function frame(t, w, h, id) {
  return `<defs>
    <radialGradient id="${id}a" cx="0.88" cy="0.08" r="0.75">
      <stop offset="0" stop-color="${t.teal}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${t.teal}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${id}b" cx="0.04" cy="1" r="0.65">
      <stop offset="0" stop-color="${t.violet}" stop-opacity="${t.glow}"/><stop offset="1" stop-color="${t.violet}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${id}g" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="${t.ink}" stroke-opacity="${t.grid}"/>
    </pattern>
    <clipPath id="${id}c"><rect width="${w}" height="${h}" rx="18"/></clipPath>
    <marker id="${id}m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="${t.muted}"/>
    </marker>
  </defs>
  <g clip-path="url(#${id}c)">
    <rect width="${w}" height="${h}" fill="${t.bg}"/>
    <rect width="${w}" height="${h}" fill="url(#${id}g)"/>
    <rect width="${w}" height="${h}" fill="url(#${id}a)"/>
    <rect width="${w}" height="${h}" fill="url(#${id}b)"/>
  </g>
  <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="17.5" fill="none" stroke="${t.border}" stroke-width="1.5"/>`;
}

const style = `<style>
    .sans{font-family:${SANS}} .mono{font-family:${MONO}} .b{font-weight:700}
    .flow{stroke-dasharray:6 8;animation:flow 1.1s linear infinite}
    .small{animation:small 4s ease-in-out infinite} .large{animation:large 4s ease-in-out infinite}
    @keyframes flow{to{stroke-dashoffset:-14}}
    @keyframes small{0%,40%{opacity:1}50%,90%{opacity:.28}100%{opacity:1}}
    @keyframes large{0%,40%{opacity:.28}50%,90%{opacity:1}100%{opacity:.28}}
    @media (prefers-reduced-motion:reduce){.flow,.small,.large{animation:none}}
  </style>`;

function banner(t) {
  const W = 1200, H = 320;
  const node = (x, label, sub, color) => `
  <rect x="${x}" y="72" width="112" height="60" rx="12" fill="${t.panel}" stroke="${color}" stroke-width="1.5"/>
  <text x="${x + 56}" y="99" text-anchor="middle" class="mono b" font-size="16" fill="${t.ink}">${label}</text>
  <text x="${x + 56}" y="119" text-anchor="middle" class="mono" font-size="12" fill="${t.muted}">${sub}</text>`;
  const chip = (x, label, cls) => `
  <g class="${cls}"><rect x="${x}" y="232" width="74" height="28" rx="14" fill="${t.violet}" fill-opacity=".16" stroke="${t.violet}" stroke-opacity=".6"/>
  <text x="${x + 37}" y="251" text-anchor="middle" class="mono" font-size="13" fill="${t.ink}">${label}</text></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="title desc">
  <title id="title">Saqlain Ahmad, Full-Stack and AI Engineer</title>
  <desc id="desc">I build AI agents that run in production, and the full-stack TypeScript apps around them. Faisalabad, Pakistan.</desc>
  ${style}
  ${frame(t, W, H, 'bn')}

  <text x="64" y="90" class="mono b" font-size="14" letter-spacing="3" fill="${t.teal}">FULL-STACK &amp; AI ENGINEER</text>
  <text x="61" y="158" class="sans b" font-size="64" letter-spacing="-1.5" fill="${t.ink}">Saqlain Ahmad</text>
  <text x="64" y="206" class="sans" font-size="23" fill="${t.muted}">I build AI agents that run in production,</text>
  <text x="64" y="237" class="sans" font-size="23" fill="${t.muted}">and the full-stack TypeScript apps around them.</text>
  <text x="64" y="280" class="mono" font-size="14" fill="${t.muted}">Faisalabad, Pakistan  ·  TypeScript  ·  Node  ·  React  ·  Mastra</text>

  <text x="716" y="56" class="mono" font-size="12" letter-spacing="1" fill="${t.muted}">multi-agent pipeline</text>
  <path d="M828 102H866" stroke="${t.muted}" stroke-width="1.5" class="flow" marker-end="url(#bnm)"/>
  <path d="M980 102H1018" stroke="${t.muted}" stroke-width="1.5" class="flow" marker-end="url(#bnm)"/>
  <path d="M1076 132C1076 184 924 184 924 136" fill="none" stroke="${t.violet}" stroke-opacity=".7" stroke-width="1.5" class="flow" marker-end="url(#bnm)"/>
  <circle r="4" fill="${t.teal}"><animateMotion dur="2.6s" repeatCount="indefinite" path="M828 102H1020"/></circle>
  <circle r="4" fill="${t.violet}"><animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path="M1076 132C1076 184 924 184 924 136"/></circle>
  ${node(716, 'plan', 'outline', t.teal)}
  ${node(868, 'write', 'sections', t.teal)}
  ${node(1020, 'review', 'evals', t.amber)}
  <text x="1000" y="196" text-anchor="middle" class="mono" font-size="12" fill="${t.muted}">revise until it passes</text>

  <rect x="716" y="220" width="416" height="52" rx="14" fill="${t.panel}" stroke="${t.border}"/>
  <text x="734" y="251" class="mono b" font-size="13" fill="${t.violet}">model router</text>
  ${chip(858, 'small', 'small')}
  ${chip(940, 'large', 'large')}
  <text x="1116" y="251" text-anchor="end" class="mono b" font-size="14" fill="${t.amber}">≈ −85% cost</text>
</svg>
`;
}

/* ------------------------------------------------------------------ */
/* Project cards                                                        */
/* ------------------------------------------------------------------ */

export const PROJECTS = [
  {
    slug: 'quizforge',
    eyebrow: 'AI AGENTS · LLM EVALS',
    pitch: ['Turns any document into a quiz where every', 'answer is checked against the source and cited.'],
    facts: ['Planner, writers, 17 checks, a two-tier judge', 'A 31-case benchmark gates every CI run'],
    stack: ['TypeScript', 'Mastra', 'Claude API', 'Next.js'],
    art: 'pipeline',
  },
  {
    slug: 'recite',
    eyebrow: 'SPEECH · ARABIC · RTL',
    pitch: ['Recite into the mic and watch every word,', 'and every letter, light up as you go.'],
    facts: ['Word alignment: correct, missed, substituted', 'Letter-level colours inside joined Arabic'],
    stack: ['React', 'TypeScript', 'Web Speech API', 'Vitest'],
    art: 'wave',
  },
  {
    slug: 'dialdesk',
    eyebrow: 'REAL-TIME · VOICE AI',
    pitch: ['Browser softphone and call CRM with live', 'transcripts and an AI voice receptionist.'],
    facts: ['Whisper transcribes calls inside the browser', 'Tenant isolation and toll-fraud guards'],
    stack: ['React', 'Express', 'MongoDB', 'Twilio'],
    art: 'call',
  },
  {
    slug: 'pk-job-radar',
    eyebrow: 'DATA PIPELINE · AUTOMATION',
    pitch: ['Finds and ranks engineering jobs straight', 'from Pakistani companies’ own careers pages.'],
    facts: ['7,435 map results narrowed to 577 companies', 'A model reads only the pages that changed'],
    stack: ['Node.js', 'SQLite', 'Puppeteer', 'Express'],
    art: 'radar',
  },
];

function art(kind, t, x, y) {
  if (kind === 'pipeline') {
    const nodes = [0, 1, 2].map((i) => `<rect x="${x + i * 46}" y="${y + 18}" width="30" height="30" rx="8" fill="${t.panel}" stroke="${i === 2 ? t.amber : t.teal}" stroke-width="1.5"/>`).join('');
    return `${nodes}<path d="M${x + 30} ${y + 33}h16M${x + 76} ${y + 33}h16" stroke="${t.muted}" stroke-width="1.5"/>
      <path d="M${x + 99} ${y + 33}l5 5 9-10" fill="none" stroke="${t.amber}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (kind === 'wave') {
    const hs = [10, 22, 36, 18, 44, 28, 14, 34, 24, 12, 30, 16];
    return hs.map((h, i) => `<rect x="${x + i * 10}" y="${y + 33 - h / 2}" width="5" height="${h}" rx="2.5" fill="${i % 4 === 3 ? t.amber : t.teal}" fill-opacity="${i % 4 === 3 ? 1 : 0.85}"/>`).join('');
  }
  if (kind === 'call') {
    return `<circle cx="${x + 33}" cy="${y + 33}" r="22" fill="${t.panel}" stroke="${t.teal}" stroke-width="1.5"/>
      <path d="M${x + 25} ${y + 25}c0 10 6 16 16 16l3-4-5-3-2 2c-3-1-6-4-7-7l2-2-3-5z" fill="${t.teal}"/>
      <path d="M${x + 66} ${y + 22}c6 6 6 16 0 22M${x + 76} ${y + 15}c10 10 10 26 0 36" fill="none" stroke="${t.violet}" stroke-width="2" stroke-linecap="round"/>`;
  }
  return `<circle cx="${x + 40}" cy="${y + 40}" r="34" fill="none" stroke="${t.border}" stroke-width="1.5"/>
    <circle cx="${x + 40}" cy="${y + 40}" r="20" fill="none" stroke="${t.border}" stroke-width="1.5"/>
    <path d="M${x + 40} ${y + 40}L${x + 66} ${y + 18}" stroke="${t.teal}" stroke-width="2" stroke-linecap="round"/>
    <circle cx="${x + 57}" cy="${y + 31}" r="4" fill="${t.amber}"/><circle cx="${x + 24}" cy="${y + 52}" r="3" fill="${t.teal}"/>`;
}

function card(t, p) {
  const W = 640, H = 300;
  let cx = 32;
  const chips = p.stack.map((s) => {
    const w = Math.round(s.length * 8.6 + 26);
    const out = `<rect x="${cx}" y="250" width="${w}" height="30" rx="15" fill="${t.panel}" stroke="${t.border}"/>
      <text x="${cx + w / 2}" y="270" text-anchor="middle" class="mono" font-size="14" fill="${t.ink}">${esc(s)}</text>`;
    cx += w + 8;
    return out;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
  <title id="t">${esc(p.slug)}</title>
  <desc id="d">${esc(`${p.pitch.join(' ')} ${p.facts.join('. ')}. Built with ${p.stack.join(', ')}.`)}</desc>
  ${style}
  ${frame(t, W, H, `c${p.slug.replace(/\W/g, '')}`)}
  <text x="32" y="50" class="mono b" font-size="15" letter-spacing="2" fill="${t.teal}">${esc(p.eyebrow)}</text>
  <text x="30" y="98" class="sans b" font-size="38" letter-spacing="-0.8" fill="${t.ink}">${esc(p.slug)}</text>
  ${p.pitch.map((l, i) => `<text x="32" y="${138 + i * 27}" class="sans" font-size="21" fill="${t.muted}">${esc(l)}</text>`).join('\n  ')}
  ${p.facts.map((f, i) => `<circle cx="38" cy="${203 + i * 28}" r="4" fill="${t.amber}"/><text x="52" y="${210 + i * 28}" class="sans" font-size="19" fill="${t.ink}">${esc(f)}</text>`).join('\n  ')}
  ${chips}
  ${art(p.art, t, 512, 30)}
</svg>
`;
}

mkdirSync(join(root, 'assets'), { recursive: true });
for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(join(root, 'assets', `banner-${name}.svg`), banner(t));
  for (const p of PROJECTS) writeFileSync(join(root, 'assets', `card-${p.slug}-${name}.svg`), card(t, p));
}
console.log(`built banner and ${PROJECTS.length} project cards, light and dark`);
