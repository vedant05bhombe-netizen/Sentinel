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

  body::after {
    content: '';
    position: fixed; inset: 0;
    pointer-events: none; z-index: 9998; opacity: 0.25;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='0.06'/%3E%3C/svg%3E");
  }

  /* NAV */
  .nav {
    position: fixed; top:0; left:0; right:0; z-index:200;
    display:flex; align-items:center; justify-content:space-between;
    padding: 1.2rem 3.5rem;
    background: rgba(6,6,6,0.92);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
  }
  .logo {
    display:flex; align-items:center; gap:0.7rem;
    font-family:var(--D); font-size:1.5rem;
    letter-spacing:0.14em; color:var(--gold); text-decoration:none;
  }
  .logo-dot {
    width:8px; height:8px; border-radius:50%;
    background:var(--gold);
    animation: blink 2.4s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.1} }
  .nav-links { display:flex; gap:2.5rem; list-style:none; }
  .nav-links a {
    font-family:var(--M); font-size:0.65rem;
    letter-spacing:0.22em; text-transform:uppercase;
    color:var(--cream); text-decoration:none; transition:color 0.2s;
  }
  .nav-links a:hover { color:var(--gold); }
  .nav-pill {
    display:flex; align-items:center; gap:0.5rem;
    font-family:var(--M); font-size:0.6rem;
    letter-spacing:0.15em; text-transform:uppercase;
    color:var(--cream); opacity:0.6;
  }
  .pill-dot {
    width:6px; height:6px; border-radius:50%;
    background:var(--g3); transition:background 0.4s, box-shadow 0.4s;
  }
  .pill-dot.on  { background:var(--green); box-shadow:0 0 7px var(--green); }
  .pill-dot.off { background:var(--red); }

  /* MARQUEE */
  .mq {
    overflow:hidden; white-space:nowrap;
    border-top:1px solid var(--border); border-bottom:1px solid var(--border);
    background:var(--g1); padding:9px 0;
  }
  .mq-inner { display:inline-flex; animation:mq 28s linear infinite; }
  .mq-inner span {
    font-family:var(--M); font-size:0.65rem;
    letter-spacing:0.22em; text-transform:uppercase;
    color:var(--cream); padding:0 2.2rem;
  }
  .mq-inner span.g { color:var(--gold); }
  @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* HERO */
  .hero {
    min-height:100vh;
    display:flex; flex-direction:column; justify-content:flex-end;
    padding:0 3.5rem 5.5rem;
    position:relative; overflow:hidden;
  }
  .hero-wm {
    position:absolute; top:50%; right:-3rem;
    transform:translateY(-52%);
    font-family:var(--D);
    font-size:clamp(9rem,24vw,24rem);
    color:transparent;
    -webkit-text-stroke:1px rgba(212,168,83,0.055);
    pointer-events:none; user-select:none;
    line-height:1; letter-spacing:-0.02em;
  }
  .hero-tag {
    font-family:var(--M); font-size:0.65rem;
    letter-spacing:0.38em; text-transform:uppercase;
    color:var(--gold); margin-bottom:1.4rem;
    display:flex; align-items:center; gap:1rem;
  }
  .hero-tag::after { content:''; width:50px; height:1px; background:var(--gold); opacity:0.4; }
  .hero-h1 {
    font-family:var(--D);
    font-size:clamp(4.5rem,13vw,13rem);
    line-height:0.86; letter-spacing:0.02em; text-transform:uppercase;
  }
  .hero-h1 .out { -webkit-text-stroke:1px var(--white); color:transparent; }
  .hero-h1 .gld { color:var(--gold); }
  .hero-sub {
    font-family:var(--B); font-style:italic;
    font-size:clamp(1rem,1.5vw,1.25rem);
    color:var(--cream); max-width:520px;
    margin-top:2.2rem; line-height:1.8; opacity:0.82;
  }
  .hero-cta-row { display:flex; gap:1rem; margin-top:2.5rem; flex-wrap:wrap; }
  .btn-primary {
    font-family:var(--D); font-size:1.2rem;
    letter-spacing:0.1em; text-transform:uppercase;
    padding:0.85rem 2.8rem;
    background:var(--gold); color:var(--black);
    border:none; cursor:crosshair; transition:all 0.22s;
    text-decoration:none; display:inline-block;
  }
  .btn-primary:hover { background:var(--white); }
  .btn-ghost {
    font-family:var(--M); font-size:0.68rem;
    letter-spacing:0.2em; text-transform:uppercase;
    padding:0.85rem 2rem;
    background:transparent; border:1px solid var(--border);
    color:var(--cream); cursor:crosshair; transition:all 0.22s;
    text-decoration:none; display:inline-block;
  }
  .btn-ghost:hover { border-color:var(--gold); color:var(--gold); }
  .scroll-hint {
    position:absolute; bottom:2.5rem; right:3.5rem;
    display:flex; flex-direction:column; align-items:center; gap:0.7rem;
  }
  .scroll-hint span {
    font-family:var(--M); font-size:0.56rem;
    letter-spacing:0.3em; text-transform:uppercase;
    color:var(--gold2); writing-mode:vertical-lr;
  }
  .scroll-line {
    width:1px; height:64px;
    background:linear-gradient(to bottom, var(--gold), transparent);
    animation:pulse 2.2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.12} }

  /* SECTIONS */
  section { padding:6rem 3.5rem; }
  .sec-label {
    font-family:var(--M); font-size:0.6rem;
    letter-spacing:0.4em; text-transform:uppercase;
    color:var(--gold); margin-bottom:1rem;
    display:flex; align-items:center; gap:0.9rem;
  }
  .sec-label::before { content:''; width:26px; height:1px; background:var(--gold); }
  .sec-title {
    font-family:var(--D);
    font-size:clamp(2.8rem,6.5vw,6rem);
    line-height:0.9; letter-spacing:0.03em;
    text-transform:uppercase; color:var(--white);
  }

  /* SCAN BOX */
  .scan-box {
    margin-top:3rem;
    border:1px solid var(--border);
    background:var(--g1);
  }
  .scan-head {
    padding:2rem 2.5rem;
    border-bottom:1px solid var(--border);
  }
  .scan-head-title {
    font-family:var(--D); font-size:1.8rem;
    letter-spacing:0.06em; text-transform:uppercase;
    color:var(--white);
  }
  .scan-head-sub {
    font-family:var(--M); font-size:0.6rem;
    letter-spacing:0.15em; text-transform:uppercase;
    color:var(--cream); opacity:0.5; margin-top:0.3rem;
  }
  .scan-body { padding:2rem 2.5rem; }

  /* API bar */
  .api-bar {
    display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
    border:1px solid var(--border); background:var(--g2);
    padding:0.9rem 1.3rem; margin-bottom:1.8rem;
  }
  .api-lbl {
    font-family:var(--M); font-size:0.58rem;
    letter-spacing:0.2em; text-transform:uppercase;
    color:var(--gold2); white-space:nowrap;
  }
  .api-in {
    flex:1; min-width:180px;
    background:var(--black); border:1px solid var(--border);
    outline:none; padding:0.55rem 0.9rem;
    font-family:var(--M); font-size:0.7rem;
    color:var(--white); caret-color:var(--gold);
  }
  .api-in::placeholder { color:var(--gold2); opacity:0.5; }
  .btn-conn {
    font-family:var(--M); font-size:0.6rem;
    letter-spacing:0.15em; text-transform:uppercase;
    padding:0.55rem 1.1rem;
    background:transparent; border:1px solid var(--gold);
    color:var(--gold); cursor:crosshair; transition:all 0.2s; white-space:nowrap;
  }
  .btn-conn:hover { background:var(--gold); color:var(--black); }
  .api-ok  { font-family:var(--M); font-size:0.58rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--green); }
  .api-err { font-family:var(--M); font-size:0.58rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--red); }

  /* url input row */
  .url-row { display:flex; gap:0; border:1px solid var(--border); }
  .url-in {
    flex:1;
    background:var(--black); border:none; outline:none;
    padding:1.1rem 1.5rem;
    font-family:var(--M); font-size:0.82rem;
    letter-spacing:0.04em; color:var(--white);
    caret-color:var(--gold);
  }
  .url-in::placeholder { color:var(--gold2); opacity:0.5; }
  .btn-scan {
    font-family:var(--D); font-size:1.2rem;
    letter-spacing:0.1em; text-transform:uppercase;
    padding:1.1rem 2.8rem;
    background:var(--gold); color:var(--black);
    border:none; cursor:crosshair; transition:all 0.22s; white-space:nowrap;
  }
  .btn-scan:hover:not(:disabled) { background:var(--white); }
  .btn-scan:disabled { opacity:0.35; cursor:not-allowed; }

  /* loading */
  .loading {
    display:flex; align-items:center; gap:0.9rem;
    margin-top:1.5rem; padding:1.1rem 1.4rem;
    border:1px solid var(--border); background:var(--black);
    font-family:var(--M); font-size:0.65rem;
    letter-spacing:0.2em; text-transform:uppercase; color:var(--gold);
  }
  .spin {
    width:16px; height:16px; flex-shrink:0;
    border:1px solid var(--g3); border-top-color:var(--gold);
    border-radius:50%; animation:spin 0.7s linear infinite;
  }
  @keyframes spin { to{transform:rotate(360deg)} }

  /* error */
  .err-box {
    margin-top:1.3rem; padding:1rem 1.3rem;
    border:1px solid var(--red); background:var(--red-bg);
    font-family:var(--M); font-size:0.66rem;
    letter-spacing:0.08em; color:#e07070;
    animation:fadeUp 0.3s ease;
  }

  /* RESULT */
  @keyframes fadeUp {
    from{opacity:0;transform:translateY(12px)}
    to{opacity:1;transform:translateY(0)}
  }

  .result-wrap { margin-top:2rem; animation:fadeUp 0.45s ease both; }

  /* verdict banner */
  .verdict-banner {
    padding:2.5rem;
    border:1px solid var(--border);
    margin-bottom:2px;
  }
  .verdict-banner.danger { border-color:var(--red); background:var(--red-bg); }
  .verdict-banner.safe   { border-color:var(--green); background:var(--grn-bg); }
  .verdict-banner.warn   { border-color:var(--yellow); background:var(--ylw-bg); }

  .verdict-label {
    font-family:var(--D);
    font-size:clamp(2.5rem,5vw,4.5rem);
    letter-spacing:0.06em; text-transform:uppercase; line-height:1;
  }
  .vl-danger { color:var(--red); }
  .vl-safe   { color:var(--green); }
  .vl-warn   { color:var(--yellow); }

  .verdict-url {
    font-family:var(--M); font-size:0.68rem;
    letter-spacing:0.06em; color:var(--cream);
    margin-top:0.6rem; opacity:0.7;
    word-break:break-all;
  }
  .verdict-meta {
    display:flex; gap:2rem; flex-wrap:wrap;
    margin-top:1.4rem; padding-top:1.4rem;
    border-top:1px solid rgba(255,255,255,0.06);
  }
  .vmeta-item { display:flex; flex-direction:column; gap:0.25rem; }
  .vmeta-k {
    font-family:var(--M); font-size:0.56rem;
    letter-spacing:0.2em; text-transform:uppercase; color:var(--gold2);
  }
  .vmeta-v {
    font-family:var(--M); font-size:0.82rem; color:var(--white);
  }

  /* tags */
  .tags { display:flex; flex-wrap:wrap; gap:0.45rem; margin-top:1.2rem; }
  .tag {
    font-family:var(--M); font-size:0.56rem;
    letter-spacing:0.14em; text-transform:uppercase;
    padding:0.28rem 0.75rem; border:1px solid var(--border); color:var(--cream);
  }
  .tag.tr { border-color:var(--red);   color:var(--red); }
  .tag.tg { border-color:var(--green); color:var(--green); }
  .tag.ty { border-color:var(--yellow);color:var(--yellow); }
  .tag.to { border-color:var(--gold);  color:var(--gold); }

  /* scanner cards grid */
  .scanners-grid {
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:2px;
    margin-top:2px;
  }
  .scanner-card {
    background:var(--g1); border:1px solid var(--border);
    padding:1.8rem;
    transition:background 0.3s;
    position:relative; overflow:hidden;
  }
  .scanner-card:hover { background:var(--g2); }
  .scanner-card.sc-danger { border-color:var(--red); }
  .scanner-card.sc-safe   { border-color:var(--green); }
  .scanner-card.sc-warn   { border-color:var(--yellow); }
  .scanner-card.sc-unknown { border-color:var(--border); opacity:0.6; }

  .sc-source {
    font-family:var(--D); font-size:1.4rem;
    letter-spacing:0.06em; text-transform:uppercase;
    color:var(--white); margin-bottom:0.5rem;
  }
  .sc-verdict {
    font-family:var(--M); font-size:0.68rem;
    letter-spacing:0.15em; text-transform:uppercase;
    margin-bottom:0.8rem;
  }
  .sc-verdict.svd { color:var(--red); }
  .sc-verdict.svg { color:var(--green); }
  .sc-verdict.svu { color:var(--gold2); }

  .sc-details {
    font-family:var(--B); font-size:0.9rem;
    color:var(--cream); opacity:0.75; line-height:1.65;
  }
  .sc-error {
    font-family:var(--M); font-size:0.62rem;
    letter-spacing:0.08em; color:var(--gold2); opacity:0.7;
    margin-top:0.5rem;
  }

  .sc-stat-row {
    display:flex; gap:1.5rem; margin-top:1rem; flex-wrap:wrap;
  }
  .sc-stat { display:flex; flex-direction:column; gap:0.2rem; }
  .sc-stat-k {
    font-family:var(--M); font-size:0.52rem;
    letter-spacing:0.18em; text-transform:uppercase; color:var(--gold2);
  }
  .sc-stat-v {
    font-family:var(--M); font-size:0.85rem; color:var(--white);
  }
  .sc-stat-v.vr { color:var(--red); }
  .sc-stat-v.vg { color:var(--green); }

  .sc-screenshot {
    margin-top:1rem; border:1px solid var(--border); overflow:hidden;
  }
  .sc-screenshot img { width:100%; display:block; max-height:120px; object-fit:cover; opacity:0.75; }

  /* stat strip */
  .stat-strip {
    display:grid; grid-template-columns:repeat(4,1fr);
    border:1px solid var(--border); margin-top:5rem;
  }
  .stat-cell {
    padding:2.5rem 1.5rem; border-right:1px solid var(--border); text-align:center;
  }
  .stat-cell:last-child { border-right:none; }
  .stat-n {
    font-family:var(--D); font-size:clamp(2.5rem,5vw,4.5rem);
    color:var(--gold); line-height:1;
  }
  .stat-l {
    font-family:var(--M); font-size:0.58rem;
    letter-spacing:0.2em; text-transform:uppercase;
    color:var(--cream); opacity:0.55; margin-top:0.4rem;
  }

  /* how it works */
  .how-grid {
    display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
    gap:2px; margin-top:4rem;
  }
  .how-card {
    background:var(--g1); border:1px solid var(--border);
    padding:2.2rem 1.8rem; transition:background 0.3s;
  }
  .how-card:hover { background:var(--g2); }
  .how-n {
    font-family:var(--D); font-size:4.5rem;
    color:var(--gold); opacity:0.15; line-height:1; margin-bottom:0.8rem;
  }
  .how-t {
    font-family:var(--D); font-size:1.5rem;
    letter-spacing:0.05em; text-transform:uppercase;
    color:var(--white); margin-bottom:0.5rem;
  }
  .how-b {
    font-family:var(--B); font-size:0.95rem;
    color:var(--cream); opacity:0.75; line-height:1.75;
  }

  /* footer */
  .footer {
    border-top:1px solid var(--border); padding:3rem 3.5rem;
    display:flex; justify-content:space-between; align-items:center;
    flex-wrap:wrap; gap:1.2rem;
  }
  .footer-logo {
    font-family:var(--D); font-size:1.4rem;
    letter-spacing:0.12em; color:var(--gold);
  }
  .footer-note {
    font-family:var(--M); font-size:0.58rem;
    letter-spacing:0.14em; text-transform:uppercase; color:var(--gold2);
  }
  .footer-links { display:flex; gap:1.8rem; }
  .footer-links a {
    font-family:var(--M); font-size:0.58rem;
    letter-spacing:0.14em; text-transform:uppercase;
    color:var(--gold2); text-decoration:none; transition:color 0.2s;
  }
  .footer-links a:hover { color:var(--gold); }

  @media (max-width:768px) {
    .nav-links { display:none; }
    .nav, section, .hero, .footer { padding-left:1.5rem; padding-right:1.5rem; }
    .hero { padding-bottom:4rem; }
    .stat-strip { grid-template-columns:repeat(2,1fr); }
    .stat-cell:nth-child(2) { border-right:none; }
    .scan-body, .scan-head { padding:1.5rem; }
    .url-row { flex-direction:column; }
    .btn-scan { width:100%; }
  }
`;

/* ── helpers ── */
const DEFAULT_URL = "http://localhost:8000";

function getVerdictStyle(verdict = "") {
  const v = verdict.toUpperCase();
  if (v === "DANGEROUS") return { cls: "danger", lbl: "vl-danger", banner: "danger", icon: "🚨" };
  if (v === "SUSPICIOUS") return { cls: "warn",  lbl: "vl-warn",   banner: "warn",   icon: "⚠️" };
  if (v === "SAFE")       return { cls: "safe",  lbl: "vl-safe",   banner: "safe",   icon: "✅" };
  return { cls: "warn", lbl: "vl-warn", banner: "warn", icon: "❓" };
}

function getScannerStyle(safe) {
  if (safe === false) return { cls: "sc-danger", vCls: "svd", label: "⚠ THREAT DETECTED" };
  if (safe === true)  return { cls: "sc-safe",   vCls: "svg", label: "✓ CLEAN" };
  return { cls: "sc-unknown", vCls: "svu", label: "— UNAVAILABLE" };
}

function getThreatTags(summary) {
  const tags = [];
  const tt = summary.threat_types || [];
  tt.forEach(t => {
    if (t.includes("MALWARE") || t.includes("MALICIOUS")) tags.push(["Malware","tr"]);
    if (t.includes("SOCIAL") || t.includes("PHISHING"))   tags.push(["Phishing","tr"]);
    if (t.includes("UNWANTED"))  tags.push(["Unwanted Software","ty"]);
    if (t.includes("HARMFUL"))   tags.push(["Harmful App","ty"]);
  });
  if (summary.verdict === "DANGEROUS")  tags.push(["High Risk","tr"]);
  if (summary.verdict === "SUSPICIOUS") tags.push(["Medium Risk","ty"]);
  if (summary.verdict === "SAFE")       tags.push(["No Threats","tg"],["All Engines Clear","tg"]);
  return tags;
}

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

/* ── Scanner Card ── */
function ScannerCard({ data }) {
  const s = getScannerStyle(data.safe);
  return (
    <div className={`scanner-card ${s.cls}`}>
      <div className="sc-source">{data.source}</div>
      <div className={`sc-verdict ${s.vCls}`}>{s.label}</div>
      {data.details && <div className="sc-details">{data.details}</div>}
      {data.error   && <div className="sc-error">Error: {data.error}</div>}

      {/* VirusTotal stats */}
      {data.malicious !== undefined && (
        <div className="sc-stat-row">
          <div className="sc-stat">
            <span className="sc-stat-k">Malicious</span>
            <span className={`sc-stat-v ${data.malicious>0?"vr":"vg"}`}>{data.malicious}</span>
          </div>
          <div className="sc-stat">
            <span className="sc-stat-k">Suspicious</span>
            <span className={`sc-stat-v ${data.suspicious>0?"vr":"vg"}`}>{data.suspicious}</span>
          </div>
          <div className="sc-stat">
            <span className="sc-stat-k">Total Engines</span>
            <span className="sc-stat-v">{data.total_engines}</span>
          </div>
        </div>
      )}

      {/* URLScan screenshot */}
      {data.screenshot && (
        <div className="sc-screenshot">
          <img src={data.screenshot} alt="URL Screenshot" />
        </div>
      )}

      {/* URLScan score */}
      {data.score !== undefined && (
        <div className="sc-stat-row">
          <div className="sc-stat">
            <span className="sc-stat-k">Risk Score</span>
            <span className={`sc-stat-v ${data.score>50?"vr":data.score>20?"":"vg"}`}>{data.score}/100</span>
          </div>
          {data.tags?.length > 0 && (
            <div className="sc-stat">
              <span className="sc-stat-k">Tags</span>
              <span className="sc-stat-v">{data.tags.join(", ")}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Result ── */
function Result({ data }) {
  const vs = getVerdictStyle(data.summary.verdict);
  const tags = getThreatTags(data.summary);

  return (
    <div className="result-wrap">
      {/* verdict banner */}
      <div className={`verdict-banner ${vs.banner}`}>
        <div className={`verdict-label ${vs.lbl}`}>{vs.icon} {data.summary.verdict}</div>
        <div className="verdict-url">{data.url}</div>
        <div className="tags">
          {tags.map(([l,c],i)=><span key={i} className={`tag ${c}`}>{l}</span>)}
          {data.summary.threat_types.map((t,i)=>(
            <span key={i} className="tag tr">{t.replace(/_/g," ")}</span>
          ))}
        </div>
        <div className="verdict-meta">
          <div className="vmeta-item">
            <span className="vmeta-k">Domain</span>
            <span className="vmeta-v">{data.domain}</span>
          </div>
          <div className="vmeta-item">
            <span className="vmeta-k">Risk Level</span>
            <span className="vmeta-v">{data.summary.risk}</span>
          </div>
          <div className="vmeta-item">
            <span className="vmeta-k">Engines Flagged</span>
            <span className="vmeta-v">{data.summary.danger_count} / 4</span>
          </div>
          <div className="vmeta-item">
            <span className="vmeta-k">Scanned At</span>
            <span className="vmeta-v">{new Date(data.scanned_at).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* per-scanner cards */}
      <div className="scanners-grid">
        {data.scanners.map((sc,i)=><ScannerCard key={i} data={sc} />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN APP
══════════════════════════════════════ */
export default function App() {
  const [inputApiUrl, setInputApiUrl] = useState(DEFAULT_URL);
  const [baseUrl, setBaseUrl]         = useState(DEFAULT_URL);
  const [apiStatus, setApiStatus]     = useState("unknown");

  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState(null);
  const [error, setError]       = useState(null);

  const testApi = async () => {
    const url = inputApiUrl.trim().replace(/\/$/,"");
    setBaseUrl(url); setApiStatus("checking");
    try {
      const res  = await fetch(`${url}/health`, { signal: AbortSignal.timeout(4000) });
      const data = await res.json();
      setApiStatus(data.status === "ok" ? "online" : "offline");
    } catch { setApiStatus("offline"); }
  };

  const scan = async () => {
    if (!urlInput.trim()) return;
    setLoading(true); setResult(null); setError(null);
    try {
      const res = await fetch(`${baseUrl}/scan/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(()=>({}));
        throw new Error(j.detail || `HTTP ${res.status}`);
      }
      setResult(await res.json());
    } catch(e) {
      setError(e.message || "Request failed. Is the API running?");
    } finally { setLoading(false); }
  };

  const MQ1 = [
    {t:"URL Safety Scanner"},{t:"·",g:true},
    {t:"Google Safe Browsing"},{t:"·",g:true},
    {t:"VirusTotal · 70+ Engines"},{t:"·",g:true},
    {t:"URLScan.io"},{t:"·",g:true},
    {t:"PhishTank"},{t:"·",g:true},
    {t:"Phishing Detection"},{t:"·",g:true},
    {t:"URL Safety Scanner"},{t:"·",g:true},
    {t:"Google Safe Browsing"},{t:"·",g:true},
    {t:"VirusTotal · 70+ Engines"},{t:"·",g:true},
    {t:"URLScan.io"},{t:"·",g:true},
    {t:"PhishTank"},{t:"·",g:true},
    {t:"Phishing Detection"},{t:"·",g:true},
  ];
  const MQ2 = [
    {t:"SAFE"},{t:"—",g:true},
    {t:"SUSPICIOUS"},{t:"—",g:true},
    {t:"DANGEROUS"},{t:"—",g:true},
    {t:"4 Engines · Real-Time · No Storage"},{t:"—",g:true},
    {t:"SAFE"},{t:"—",g:true},
    {t:"SUSPICIOUS"},{t:"—",g:true},
    {t:"DANGEROUS"},{t:"—",g:true},
    {t:"4 Engines · Real-Time · No Storage"},{t:"—",g:true},
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="logo"><div className="logo-dot"/>SENTINEL</a>
        <ul className="nav-links">
          <li><a href="#scan">Scan</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#engines">Engines</a></li>
        </ul>
        <div className="nav-pill">
          <div className={`pill-dot ${apiStatus==="online"?"on":apiStatus==="offline"?"off":""}`}/>
          {apiStatus==="online"?"API Online":apiStatus==="offline"?"API Offline":"API Status"}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-wm">URL</div>
        <div className="hero-tag">// Sentinel · 4-Engine URL Safety Scanner</div>
        <h1 className="hero-h1">
          SCAN<br/>
          <span className="out">THE</span>{" "}
          <span className="gld">LINK</span>
        </h1>
        <p className="hero-sub">
          Paste any URL. Four threat intelligence engines — Google Safe Browsing, VirusTotal,
          URLScan.io, and PhishTank — check it in real time for malware, phishing, and unsafe content.
        </p>
        <div className="hero-cta-row">
          <a href="#scan" className="btn-primary">Scan a URL</a>
          <a href="#how" className="btn-ghost">How It Works</a>
        </div>
        <div className="scroll-hint">
          <div className="scroll-line"/><span>Scroll</span>
        </div>
      </section>

      <Mq items={MQ1}/>

      {/* SCAN */}
      <section id="scan">
        <div className="sec-label">URL Scanner</div>
        <h2 className="sec-title">Paste &<br/>Scan.</h2>

        <div className="scan-box">
          <div className="scan-head">
            <div className="scan-head-title">URL Threat Analyzer</div>
            <div className="scan-head-sub">Google Safe Browsing · VirusTotal · URLScan.io · PhishTank</div>
          </div>
          <div className="scan-body">

            {/* API Config */}
            <div className="api-bar">
              <span className="api-lbl">API Server</span>
              <input className="api-in" value={inputApiUrl}
                placeholder="http://localhost:8000"
                onChange={e=>setInputApiUrl(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&testApi()}
              />
              <button className="btn-conn" onClick={testApi}>
                {apiStatus==="checking"?"Testing…":"Connect"}
              </button>
              {apiStatus==="online"  && <span className="api-ok">✓ Online</span>}
              {apiStatus==="offline" && <span className="api-err">✗ Offline — run: uvicorn url_detector:app --reload</span>}
            </div>

            {/* URL Input */}
            <div className="url-row">
              <input
                className="url-in"
                type="text"
                placeholder="https://suspicious-site.com/phishing-page"
                value={urlInput}
                onChange={e=>{setUrlInput(e.target.value);setResult(null);setError(null);}}
                onKeyDown={e=>e.key==="Enter"&&!loading&&scan()}
              />
              <button className="btn-scan" onClick={scan} disabled={loading||!urlInput.trim()}>
                {loading ? "Scanning…" : "Scan URL"}
              </button>
            </div>

            {loading && (
              <div className="loading">
                <div className="spin"/>
                Querying Google Safe Browsing · VirusTotal · URLScan.io · PhishTank…
              </div>
            )}
            {error  && <div className="err-box">⚠ {error}</div>}
            {result && <Result data={result}/>}
          </div>
        </div>

        {/* Stats */}
        <div className="stat-strip">
          <div className="stat-cell"><div className="stat-n">4</div><div className="stat-l">Threat Engines</div></div>
          <div className="stat-cell"><div className="stat-n">70+</div><div className="stat-l">AV Engines (VT)</div></div>
          <div className="stat-cell"><div className="stat-n">3</div><div className="stat-l">Verdict Labels</div></div>
          <div className="stat-cell"><div className="stat-n">0</div><div className="stat-l">Data Stored</div></div>
        </div>
      </section>

      <Mq items={MQ2}/>

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="sec-label">Pipeline</div>
        <h2 className="sec-title">How It<br/>Works.</h2>
        <div className="how-grid">
          {[
            {n:"01",t:"Paste URL",b:"Enter any URL — full links, shortened URLs, or suspicious domains. The scanner normalises it and extracts the domain automatically."},
            {n:"02",t:"4 Engines",b:"Google Safe Browsing, VirusTotal (70+ AV engines), URLScan.io (visual + behavioral), and PhishTank (phishing database) all run simultaneously."},
            {n:"03",t:"Aggregate",b:"Results are fused into a single verdict. 2+ engines flagging = DANGEROUS. 1 engine = SUSPICIOUS. All clear = SAFE."},
            {n:"04",t:"Verdict",b:"Get a full breakdown — per-engine results, threat types, VirusTotal engine counts, URLScan screenshot, and PhishTank confirmation status."},
          ].map(c=>(
            <div className="how-card" key={c.n}>
              <div className="how-n">{c.n}</div>
              <div className="how-t">{c.t}</div>
              <p className="how-b">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ENGINES */}
      <section id="engines">
        <div className="sec-label">Detection Engines</div>
        <h2 className="sec-title">4 Engines.<br/>One Verdict.</h2>
        <div className="how-grid" style={{marginTop:"2rem"}}>
          {[
            {n:"🔵",t:"Google Safe Browsing",b:"Google's real-time threat database. Detects malware, phishing, unwanted software, and harmful apps. 10,000 req/day free."},
            {n:"🔴",t:"VirusTotal",b:"Scans against 70+ antivirus and URL scanner engines. Most comprehensive threat coverage available. 500 req/day free."},
            {n:"🟡",t:"URLScan.io",b:"Submits and screenshots the URL in a sandbox, performs behavioral analysis, and checks against threat feeds. 1000 scans/day free."},
            {n:"🟠",t:"PhishTank",b:"Community-driven phishing URL database with verified reports. Specifically tuned for credential-harvesting and social engineering attacks."},
          ].map(c=>(
            <div className="how-card" key={c.t}>
              <div className="how-n" style={{fontSize:"3rem",opacity:1}}>{c.n}</div>
              <div className="how-t">{c.t}</div>
              <p className="how-b">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">SENTINEL</div>
        <div className="footer-note">© 2025 · No URLs stored · Real-time analysis only</div>
        <div className="footer-links">
          <a href="#scan">Scan</a>
          <a href="#how">Pipeline</a>
          <a href="#engines">Engines</a>
        </div>
      </footer>
    </>
  );
}