import { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --black:  #060606;
    --g1:     #0d0d0d;
    --g2:     #141414;
    --g3:     #1e1e1e;
    --border: #252525;
    --white:  #f0ebe4;
    --cream:  #c2bbb2;
    --gold:   #d4a853;
    --gold2:  #6e5a32;
    --red:    #b83030;
    --red-bg: rgba(184,48,48,0.09);
    --green:  #22a259;
    --grn-bg: rgba(34,162,89,0.09);
    --yellow: #d4882a;
    --ylw-bg: rgba(212,136,42,0.09);
    --purple: #8b5cf6;
    --pur-bg: rgba(139,92,246,0.09);
    --D: 'Bebas Neue', sans-serif;
    --M: 'DM Mono', monospace;
    --B: 'Cormorant Garamond', serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--B);
    cursor: crosshair;
    overflow-x: hidden;
  }

  ::selection { background: var(--gold); color: var(--black); }

  /* GRAIN */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.28;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.06'/%3E%3C/svg%3E");
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 3.5rem;
    background: rgba(6,6,6,0.9);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
  }
  .logo {
    display: flex; align-items: center; gap: 0.7rem;
    font-family: var(--D); font-size: 1.5rem;
    letter-spacing: 0.14em; color: var(--gold);
    text-decoration: none;
  }
  .logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--gold);
    animation: blink 2.4s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.1} }

  .nav-center {
    display: flex; gap: 2.8rem; list-style: none;
  }
  .nav-center a {
    font-family: var(--M); font-size: 0.65rem;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--cream); text-decoration: none;
    transition: color 0.2s;
  }
  .nav-center a:hover { color: var(--gold); }

  .nav-pill {
    display: flex; align-items: center; gap: 0.55rem;
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--cream); opacity: 0.6;
  }
  .pill-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--g3); transition: background 0.4s, box-shadow 0.4s;
  }
  .pill-dot.on  { background: var(--green); box-shadow: 0 0 7px var(--green); }
  .pill-dot.off { background: var(--red); }

  /* ── MARQUEE ── */
  .mq { overflow: hidden; white-space: nowrap;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    background: var(--g1); padding: 9px 0; }
  .mq-inner { display: inline-flex; animation: mq 30s linear infinite; }
  .mq-inner span {
    font-family: var(--M); font-size: 0.65rem;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--cream); padding: 0 2.2rem;
  }
  .mq-inner span.g { color: var(--gold); }
  @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 3.5rem 5.5rem;
    position: relative; overflow: hidden;
  }
  .hero-watermark {
    position: absolute; top: 50%; right: -3rem;
    transform: translateY(-52%);
    font-family: var(--D);
    font-size: clamp(9rem, 24vw, 24rem);
    color: transparent;
    -webkit-text-stroke: 1px rgba(212,168,83,0.055);
    pointer-events: none; user-select: none;
    line-height: 1; letter-spacing: -0.02em;
  }
  .hero-tag {
    font-family: var(--M); font-size: 0.65rem;
    letter-spacing: 0.38em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.4rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-tag::after { content:''; width:50px; height:1px; background:var(--gold); opacity:0.4; }
  .hero-h1 {
    font-family: var(--D);
    font-size: clamp(4.5rem, 13vw, 13rem);
    line-height: 0.86; letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .hero-h1 .out { -webkit-text-stroke: 1px var(--white); color: transparent; }
  .hero-h1 .gld { color: var(--gold); }
  .hero-sub {
    font-family: var(--B); font-style: italic;
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    color: var(--cream); max-width: 520px;
    margin-top: 2.2rem; line-height: 1.8; opacity: 0.82;
  }
  .hero-cta-row { display: flex; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap; }
  .btn-primary {
    font-family: var(--D); font-size: 1.2rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.85rem 2.8rem;
    background: var(--gold); color: var(--black);
    border: none; cursor: crosshair;
    transition: all 0.22s; text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: var(--white); }
  .btn-ghost {
    font-family: var(--M); font-size: 0.68rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    padding: 0.85rem 2rem;
    background: transparent; border: 1px solid var(--border);
    color: var(--cream); cursor: crosshair;
    transition: all 0.22s; text-decoration: none; display: inline-block;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

  .scroll-hint {
    position: absolute; bottom: 2.5rem; right: 3.5rem;
    display: flex; flex-direction: column; align-items: center; gap: 0.7rem;
  }
  .scroll-hint span {
    font-family: var(--M); font-size: 0.56rem;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold2); writing-mode: vertical-lr;
  }
  .scroll-line {
    width: 1px; height: 64px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.12} }

  /* ── LAYOUT ── */
  section { padding: 6rem 3.5rem; }
  .sec-label {
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.9rem;
  }
  .sec-label::before { content:''; width:26px; height:1px; background:var(--gold); }
  .sec-title {
    font-family: var(--D);
    font-size: clamp(2.8rem, 6.5vw, 6rem);
    line-height: 0.9; letter-spacing: 0.03em;
    text-transform: uppercase; color: var(--white);
  }

  /* ── API CONFIG ── */
  .api-bar {
    display: flex; align-items: center; gap: 1rem;
    flex-wrap: wrap;
    border: 1px solid var(--border);
    background: var(--g1); padding: 1rem 1.5rem;
    margin-bottom: 3rem;
  }
  .api-lbl {
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold2); white-space: nowrap;
  }
  .api-in {
    flex: 1; min-width: 200px;
    background: var(--black); border: 1px solid var(--border);
    outline: none; padding: 0.6rem 1rem;
    font-family: var(--M); font-size: 0.72rem;
    color: var(--white); caret-color: var(--gold);
  }
  .api-in::placeholder { color: var(--gold2); opacity: 0.5; }
  .btn-connect {
    font-family: var(--M); font-size: 0.62rem;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 0.6rem 1.3rem;
    background: transparent; border: 1px solid var(--gold);
    color: var(--gold); cursor: crosshair; transition: all 0.2s; white-space: nowrap;
  }
  .btn-connect:hover { background: var(--gold); color: var(--black); }
  .api-msg {
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.12em; text-transform: uppercase;
  }
  .api-msg.ok  { color: var(--green); }
  .api-msg.err { color: var(--red); }

  /* ── UPLOAD ZONE ── */
  .upload-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    border: 1px solid var(--border);
  }
  .upload-panel {
    background: var(--g1); padding: 0;
  }
  .upload-panel-head {
    display: flex; align-items: center; gap: 1rem;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--border);
  }
  .upload-panel-icon { font-size: 1.4rem; }
  .upload-panel-title {
    font-family: var(--D); font-size: 1.6rem;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--white);
  }
  .upload-panel-sub {
    font-family: var(--M); font-size: 0.58rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--cream); opacity: 0.5; margin-top: 0.2rem;
  }
  .upload-panel-body { padding: 2rem; }

  /* drop zone */
  .drop {
    border: 1px dashed var(--border);
    background: var(--black);
    padding: 3rem 1.5rem;
    text-align: center;
    position: relative; cursor: pointer;
    transition: border-color 0.25s, background 0.25s;
  }
  .drop:hover, .drop.over { border-color: var(--gold); background: rgba(212,168,83,0.035); }
  .drop input[type=file] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .drop-ico { font-size: 2.2rem; display: block; margin-bottom: 0.8rem; }
  .drop-lbl {
    font-family: var(--M); font-size: 0.68rem;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--cream); opacity: 0.65;
  }
  .drop-hint {
    font-family: var(--M); font-size: 0.56rem;
    letter-spacing: 0.1em; color: var(--gold2); margin-top: 0.5rem;
  }

  /* preview */
  .preview {
    position: relative; margin-top: 1.2rem;
    border: 1px solid var(--border); overflow: hidden;
  }
  .preview img {
    width: 100%; max-height: 200px;
    object-fit: cover; display: block;
    transition: filter 0.4s;
  }
  .preview-flag {
    position: absolute; inset: 0;
    background: rgba(184,48,48,0.4);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--D); font-size: 1.5rem;
    letter-spacing: 0.1em; color: #fff;
  }
  .file-chip {
    margin-top: 0.6rem;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .file-chip span {
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.08em; color: var(--cream); opacity: 0.55;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;
  }

  .btn-run {
    width: 100%; margin-top: 1.2rem;
    font-family: var(--D); font-size: 1.3rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 1rem; background: var(--gold); color: var(--black);
    border: none; cursor: crosshair; transition: all 0.2s;
  }
  .btn-run:hover:not(:disabled) { background: var(--white); }
  .btn-run:disabled { opacity: 0.35; cursor: not-allowed; }
  .btn-clear {
    width: 100%; margin-top: 0.6rem;
    font-family: var(--M); font-size: 0.62rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.6rem; background: transparent;
    border: 1px solid var(--border); color: var(--cream);
    cursor: crosshair; transition: all 0.2s;
  }
  .btn-clear:hover { border-color: var(--gold); color: var(--gold); }

  /* loading */
  .loading {
    display: flex; align-items: center; gap: 0.9rem;
    margin-top: 1.4rem; padding: 1rem 1.2rem;
    border: 1px solid var(--border); background: var(--black);
    font-family: var(--M); font-size: 0.65rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
  }
  .spin {
    width: 16px; height: 16px; flex-shrink: 0;
    border: 1px solid var(--g3); border-top-color: var(--gold);
    border-radius: 50%; animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to{transform:rotate(360deg)} }

  /* error */
  .err-box {
    margin-top: 1.2rem; padding: 1rem 1.2rem;
    border: 1px solid var(--red); background: var(--red-bg);
    font-family: var(--M); font-size: 0.66rem;
    letter-spacing: 0.08em; color: #e07070;
    animation: fadeUp 0.3s ease;
  }

  /* ── RESULT PANEL ── */
  .result-panel {
    background: var(--g1); border: 1px solid var(--border);
    animation: fadeUp 0.45s ease both;
    overflow: hidden;
  }
  @keyframes fadeUp {
    from{opacity:0;transform:translateY(12px)}
    to{opacity:1;transform:translateY(0)}
  }
  .result-panel.danger { border-color: var(--red); }
  .result-panel.safe   { border-color: var(--green); }
  .result-panel.warn   { border-color: var(--yellow); }
  .result-panel.art    { border-color: var(--purple); }

  .result-hero {
    padding: 2.5rem 2.5rem 2rem;
    border-bottom: 1px solid var(--border);
  }
  .result-hero.danger { background: var(--red-bg); }
  .result-hero.safe   { background: var(--grn-bg); }
  .result-hero.warn   { background: var(--ylw-bg); }
  .result-hero.art    { background: var(--pur-bg); }

  .verdict {
    font-family: var(--D);
    font-size: clamp(2.2rem, 5vw, 4rem);
    letter-spacing: 0.06em; text-transform: uppercase; line-height: 1;
  }
  .c-danger { color: var(--red); }
  .c-safe   { color: var(--green); }
  .c-warn   { color: var(--yellow); }
  .c-art    { color: var(--purple); }

  .verdict-sub {
    font-family: var(--M); font-size: 0.62rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--cream); opacity: 0.55; margin-top: 0.4rem;
  }

  /* confidence */
  .conf { margin-top: 1.4rem; }
  .conf-row {
    display: flex; justify-content: space-between;
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--cream); margin-bottom: 0.5rem;
  }
  .conf-track { height: 2px; background: rgba(255,255,255,0.06); position: relative; overflow: hidden; }
  .conf-fill {
    position: absolute; top:0; left:0; bottom:0;
    transition: width 1s cubic-bezier(0.4,0,0.2,1);
  }
  .cf-danger { background: var(--red); }
  .cf-safe   { background: var(--green); }
  .cf-warn   { background: var(--yellow); }
  .cf-art    { background: var(--purple); }

  /* tags */
  .tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.2rem; }
  .tag {
    font-family: var(--M); font-size: 0.56rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 0.28rem 0.75rem; border: 1px solid var(--border); color: var(--cream);
  }
  .tag.tr { border-color: var(--red);   color: var(--red); }
  .tag.tg { border-color: var(--green); color: var(--green); }
  .tag.ty { border-color: var(--yellow);color: var(--yellow); }
  .tag.tp { border-color: var(--purple);color: var(--purple); }
  .tag.to { border-color: var(--gold);  color: var(--gold); }

  /* signals */
  .signals-wrap { padding: 2rem 2.5rem; }
  .signals-title {
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold2); margin-bottom: 1rem;
  }
  .signals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1px; background: var(--border);
    border: 1px solid var(--border);
  }
  .sig-cell {
    background: var(--black); padding: 0.9rem 1.1rem;
    display: flex; flex-direction: column; gap: 0.25rem;
  }
  .sig-k {
    font-family: var(--M); font-size: 0.54rem;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold2);
  }
  .sig-v {
    font-family: var(--M); font-size: 0.8rem; color: var(--white);
  }
  .sig-v.vr { color: var(--red); }
  .sig-v.vy { color: var(--yellow); }
  .sig-v.vg { color: var(--green); }

  /* video frames */
  .frames-wrap { padding: 0 2.5rem 2rem; }
  .frames-toggle {
    font-family: var(--M); font-size: 0.6rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 0.55rem 1.1rem; background: transparent;
    border: 1px solid var(--border); color: var(--cream);
    cursor: crosshair; transition: all 0.2s; margin-bottom: 1rem;
  }
  .frames-toggle:hover { border-color: var(--gold); color: var(--gold); }
  .frame-tbl { width: 100%; border-collapse: collapse; }
  .frame-tbl th {
    text-align: left; padding: 0.5rem 0.8rem;
    font-family: var(--M); font-size: 0.56rem;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold2); border-bottom: 1px solid var(--border); font-weight: 400;
  }
  .frame-tbl td {
    padding: 0.42rem 0.8rem; font-family: var(--M); font-size: 0.64rem;
    color: var(--cream); border-bottom: 1px solid rgba(37,37,37,0.5);
  }
  .frame-tbl tr:hover td { background: var(--g2); }

  /* ── STAT STRIP ── */
  .stat-strip {
    display: grid; grid-template-columns: repeat(4,1fr);
    border: 1px solid var(--border); margin-top: 5rem;
  }
  .stat-cell {
    padding: 2.5rem 1.5rem; border-right: 1px solid var(--border); text-align: center;
  }
  .stat-cell:last-child { border-right: none; }
  .stat-n {
    font-family: var(--D); font-size: clamp(2.5rem, 5vw, 4.5rem);
    color: var(--gold); line-height: 1;
  }
  .stat-l {
    font-family: var(--M); font-size: 0.58rem;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--cream); opacity: 0.55; margin-top: 0.4rem;
  }

  /* ── HOW IT WORKS ── */
  .how-grid {
    display: grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
    gap: 2px; margin-top: 4rem;
  }
  .how-card {
    background: var(--g1); border: 1px solid var(--border);
    padding: 2.2rem 1.8rem; transition: background 0.3s;
  }
  .how-card:hover { background: var(--g2); }
  .how-n {
    font-family: var(--D); font-size: 4.5rem;
    color: var(--gold); opacity: 0.15; line-height: 1; margin-bottom: 0.8rem;
  }
  .how-t {
    font-family: var(--D); font-size: 1.5rem;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: var(--white); margin-bottom: 0.5rem;
  }
  .how-b {
    font-family: var(--B); font-size: 0.95rem;
    color: var(--cream); opacity: 0.75; line-height: 1.75;
  }

  /* ── LABELS STRIP ── */
  .labels-strip {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr));
    gap: 2px; border: 1px solid var(--border); margin-top: 2rem;
  }
  .label-card {
    background: var(--g1); padding: 1.8rem 1.5rem;
    border: 1px solid var(--border); transition: background 0.3s;
  }
  .label-card:hover { background: var(--g2); }
  .label-chip {
    font-family: var(--D); font-size: 1.3rem;
    letter-spacing: 0.05em; text-transform: uppercase; line-height: 1; margin-bottom: 0.5rem;
  }
  .label-body {
    font-family: var(--B); font-size: 0.88rem;
    color: var(--cream); opacity: 0.7; line-height: 1.65;
  }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--border); padding: 3rem 3.5rem;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1.2rem;
  }
  .footer-logo {
    font-family: var(--D); font-size: 1.4rem;
    letter-spacing: 0.12em; color: var(--gold);
  }
  .footer-note {
    font-family: var(--M); font-size: 0.58rem;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold2);
  }
  .footer-links { display: flex; gap: 1.8rem; }
  .footer-links a {
    font-family: var(--M); font-size: 0.58rem;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold2); text-decoration: none; transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--gold); }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .upload-section { grid-template-columns: 1fr; }
    .nav-center { display: none; }
    .stat-strip { grid-template-columns: repeat(2,1fr); }
    .stat-cell:nth-child(2) { border-right: none; }
  }
  @media (max-width: 600px) {
    .nav, section, .hero, .footer { padding-left: 1.5rem; padding-right: 1.5rem; }
    .hero { padding-bottom: 4rem; }
  }
`;

/* ── helpers ── */
const DEFAULT_URL = "http://localhost:8000";

function getStyle(label = "") {
  const l = label.toUpperCase();
  if (l.includes("FAKE_AI"))        return { box:"danger", hero:"danger", verdict:"c-danger", bar:"cf-danger", icon:"🤖" };
  if (l.includes("FAKE_DEEP"))      return { box:"danger", hero:"danger", verdict:"c-danger", bar:"cf-danger", icon:"👤" };
  if (l.includes("FAKE_MANIP"))     return { box:"warn",   hero:"warn",   verdict:"c-warn",   bar:"cf-warn",   icon:"✂️" };
  if (l.includes("DIGITAL") || l.includes("ART")) return { box:"art", hero:"art", verdict:"c-art", bar:"cf-art", icon:"🎨" };
  return { box:"safe", hero:"safe", verdict:"c-safe", bar:"cf-safe", icon:"✅" };
}

function getTags(label = "") {
  const m = {
    REAL:              [["Authentic","tg"],["No Manipulation","tg"],["Genuine","tg"]],
    DIGITAL_ART:       [["Digital Art","tp"],["Illustration / CGI","tp"],["Not Photographic","tp"]],
    FAKE_DEEPFAKE:     [["Deepfake","tr"],["Face Swap","tr"],["Identity Spoofed","tr"],["GAN Composite","to"]],
    FAKE_AI_GENERATED: [["AI Generated","tr"],["Synthetic","tr"],["Diffusion / GAN","to"],["Not Real","tr"]],
    FAKE_MANIPULATED:  [["Manipulated","ty"],["Spliced / Edited","ty"],["ELA Anomaly","to"]],
  };
  return m[label.toUpperCase()] || [["Unknown",""]];
}

function sigColor(k, v) {
  const n = parseFloat(v);
  if (isNaN(n)) return "";
  const hi = ["ai_generated_score","ela_score","noise_score","face_inconsistency_score","deepfake_confidence"];
  if (hi.some(x => k.includes(x.replace("deepfake_confidence","confidence")))) {
    if (n > 0.65) return "vr";
    if (n > 0.38) return "vy";
    return "vg";
  }
  return "";
}

function fmt(v) {
  if (typeof v === "number") return v > 1 ? v.toFixed(0) : v.toFixed(3);
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
}

function fmtKey(k) {
  return k.replace(/_/g," ").replace(/\b\w/g, c=>c.toUpperCase());
}

function pct(v) { return Math.round((v <= 1 ? v : v / 100) * 100); }

/* ── Marquee ── */
function Mq({ items }) {
  const d = [...items,...items];
  return (
    <div className="mq">
      <div className="mq-inner">
        {d.map((it,i)=><span key={i} className={it.g?"g":""}>{it.t}</span>)}
      </div>
    </div>
  );
}

/* ── ConfBar ── */
function ConfBar({ value, barCls }) {
  return (
    <div className="conf">
      <div className="conf-row"><span>Confidence Score</span><span>{pct(value)}%</span></div>
      <div className="conf-track">
        <div className={`conf-fill ${barCls}`} style={{ width:`${pct(value)}%` }} />
      </div>
    </div>
  );
}

/* ── Signals Grid ── */
function Signals({ signals }) {
  if (!signals) return null;
  const entries = Object.entries(signals).filter(([,v]) => typeof v !== "object" && v !== null);
  if (!entries.length) return null;
  return (
    <div className="signals-wrap">
      <div className="signals-title">Raw Detection Signals</div>
      <div className="signals-grid">
        {entries.map(([k,v])=>(
          <div className="sig-cell" key={k}>
            <span className="sig-k">{fmtKey(k)}</span>
            <span className={`sig-v ${sigColor(k,v)}`}>{fmt(v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Image Result ── */
function ImageResult({ data }) {
  const s = getStyle(data.label);
  const tags = getTags(data.label);
  return (
    <div className={`result-panel ${s.box}`}>
      <div className={`result-hero ${s.hero}`}>
        <div className={`verdict ${s.verdict}`}>{s.icon} {data.label.replace(/_/g," ")}</div>
        <div className="verdict-sub">Image Analysis · Multi-Signal Pipeline</div>
        <ConfBar value={data.confidence} barCls={s.bar} />
        <div className="tags">
          {tags.map(([l,c],i)=><span key={i} className={`tag ${c}`}>{l}</span>)}
        </div>
      </div>
      <Signals signals={data.signals} />
    </div>
  );
}

/* ── Video Result ── */
function VideoResult({ data }) {
  const [showFrames, setShowFrames] = useState(false);
  const s = getStyle(data.video_label);
  const tags = getTags(data.video_label);
  return (
    <div className={`result-panel ${s.box}`}>
      <div className={`result-hero ${s.hero}`}>
        <div className={`verdict ${s.verdict}`}>{s.icon} {data.video_label.replace(/_/g," ")}</div>
        <div className="verdict-sub">
          Video Analysis · {data.total_frames} frames · {data.fake_frames} flagged
        </div>
        <ConfBar value={data.average_confidence} barCls={s.bar} />
        <div className="tags">
          {tags.map(([l,c],i)=><span key={i} className={`tag ${c}`}>{l}</span>)}
          <span className="tag">{data.total_frames} Frames</span>
          <span className={`tag ${data.fake_frames>0?"tr":"tg"}`}>{data.fake_frames} Fake</span>
          <span className={`tag tg`}>{data.real_frames} Real</span>
          {data.art_frames>0 && <span className="tag tp">{data.art_frames} Art</span>}
        </div>
      </div>

      {/* breakdown */}
      <div className="signals-wrap">
        <div className="signals-title">Frame Label Breakdown</div>
        <div className="signals-grid">
          {Object.entries(data.label_breakdown||{}).map(([lbl,cnt])=>(
            <div className="sig-cell" key={lbl}>
              <span className="sig-k">{lbl.replace(/_/g," ")}</span>
              <span className={`sig-v ${lbl.startsWith("FAKE")?"vr":"vg"}`}>{cnt} frames</span>
            </div>
          ))}
        </div>
      </div>

      {/* per-frame table */}
      {data.frames && (
        <div className="frames-wrap">
          <button className="frames-toggle" onClick={()=>setShowFrames(v=>!v)}>
            {showFrames?"▲ Hide":"▼ Show"} Per-Frame Detail ({data.frames.length} frames)
          </button>
          {showFrames && (
            <table className="frame-tbl">
              <thead>
                <tr>
                  <th>#</th><th>Label</th><th>Conf</th>
                  <th>AI Score</th><th>ELA</th><th>Noise</th><th>Face Inc.</th>
                </tr>
              </thead>
              <tbody>
                {data.frames.map((f,i)=>(
                  <tr key={i}>
                    <td>{i+1}</td>
                    <td style={{color: f.label.startsWith("FAKE")?"var(--red)":"var(--green)"}}>
                      {f.label.replace(/_/g," ")}
                    </td>
                    <td>{pct(f.confidence)}%</td>
                    <td>{f.signals?.ai_generated_score??"-"}</td>
                    <td>{f.signals?.ela_score??"-"}</td>
                    <td>{f.signals?.noise_score??"-"}</td>
                    <td>{f.signals?.face_inconsistency_score??"-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Upload Panel ── */
function UploadPanel({ icon, title, sub, accept, isVideo, baseUrl }) {
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [drag, setDrag]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);

  const pick = (f) => {
    if (!f) return;
    setFile(f); setResult(null); setError(null);
    if (!isVideo) {
      const r = new FileReader();
      r.onload = e => setPreview(e.target.result);
      r.readAsDataURL(f);
    } else setPreview(null);
  };

  const reset = () => { setFile(null); setPreview(null); setResult(null); setError(null); };

  const run = async () => {
    if (!file) return;
    setLoading(true); setResult(null); setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const ep = isVideo ? `${baseUrl}/detect/video` : `${baseUrl}/detect/image`;
      const res = await fetch(ep, { method:"POST", body:fd });
      if (!res.ok) {
        const j = await res.json().catch(()=>({}));
        throw new Error(j.detail || `HTTP ${res.status}`);
      }
      setResult(await res.json());
    } catch(e) {
      setError(e.message || "Request failed. Is the API running?");
    } finally { setLoading(false); }
  };

  const flagged = result && (
    (result.label?.startsWith("FAKE")) || (result.video_label?.startsWith("FAKE"))
  );

  return (
    <div className="upload-panel">
      <div className="upload-panel-head">
        <span className="upload-panel-icon">{icon}</span>
        <div>
          <div className="upload-panel-title">{title}</div>
          <div className="upload-panel-sub">{sub}</div>
        </div>
      </div>
      <div className="upload-panel-body">
        <div
          className={`drop ${drag?"over":""}`}
          onDragOver={e=>{e.preventDefault();setDrag(true);}}
          onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);pick(e.dataTransfer.files[0]);}}
        >
          <input type="file" accept={accept} onChange={e=>pick(e.target.files[0])} />
          <span className="drop-ico">{icon}</span>
          <div className="drop-lbl">
            {isVideo ? "Drop video or click to browse" : "Drop image or click to browse"}
          </div>
          <div className="drop-hint">{accept.toUpperCase().replace(/\*/g,"").replace(/,/g," · ")}</div>
        </div>

        {preview && !isVideo && (
          <div className="preview">
            <img src={preview} alt="" style={{ filter: flagged?"grayscale(0.5) brightness(0.65)":"brightness(0.88)" }} />
            {flagged && <div className="preview-flag">⚠ FLAGGED</div>}
          </div>
        )}
        {isVideo && file && (
          <div className="file-chip">
            <span>🎬</span>
            <span>{file.name} — {(file.size/1024/1024).toFixed(1)} MB</span>
          </div>
        )}
        {preview && !isVideo && (
          <div className="file-chip"><span>{file?.name}</span></div>
        )}

        {file && !loading && (
          <>
            <button className="btn-run" onClick={run}>Analyze for Deepfake</button>
            <button className="btn-clear" onClick={reset}>Clear</button>
          </>
        )}

        {loading && (
          <div className="loading">
            <div className="spin" />
            {isVideo
              ? "Sampling 16 frames · Running multi-signal analysis…"
              : "Running deepfake + AI-generation + manipulation detection…"}
          </div>
        )}
        {error && <div className="err-box">⚠ {error}</div>}
        {result && !isVideo && <div style={{marginTop:"1.2rem"}}><ImageResult data={result} /></div>}
        {result &&  isVideo && <div style={{marginTop:"1.2rem"}}><VideoResult data={result} /></div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════ */
export default function App() {
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL);
  const [baseUrl, setBaseUrl]   = useState(DEFAULT_URL);
  const [apiStatus, setApiStatus] = useState("unknown");

  const testApi = async () => {
    const url = inputUrl.trim().replace(/\/$/,"");
    setBaseUrl(url); setApiStatus("checking");
    try {
      const res  = await fetch(`${url}/health`, { signal: AbortSignal.timeout(4000) });
      const data = await res.json();
      setApiStatus(data.models_loaded ? "online" : "offline");
    } catch { setApiStatus("offline"); }
  };

  const MQ1 = [
    {t:"Deepfake Detection"},{t:"·",g:true},
    {t:"Face Swap Analysis"},{t:"·",g:true},
    {t:"AI Image Scanner"},{t:"·",g:true},
    {t:"GAN Artefact Detection"},{t:"·",g:true},
    {t:"ELA Signal Pipeline"},{t:"·",g:true},
    {t:"Video Frame Sampling"},{t:"·",g:true},
    {t:"Deepfake Detection"},{t:"·",g:true},
    {t:"Face Swap Analysis"},{t:"·",g:true},
    {t:"AI Image Scanner"},{t:"·",g:true},
    {t:"GAN Artefact Detection"},{t:"·",g:true},
    {t:"ELA Signal Pipeline"},{t:"·",g:true},
    {t:"Video Frame Sampling"},{t:"·",g:true},
  ];

  const MQ2 = [
    {t:"REAL"},{t:"—",g:true},
    {t:"DIGITAL ART"},{t:"—",g:true},
    {t:"FAKE DEEPFAKE"},{t:"—",g:true},
    {t:"FAKE AI GENERATED"},{t:"—",g:true},
    {t:"FAKE MANIPULATED"},{t:"—",g:true},
    {t:"5 Labels · 2 Models · 4 Signals"},{t:"—",g:true},
    {t:"REAL"},{t:"—",g:true},
    {t:"DIGITAL ART"},{t:"—",g:true},
    {t:"FAKE DEEPFAKE"},{t:"—",g:true},
    {t:"FAKE AI GENERATED"},{t:"—",g:true},
    {t:"FAKE MANIPULATED"},{t:"—",g:true},
    {t:"5 Labels · 2 Models · 4 Signals"},{t:"—",g:true},
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="logo">
          <div className="logo-dot" />SENTINEL
        </a>
        <ul className="nav-center">
          <li><a href="#detect">Detect</a></li>
          <li><a href="#how">Pipeline</a></li>
          <li><a href="#labels">Labels</a></li>
        </ul>
        <div className="nav-pill">
          <div className={`pill-dot ${apiStatus==="online"?"on":apiStatus==="offline"?"off":""}`} />
          {apiStatus==="online" ? "API Online" : apiStatus==="offline" ? "API Offline" : "API Status"}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-watermark">DEEP</div>
        <div className="hero-tag">// Sentinel · Multi-Signal Deepfake Detection Engine</div>
        <h1 className="hero-h1">
          UNMASK<br />
          <span className="out">THE</span>{" "}
          <span className="gld">FAKE</span>
        </h1>
        <p className="hero-sub">
          Two AI models. Four detection signals. Five verdict labels.
          Drop an image or video — get a forensic-grade deepfake verdict in seconds.
        </p>
        <div className="hero-cta-row">
          <a href="#detect" className="btn-primary">Start Detecting</a>
          <a href="#how" className="btn-ghost">How It Works</a>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <Mq items={MQ1} />

      {/* DETECT */}
      <section id="detect">
        <div className="sec-label">Detection Suite</div>
        <h2 className="sec-title">Run The<br/>Analysis.</h2>

        {/* API Bar */}
        <div className="api-bar">
          <span className="api-lbl">API Endpoint</span>
          <input
            className="api-in"
            value={inputUrl}
            placeholder="http://localhost:8000"
            onChange={e=>setInputUrl(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&testApi()}
          />
          <button className="btn-connect" onClick={testApi}>
            {apiStatus==="checking"?"Testing…":"Test Connection"}
          </button>
          {apiStatus==="online"  && <span className="api-msg ok">✓ Models Loaded</span>}
          {apiStatus==="offline" && <span className="api-msg err">✗ Unreachable — Start your FastAPI server</span>}
        </div>

        {/* Two panels side by side */}
        <div className="upload-section">
          <UploadPanel
            icon="🎭"
            title="Image Detector"
            sub="JPG · PNG · WEBP · BMP"
            accept="image/jpeg,image/png,image/webp,image/bmp"
            isVideo={false}
            baseUrl={baseUrl}
          />
          <UploadPanel
            icon="🎬"
            title="Video Detector"
            sub="MP4 · AVI · MOV · MKV"
            accept="video/mp4,video/avi,video/quicktime,video/x-matroska"
            isVideo={true}
            baseUrl={baseUrl}
          />
        </div>

        {/* Stats */}
        <div className="stat-strip">
          <div className="stat-cell">
            <div className="stat-n">5</div>
            <div className="stat-l">Output Labels</div>
          </div>
          <div className="stat-cell">
            <div className="stat-n">2</div>
            <div className="stat-l">AI Models</div>
          </div>
          <div className="stat-cell">
            <div className="stat-n">4</div>
            <div className="stat-l">Signal Pipelines</div>
          </div>
          <div className="stat-cell">
            <div className="stat-n">16</div>
            <div className="stat-l">Video Frames</div>
          </div>
        </div>
      </section>

      <Mq items={MQ2} />

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="sec-label">Pipeline</div>
        <h2 className="sec-title">How It<br/>Works.</h2>
        <div className="how-grid">
          {[
            {n:"01",t:"Upload",b:"Drop an image (JPG/PNG/WEBP) or video (MP4/AVI/MOV). For video, 16 frames are uniformly sampled across the full timeline."},
            {n:"02",t:"Dual Model",b:"Two Hugging Face models run in parallel — a face-swap / deepfake classifier and a GAN / diffusion AI-generation detector."},
            {n:"03",t:"4 Signals",b:"Error Level Analysis (ELA), DFT frequency noise, face-region blending inconsistency, and style analysis (art vs photo) are computed as independent signals."},
            {n:"04",t:"Verdict",b:"A strict priority-ordered rule fuses all signals into one of five labels — REAL, DIGITAL_ART, FAKE_DEEPFAKE, FAKE_AI_GENERATED, or FAKE_MANIPULATED."},
          ].map(c=>(
            <div className="how-card" key={c.n}>
              <div className="how-n">{c.n}</div>
              <div className="how-t">{c.t}</div>
              <p className="how-b">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LABELS */}
      <section id="labels">
        <div className="sec-label">Output System</div>
        <h2 className="sec-title">5 Detection<br/>Labels.</h2>
        <div className="labels-strip">
          {[
            {chip:"✅ REAL",       color:"var(--green)",  b:"Authentic photograph or genuine video frame. No manipulation signals detected."},
            {chip:"🎨 DIGITAL ART",color:"var(--purple)", b:"Illustration, anime, painting, 3D render, or CGI. Checked first — art is never labelled as deepfake."},
            {chip:"👤 FAKE DEEPFAKE",  color:"var(--red)",   b:"Face-swapped or identity-manipulated image. Requires deepfake model ≥70% confidence AND face inconsistency ≥0.30."},
            {chip:"🤖 FAKE AI GEN",color:"var(--red)",   b:"Fully synthetic image by Stable Diffusion, Midjourney, DALL-E, or Gemini. Detected via AI classifier + noise fingerprint."},
            {chip:"✂️ FAKE MANIP", color:"var(--yellow)", b:"Real photo locally edited or composited. Requires 2 of 3 manipulation signals (ELA, noise, face) to fire simultaneously."},
          ].map((l,i)=>(
            <div className="label-card" key={i}>
              <div className="label-chip" style={{color:l.color}}>{l.chip}</div>
              <p className="label-body">{l.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">SENTINEL</div>
        <div className="footer-note">© 2025 · No data stored · In-memory inference only</div>
        <div className="footer-links">
          <a href="#detect">Detect</a>
          <a href="#how">Pipeline</a>
          <a href="#labels">Labels</a>
        </div>
      </footer>
    </>
  );
}