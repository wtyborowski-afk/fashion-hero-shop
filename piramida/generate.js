#!/usr/bin/env node
// FashionHero — Pyramid Generator
// Usage: node generate.js <state.json> <out.pptx>

const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const [,, stateFile, outFile] = process.argv;
if (!stateFile || !outFile) {
  console.error('Usage: node generate.js <state.json> <out.pptx>');
  process.exit(1);
}

const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));

// Load design system
const dsFile = path.join(path.dirname(stateFile), 'design-system.json');
let DS = {
  colors: {
    bg: 'F2EDE6', text: '111111', muted: '777777', rule: 'DDD8D2',
    primary: '1A1816', accent: 'B5916A', blockBg: 'FFFFFF'
  },
  font: 'Helvetica Neue',
  cornerRadius: 4
};
if (fs.existsSync(dsFile)) {
  DS = JSON.parse(fs.readFileSync(dsFile, 'utf8'));
}

const C = DS.colors;
const FONT = DS.font;
const R = DS.cornerRadius;

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

const W = 13.33;
const H = 7.5;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function slide(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  return s;
}

function addTitle(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? 0.6, y: opts.y ?? 0.35,
    w: opts.w ?? W - 1.2, h: opts.h ?? 0.7,
    fontSize: opts.size ?? 32,
    bold: opts.bold ?? true,
    color: opts.color ?? C.text,
    fontFace: FONT,
    align: opts.align ?? 'left',
    valign: 'middle',
    wrap: true,
  });
}

function addBody(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? 0.6, y: opts.y ?? 1.2,
    w: opts.w ?? W - 1.2, h: opts.h ?? H - 1.8,
    fontSize: opts.size ?? 18,
    bold: opts.bold ?? false,
    color: opts.color ?? C.text,
    fontFace: FONT,
    align: opts.align ?? 'left',
    valign: 'top',
    wrap: true,
  });
}

function addLabel(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? 0.6, y: opts.y ?? 0.1,
    w: opts.w ?? 3, h: 0.3,
    fontSize: 10,
    color: C.muted,
    fontFace: FONT,
    align: opts.align ?? 'left',
  });
}

function addRule(s, y) {
  s.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: y ?? 1.05,
    w: W - 1.2, h: 0.02,
    fill: { color: C.rule },
    line: { type: 'none' },
  });
}

function addCard(s, x, y, w, h, label, content, opts = {}) {
  const bg = opts.bg ?? C.blockBg;
  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: bg },
    line: { color: C.rule, pt: 1 },
    rectRadius: R / 100,
  });
  if (label) {
    s.addText(label, {
      x: x + 0.15, y: y + 0.1,
      w: w - 0.3, h: 0.3,
      fontSize: 9,
      color: C.muted,
      fontFace: FONT,
      bold: true,
      align: 'left',
    });
  }
  if (content) {
    s.addText(content, {
      x: x + 0.15, y: y + (label ? 0.38 : 0.15),
      w: w - 0.3, h: h - (label ? 0.55 : 0.3),
      fontSize: opts.fontSize ?? 14,
      color: C.text,
      fontFace: FONT,
      align: 'left',
      valign: 'top',
      wrap: true,
    });
  }
}

function accentBar(s, h = 0.06) {
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: W, h,
    fill: { color: C.primary },
    line: { type: 'none' },
  });
}

function levelTag(s, levelName) {
  s.addShape(pptx.ShapeType.roundRect, {
    x: W - 2.2, y: 0.2,
    w: 1.8, h: 0.4,
    fill: { color: C.accent },
    line: { type: 'none' },
    rectRadius: 0.04,
  });
  s.addText(levelName, {
    x: W - 2.2, y: 0.2,
    w: 1.8, h: 0.4,
    fontSize: 11,
    color: 'FFFFFF',
    fontFace: FONT,
    bold: true,
    align: 'center',
    valign: 'middle',
  });
}

// ─── SLIDE 1: COVER ───────────────────────────────────────────────────────────

function slideCover(pptx, state) {
  const s = slide(pptx);
  accentBar(s, H * 0.55);

  // Company name — large, light on dark
  s.addText(state.company.name, {
    x: 0.8, y: 0.9,
    w: W - 1.6, h: 1.4,
    fontSize: 64,
    bold: true,
    italic: true,
    color: 'FFFFFF',
    fontFace: FONT,
    align: 'left',
  });

  s.addText('Piramida Strategiczna', {
    x: 0.8, y: 2.45,
    w: W - 1.6, h: 0.5,
    fontSize: 20,
    color: 'FFFFFF',
    fontFace: FONT,
    align: 'left',
  });

  // Description on light bottom
  s.addText(state.company.description, {
    x: 0.8, y: H * 0.55 + 0.3,
    w: W - 1.6, h: 1.2,
    fontSize: 15,
    color: C.muted,
    fontFace: FONT,
    align: 'left',
    wrap: true,
  });

  s.addText(`${state.company.industry.toUpperCase()}  ·  ${state.company.stage.toUpperCase()}  ·  ${state.lastUpdated}`, {
    x: 0.8, y: H - 0.6,
    w: W - 1.6, h: 0.35,
    fontSize: 10,
    color: C.muted,
    fontFace: FONT,
    align: 'left',
  });
}

// ─── SLIDE 2: AGENDA ─────────────────────────────────────────────────────────

function slideAgenda(pptx, state) {
  const s = slide(pptx);
  addLabel(s, 'PRZEGLĄD');
  addTitle(s, '6 poziomów piramidy strategicznej', { size: 28 });
  addRule(s);

  const levels = [
    { num: '01', name: 'MISJA', desc: 'Po co istniejemy (ponadczasowe)' },
    { num: '02', name: 'WIZJA', desc: 'Dokąd zmierzamy (horyzont 3–5 lat)' },
    { num: '03', name: 'NORTH STAR METRIC', desc: 'Jedna liczba, która mierzy wartość dla użytkownika' },
    { num: '04', name: 'STRATEGIA', desc: 'Canvas 6 pól: diagnoza, mechanizm, reguły gry' },
    { num: '05', name: 'METRYKI & CELE', desc: 'OKR-y kwartalne pchające NSM' },
    { num: '06', name: 'ROADMAP', desc: 'Projekty zmapowane na cele i strategię' },
  ];

  const colW = (W - 1.2) / 3;
  const rowH = (H - 1.8) / 2;
  const startX = 0.6;
  const startY = 1.25;

  levels.forEach((lvl, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (colW + 0.06);
    const y = startY + row * (rowH + 0.06);
    const lv = state.levels;
    const statusKey = ['mission','vision','nsm','strategy','metrics','roadmap'][i];
    const isDone = lv[statusKey]?.status === 'done';

    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: colW, h: rowH - 0.05,
      fill: { color: isDone ? C.primary : C.blockBg },
      line: { color: C.rule, pt: 1 },
      rectRadius: R / 100,
    });

    s.addText(lvl.num, {
      x: x + 0.15, y: y + 0.12,
      w: 0.5, h: 0.35,
      fontSize: 12,
      color: isDone ? C.accent : C.muted,
      fontFace: FONT,
      bold: true,
    });

    s.addText(lvl.name, {
      x: x + 0.15, y: y + 0.42,
      w: colW - 0.3, h: 0.45,
      fontSize: 15,
      bold: true,
      color: isDone ? 'FFFFFF' : C.text,
      fontFace: FONT,
      wrap: true,
    });

    s.addText(lvl.desc, {
      x: x + 0.15, y: y + 0.85,
      w: colW - 0.3, h: rowH - 1.05,
      fontSize: 12,
      color: isDone ? 'DDDDDD' : C.muted,
      fontFace: FONT,
      wrap: true,
    });
  });
}

// ─── SLIDE: MISJA ────────────────────────────────────────────────────────────

function slideMission(pptx, state) {
  const m = state.levels.mission;
  if (m.status !== 'done') return;

  const s = slide(pptx);
  levelTag(s, '01 MISJA');
  addLabel(s, 'PO CO ISTNIEJEMY');
  addTitle(s, 'Misja', { size: 28 });
  addRule(s);

  // Big mission text
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 1.25, w: W - 1.2, h: 1.8,
    fill: { color: C.primary },
    line: { type: 'none' },
    rectRadius: R / 100,
  });

  s.addText(`"${m.text}"`, {
    x: 0.8, y: 1.35,
    w: W - 1.6, h: 1.6,
    fontSize: 22,
    bold: true,
    italic: true,
    color: 'FFFFFF',
    fontFace: FONT,
    align: 'center',
    valign: 'middle',
    wrap: true,
  });

  // Rationale + exclusions
  const cardW = (W - 1.4) / 2;
  addCard(s, 0.6, 3.25, cardW, 1.8, 'UZASADNIENIE', m.rationale ?? '', { fontSize: 13 });

  if (m.exclusions && m.exclusions.length > 0) {
    const exclText = m.exclusions.map(e => `• ${e}`).join('\n');
    addCard(s, 0.75 + cardW, 3.25, cardW, 1.8, 'CZEGO NIE ROBIMY', exclText, { fontSize: 13 });
  }

  // Test pustki note
  s.addText('Test pustki: zamień "FashionHero" na konkurenta. Jeśli zdanie nadal działa — misja jest pusta.', {
    x: 0.6, y: H - 0.55,
    w: W - 1.2, h: 0.4,
    fontSize: 10,
    color: C.muted,
    fontFace: FONT,
    italic: true,
    align: 'left',
  });
}

// ─── SLIDE: WIZJA ────────────────────────────────────────────────────────────

function slideVision(pptx, state) {
  const v = state.levels.vision;
  if (v.status !== 'done') return;

  const s = slide(pptx);
  levelTag(s, '02 WIZJA');
  addLabel(s, 'DOKĄD ZMIERZAMY');
  addTitle(s, `Wizja — horyzont: ${v.horizon ?? ''}`, { size: 26 });
  addRule(s);

  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 1.25, w: W - 1.2, h: 1.6,
    fill: { color: C.accent },
    line: { type: 'none' },
    rectRadius: R / 100,
  });

  s.addText(`"${v.text}"`, {
    x: 0.8, y: 1.32,
    w: W - 1.6, h: 1.45,
    fontSize: 20,
    bold: true,
    italic: true,
    color: 'FFFFFF',
    fontFace: FONT,
    align: 'center',
    valign: 'middle',
    wrap: true,
  });

  addCard(s, 0.6, 3.0, W - 1.2, 1.6, 'UZASADNIENIE', v.rationale ?? '', { fontSize: 13 });

  // Misja vs Wizja contrast
  const cw = (W - 1.5) / 2;
  s.addText('MISJA (ponadczasowa)', {
    x: 0.6, y: 4.75, w: cw, h: 0.3,
    fontSize: 10, bold: true, color: C.muted, fontFace: FONT
  });
  s.addText(state.levels.mission?.text ?? '', {
    x: 0.6, y: 5.05, w: cw, h: 0.8,
    fontSize: 13, color: C.text, fontFace: FONT, italic: true, wrap: true
  });

  s.addText('WIZJA (na horyzont)', {
    x: 0.75 + cw, y: 4.75, w: cw, h: 0.3,
    fontSize: 10, bold: true, color: C.accent, fontFace: FONT
  });
  s.addText(v.text ?? '', {
    x: 0.75 + cw, y: 5.05, w: cw, h: 0.8,
    fontSize: 13, color: C.text, fontFace: FONT, italic: true, wrap: true
  });
}

// ─── SLIDE: NSM ──────────────────────────────────────────────────────────────

function slideNSM(pptx, state) {
  const n = state.levels.nsm;
  if (n.status !== 'done') return;

  const s = slide(pptx);
  levelTag(s, '03 NSM');
  addLabel(s, 'NORTH STAR METRIC');
  addTitle(s, 'Jedna liczba, która mierzy wartość', { size: 26 });
  addRule(s);

  // Big metric box
  s.addShape(pptx.ShapeType.roundRect, {
    x: 2.0, y: 1.25, w: W - 4.0, h: 1.7,
    fill: { color: C.primary },
    line: { type: 'none' },
    rectRadius: R / 100,
  });

  s.addText(n.metric ?? '', {
    x: 2.1, y: 1.32,
    w: W - 4.2, h: 1.55,
    fontSize: 26,
    bold: true,
    color: 'FFFFFF',
    fontFace: FONT,
    align: 'center',
    valign: 'middle',
    wrap: true,
  });

  // 3 cards: type, equation, rationale
  const cw = (W - 1.5) / 3;
  addCard(s, 0.6, 3.15, cw, 2.8, 'TYP (Amplitude)', n.amplitudeType ?? '', { fontSize: 14 });
  addCard(s, 0.65 + cw, 3.15, cw, 2.8, 'VALUE EXCHANGE EQUATION', n.equation ?? '', { fontSize: 13 });
  addCard(s, 0.7 + cw * 2, 3.15, cw, 2.8, 'DLACZEGO TO NSM', n.rationale ?? '', { fontSize: 13 });
}

// ─── SLIDE: STRATEGIA overview ───────────────────────────────────────────────

function slideStrategy(pptx, state) {
  const st = state.levels.strategy;
  if (st.status !== 'done') return;

  // Slide 1: One Year Goal + Diagnosis
  const s1 = slide(pptx);
  levelTag(s1, '04 STRATEGIA');
  addLabel(s1, 'CANVAS STRATEGICZNY — CZ.1');
  addTitle(s1, 'Cel roczny i diagnoza', { size: 26 });
  addRule(s1);

  addCard(s1, 0.6, 1.25, W - 1.2, 1.5, 'CEL ROCZNY (One Year Goal)', st.oneYearGoal ?? '', { fontSize: 16 });
  addCard(s1, 0.6, 2.9, W - 1.2, 2.3, 'DIAGNOZA', st.diagnosis ?? '', { fontSize: 14 });
  addCard(s1, 0.6, 5.35, W - 1.2, 1.6, 'THEORY OF CHANGE (mechanizm)', st.theoryOfChange ?? '', { fontSize: 13 });

  // Slide 2: Guiding Policy + Coherent Actions
  const s2 = slide(pptx);
  levelTag(s2, '04 STRATEGIA');
  addLabel(s2, 'CANVAS STRATEGICZNY — CZ.2');
  addTitle(s2, 'Reguły gry i ruchy', { size: 26 });
  addRule(s2);

  const halfW = (W - 1.5) / 2;
  addCard(s2, 0.6, 1.25, halfW, 4.8, 'GUIDING POLICY (gdzie gramy + czego NIE robimy)', st.guidingPolicy ?? '', { fontSize: 13 });

  // Coherent Actions as numbered list
  const caText = Array.isArray(st.coherentActions)
    ? st.coherentActions.map((a, i) => `${i+1}. ${typeof a === 'object' ? `${a.name} — ${a.owner ?? ''} — ${a.metric ?? ''}` : a}`).join('\n\n')
    : (st.coherentActions ?? '');
  addCard(s2, 0.75 + halfW, 1.25, halfW, 4.8, 'COHERENT ACTIONS (3–5 ruchów)', caText, { fontSize: 13 });

  // Slide 3: Checkpoints
  const s3 = slide(pptx);
  levelTag(s3, '04 STRATEGIA');
  addLabel(s3, 'CANVAS STRATEGICZNY — CZ.3');
  addTitle(s3, 'Scenariusze i ryzyka', { size: 26 });
  addRule(s3);

  const chk = st.checkpoints ?? {};
  const thirdW = (W - 1.5) / 3;
  addCard(s3, 0.6, 1.25, thirdW, 3.2, 'SUCCESS', chk.success ?? '', { bg: 'E8F5E9', fontSize: 13 });
  addCard(s3, 0.65 + thirdW, 1.25, thirdW, 3.2, 'PARTIAL', chk.partial ?? '', { bg: 'FFF8E1', fontSize: 13 });
  addCard(s3, 0.7 + thirdW * 2, 1.25, thirdW, 3.2, 'FAIL', chk.fail ?? '', { bg: 'FFEBEE', fontSize: 13 });

  const risks = Array.isArray(chk.risks) ? chk.risks.map(r => `• ${r}`).join('\n') : (chk.risks ?? '');
  addCard(s3, 0.6, 4.6, W - 1.2, 2.3, 'RYZYKA', risks, { fontSize: 13 });
}

// ─── SLIDE: METRYKI & OKR ────────────────────────────────────────────────────

function slideMetrics(pptx, state) {
  const m = state.levels.metrics;
  if (m.status !== 'done') return;

  const s = slide(pptx);
  levelTag(s, '05 METRYKI');
  addLabel(s, 'OKR-Y');
  addTitle(s, `Cele na ${m.quarter ?? ''}`, { size: 26 });
  addRule(s);

  const okrs = m.okrs ?? [];
  const okrW = (W - 1.2 - (okrs.length - 1) * 0.1) / Math.max(okrs.length, 1);

  okrs.forEach((okr, i) => {
    const x = 0.6 + i * (okrW + 0.1);
    const y = 1.25;
    const h = H - 1.8;

    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: okrW, h,
      fill: { color: C.blockBg },
      line: { color: C.rule, pt: 1 },
      rectRadius: R / 100,
    });

    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: okrW, h: 0.35,
      fill: { color: C.primary },
      line: { type: 'none' },
      rectRadius: R / 100,
    });

    s.addText(`O${i + 1}`, {
      x: x + 0.1, y: y + 0.04,
      w: 0.5, h: 0.28,
      fontSize: 11, bold: true, color: C.accent, fontFace: FONT
    });

    s.addText(okr.objective ?? '', {
      x: x + 0.12, y: y + 0.42,
      w: okrW - 0.24, h: 1.0,
      fontSize: 14, bold: true, color: C.text, fontFace: FONT, wrap: true
    });

    const krs = okr.keyResults ?? [];
    krs.forEach((kr, j) => {
      s.addText(`KR${j + 1}`, {
        x: x + 0.12, y: y + 1.5 + j * 0.85,
        w: 0.4, h: 0.28,
        fontSize: 9, bold: true, color: C.accent, fontFace: FONT
      });
      s.addText(typeof kr === 'object' ? kr.text ?? '' : kr, {
        x: x + 0.12, y: y + 1.78 + j * 0.85,
        w: okrW - 0.24, h: 0.62,
        fontSize: 12, color: C.text, fontFace: FONT, wrap: true
      });
    });

    if (okr.owner) {
      s.addText(`Owner: ${okr.owner}`, {
        x: x + 0.12, y: y + h - 0.45,
        w: okrW - 0.24, h: 0.3,
        fontSize: 10, color: C.muted, fontFace: FONT, italic: true
      });
    }
  });
}

// ─── SLIDE: ROADMAP ──────────────────────────────────────────────────────────

function slideRoadmap(pptx, state) {
  const rm = state.levels.roadmap;
  if (rm.status !== 'done') return;

  const quarters = rm.quarters ?? {};
  const qKeys = Object.keys(quarters);

  const s = slide(pptx);
  levelTag(s, '06 ROADMAP');
  addLabel(s, 'ROADMAP');
  addTitle(s, 'Projekty na 4 kwartały', { size: 26 });
  addRule(s);

  const qW = (W - 1.2 - (qKeys.length - 1) * 0.1) / Math.max(qKeys.length, 1);
  const qColors = [C.primary, C.accent, '5C7A6B', '8B6F4E'];

  qKeys.forEach((qKey, qi) => {
    const x = 0.6 + qi * (qW + 0.1);
    const y = 1.25;

    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: qW, h: H - 1.8,
      fill: { color: C.blockBg },
      line: { color: C.rule, pt: 1 },
      rectRadius: R / 100,
    });

    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: qW, h: 0.38,
      fill: { color: qColors[qi % qColors.length] },
      line: { type: 'none' },
      rectRadius: R / 100,
    });

    s.addText(qKey, {
      x: x + 0.1, y: y + 0.05,
      w: qW - 0.2, h: 0.28,
      fontSize: 12, bold: true, color: 'FFFFFF', fontFace: FONT, align: 'center'
    });

    const projects = quarters[qKey] ?? [];
    projects.forEach((proj, pi) => {
      const name = typeof proj === 'object' ? proj.name ?? '' : proj;
      const owner = typeof proj === 'object' ? proj.owner ?? '' : '';
      const size = typeof proj === 'object' ? proj.size ?? '' : '';

      s.addText(`${pi + 1}. ${name}`, {
        x: x + 0.1, y: y + 0.5 + pi * 1.0,
        w: qW - 0.2, h: 0.5,
        fontSize: 12, bold: true, color: C.text, fontFace: FONT, wrap: true
      });

      if (owner || size) {
        s.addText(`${owner}${size ? ` · ${size}` : ''}`, {
          x: x + 0.1, y: y + 1.0 + pi * 1.0,
          w: qW - 0.2, h: 0.28,
          fontSize: 10, color: C.muted, fontFace: FONT
        });
      }
    });
  });
}

// ─── SLIDE: PYRAMID OVERVIEW ─────────────────────────────────────────────────

function slidePyramidOverview(pptx, state) {
  const lvls = state.levels;
  const anyDone = Object.values(lvls).some(l => l.status === 'done');
  if (!anyDone) return;

  const s = slide(pptx);
  addLabel(s, 'PIRAMIDA STRATEGICZNA — CAŁOŚĆ');
  addTitle(s, `${state.company.name} — Piramida`, { size: 24 });
  addRule(s);

  const levels = [
    { key: 'roadmap',  num: '06', name: 'ROADMAP',  getValue: (l) => l.roadmap?.quarters ? Object.keys(l.roadmap.quarters).join(' · ') : '' },
    { key: 'metrics',  num: '05', name: 'METRYKI',  getValue: (l) => l.metrics?.quarter ?? '' },
    { key: 'strategy', num: '04', name: 'STRATEGIA',getValue: (l) => l.strategy?.oneYearGoal ?? '' },
    { key: 'nsm',      num: '03', name: 'NSM',      getValue: (l) => l.nsm?.metric ?? '' },
    { key: 'vision',   num: '02', name: 'WIZJA',    getValue: (l) => l.vision?.text ?? '' },
    { key: 'mission',  num: '01', name: 'MISJA',    getValue: (l) => l.mission?.text ?? '' },
  ];

  const rowH = 0.75;
  const startY = 1.3;
  const maxW = W - 1.2;

  levels.forEach((lvl, i) => {
    const isDone = lvls[lvl.key]?.status === 'done';
    const pyramidW = maxW * (1 - i * 0.08);
    const xOffset = (maxW - pyramidW) / 2 + 0.6;
    const y = startY + i * (rowH + 0.06);

    s.addShape(pptx.ShapeType.roundRect, {
      x: xOffset, y, w: pyramidW, h: rowH,
      fill: { color: isDone ? C.primary : C.rule },
      line: { type: 'none' },
      rectRadius: 0.02,
    });

    s.addText(`${lvl.num}  ${lvl.name}`, {
      x: xOffset + 0.15, y: y + 0.05,
      w: 2.0, h: rowH - 0.1,
      fontSize: 11, bold: true,
      color: isDone ? C.accent : 'AAAAAA',
      fontFace: FONT, valign: 'middle'
    });

    const val = lvl.getValue(lvls);
    if (val) {
      s.addText(val, {
        x: xOffset + 2.2, y: y + 0.05,
        w: pyramidW - 2.4, h: rowH - 0.1,
        fontSize: 12,
        color: isDone ? 'FFFFFF' : 'BBBBBB',
        fontFace: FONT, wrap: true, valign: 'middle',
        italic: true
      });
    }
  });
}

// ─── SLIDE: TEST DRABINY ─────────────────────────────────────────────────────

function slideLadderTest(pptx, state) {
  const s = slide(pptx);
  addLabel(s, 'WERYFIKACJA');
  addTitle(s, 'Test drabiny — kaskada w górę i w dół', { size: 24 });
  addRule(s);

  const steps = [
    'Losowy projekt → OKR → Coherent Action → strategiczna oś → NSM → Wizja → Misja',
    'NSM → czy masz projekt który ją realnie podnosi? Który? Jak?',
    'Każde wykluczenie ze strategii → czy WSZYSTKIE projekty je respektują?',
    'Każdy Coherent Action → czy ma ≥1 projekt w roadmapie?',
  ];

  steps.forEach((step, i) => {
    addCard(s, 0.6, 1.3 + i * 1.35, W - 1.2, 1.2, `TEST ${i + 1}`, step, { fontSize: 14 });
  });
}

// ─── SLIDE: NASTĘPNE KROKI ───────────────────────────────────────────────────

function slideNextSteps(pptx, state) {
  const s = slide(pptx);
  addLabel(s, 'CO DALEJ');
  addTitle(s, 'Trzy rzeczy do zrobienia w tym tygodniu', { size: 24 });
  addRule(s);

  const steps = [
    { n: '1', text: 'Pokaż piramidę Maj i Elze — zweryfikujcie NSM i Diagnosis danymi z PostHog' },
    { n: '2', text: 'Zrób test drabiny z losowym projektem z backlogu — czy drabina się nie urywa?' },
    { n: '3', text: 'Zdefiniuj OKR-y na najbliższy kwartał i przypisz ownerów (1 osoba, nie zespół)' },
  ];

  steps.forEach((step, i) => {
    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.6, y: 1.4 + i * 1.7, w: W - 1.2, h: 1.5,
      fill: { color: C.blockBg },
      line: { color: C.rule, pt: 1 },
      rectRadius: R / 100,
    });

    s.addShape(pptx.ShapeType.roundRect, {
      x: 0.6, y: 1.4 + i * 1.7, w: 0.6, h: 1.5,
      fill: { color: C.primary },
      line: { type: 'none' },
      rectRadius: R / 100,
    });

    s.addText(step.n, {
      x: 0.6, y: 1.4 + i * 1.7,
      w: 0.6, h: 1.5,
      fontSize: 24, bold: true, color: C.accent, fontFace: FONT,
      align: 'center', valign: 'middle'
    });

    s.addText(step.text, {
      x: 1.35, y: 1.4 + i * 1.7 + 0.15,
      w: W - 2.1, h: 1.2,
      fontSize: 16, color: C.text, fontFace: FONT, wrap: true, valign: 'middle'
    });
  });
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

slideCover(pptx, state);
slideAgenda(pptx, state);
slideMission(pptx, state);
slideVision(pptx, state);
slideNSM(pptx, state);
slideStrategy(pptx, state);
slideMetrics(pptx, state);
slideRoadmap(pptx, state);
slidePyramidOverview(pptx, state);
slideLadderTest(pptx, state);
slideNextSteps(pptx, state);

pptx.writeFile({ fileName: outFile })
  .then(() => console.log(`OK: ${outFile}`))
  .catch(err => { console.error(err); process.exit(1); });
