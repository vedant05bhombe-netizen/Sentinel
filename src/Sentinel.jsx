import { useState, useRef, useEffect } from "react";

/* ============================================================
   GLOBAL STYLES (injected as a <style> tag)
   ============================================================ */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --black:   #060606;
    --grey1:   #0f0f0f;
    --grey2:   #161616;
    --grey3:   #222;
    --border:  #2a2a2a;
    --white:   #f2ede7;
    --cream:   #c9c2b8;
    --accent:  #d4a853;
    --red:     #c0392b;
    --green:   #27ae60;
    --yellow:  #f39c12;
    --font-display: 'Bebas Neue', sans-serif;
    --font-mono:    'DM Mono', monospace;
    --font-body:    'Cormorant Garamond', serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    cursor: crosshair;
    overflow-x: hidden;
  }

  ::selection { background: var(--accent); color: var(--black); }

  /* ---------- NOISE OVERLAY ---------- */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.35;
  }

  /* ---------- MARQUEE ---------- */
  .marquee-track {
    overflow: hidden;
    white-space: nowrap;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 10px 0;
    background: var(--grey1);
  }
  .marquee-inner {
    display: inline-flex;
    gap: 0;
    animation: marquee 28s linear infinite;
  }
  .marquee-inner span {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    color: var(--cream);
    padding: 0 2.5rem;
    text-transform: uppercase;
  }
  .marquee-inner span.accent { color: var(--accent); }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ---------- NAV ---------- */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.4rem 3rem;
    background: rgba(6,6,6,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.6rem;
    letter-spacing: 0.12em;
    color: var(--accent);
    text-decoration: none;
  }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cream);
    text-decoration: none;
    transition: color 0.25s;
  }
  .nav-links a:hover { color: var(--accent); }
  .nav-cta {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.55rem 1.4rem;
    border: 1px solid var(--accent);
    color: var(--accent);
    background: transparent;
    cursor: crosshair;
    transition: all 0.25s;
    text-decoration: none;
  }
  .nav-cta:hover { background: var(--accent); color: var(--black); }

  /* ---------- HERO ---------- */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 3rem 5rem;
    position: relative;
    overflow: hidden;
  }
  .hero-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.2rem;
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(5rem, 14vw, 13rem);
    line-height: 0.88;
    letter-spacing: 0.02em;
    color: var(--white);
    text-transform: uppercase;
  }
  .hero-title .outline {
    -webkit-text-stroke: 1px var(--white);
    color: transparent;
  }
  .hero-title .gold { color: var(--accent); }
  .hero-sub {
    font-family: var(--font-body);
    font-style: italic;
    font-size: clamp(1rem, 1.6vw, 1.3rem);
    color: var(--cream);
    max-width: 500px;
    margin-top: 2rem;
    line-height: 1.7;
  }
  .hero-bg-text {
    position: absolute;
    top: 50%;
    right: -2rem;
    transform: translateY(-50%);
    font-family: var(--font-display);
    font-size: clamp(10rem, 28vw, 28rem);
    color: transparent;
    -webkit-text-stroke: 1px rgba(212,168,83,0.07);
    line-height: 1;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.02em;
  }
  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    right: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }
  .hero-scroll span {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--accent2);
    writing-mode: vertical-lr;
  }
  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: pulse-line 2s ease-in-out infinite;
  }
  @keyframes pulse-line { 0%,100%{opacity:1;} 50%{opacity:0.2;} }

  /* ---------- SECTION LAYOUT ---------- */
  section { padding: 7rem 3rem; }
  .section-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 30px;
    height: 1px;
    background: var(--accent);
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 6rem);
    line-height: 0.9;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 1.5rem;
  }

  /* ---------- TOOLS GRID ---------- */
  .tools-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2px;
    margin-top: 4rem;
    border: 1px solid var(--border);
  }

  /* ---------- TOOL CARD ---------- */
  .tool-card {
    background: var(--grey1);
    border-bottom: 1px solid var(--border);
    transition: background 0.3s;
  }
  .tool-card:last-child { border-bottom: none; }
  .tool-card:hover { background: var(--grey2); }

  .tool-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem 2.5rem;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s;
  }
  .tool-card.open .tool-header { border-bottom: 1px solid var(--border); }

  .tool-num {
    font-family: var(--font-display);
    font-size: 3rem;
    color: var(--accent);
    opacity: 0.4;
    min-width: 60px;
    line-height: 1;
  }
  .tool-meta { flex: 1; }
  .tool-name {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 3.5vw, 3rem);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--white);
    line-height: 1;
  }
  .tool-desc {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    color: var(--cream);
    margin-top: 0.4rem;
    opacity: 0.7;
  }
  .tool-toggle {
    font-family: var(--font-display);
    font-size: 2rem;
    color: var(--accent);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    line-height: 1;
  }
  .tool-card.open .tool-toggle { transform: rotate(45deg); }

  /* ---------- TOOL BODY ---------- */
  .tool-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1);
  }
  .tool-card.open .tool-body { max-height: 900px; }
  .tool-body-inner { padding: 2.5rem; }

  /* ---------- DROP ZONE ---------- */
  .drop-zone {
    border: 1px dashed var(--border);
    border-radius: 0;
    padding: 3.5rem 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    background: var(--black);
  }
  .drop-zone:hover, .drop-zone.drag-over {
    border-color: var(--accent);
    background: rgba(212,168,83,0.04);
  }
  .drop-zone input[type="file"] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
  }
  .drop-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }
  .drop-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cream);
    opacity: 0.7;
  }
  .drop-sub {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: var(--accent2);
    margin-top: 0.5rem;
  }

  /* ---------- URL INPUT ---------- */
  .url-row {
    display: flex;
    gap: 0;
    border: 1px solid var(--border);
  }
  .url-input {
    flex: 1;
    background: var(--black);
    border: none;
    outline: none;
    padding: 1rem 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.05em;
    color: var(--white);
    caret-color: var(--accent);
  }
  .url-input::placeholder { color: var(--accent2); opacity: 0.6; }
  .btn-analyze {
    font-family: var(--font-display);
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 1rem 2.5rem;
    background: var(--accent);
    color: var(--black);
    border: none;
    cursor: crosshair;
    transition: all 0.25s;
    white-space: nowrap;
  }
  .btn-analyze:hover { background: var(--white); }
  .btn-analyze:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ---------- PREVIEW ---------- */
  .preview-wrap {
    margin-top: 1.5rem;
    position: relative;
    max-width: 400px;
  }
  .preview-img {
    width: 100%;
    max-height: 250px;
    object-fit: cover;
    border: 1px solid var(--border);
    display: block;
    filter: brightness(0.9);
  }
  .preview-name {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    color: var(--cream);
    margin-top: 0.5rem;
    opacity: 0.7;
  }

  /* ---------- RESULT ---------- */
  .result-box {
    margin-top: 2rem;
    border: 1px solid var(--border);
    background: var(--black);
    padding: 2rem 2.5rem;
    animation: fadeUp 0.4s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .result-verdict {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 4rem);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .verdict-safe    { color: var(--green); }
  .verdict-danger  { color: var(--red); }
  .verdict-warning { color: var(--yellow); }
  .verdict-nsfw    { color: var(--red); }
  .verdict-clean   { color: var(--green); }
  .verdict-fake    { color: var(--red); }
  .verdict-real    { color: var(--green); }

  .result-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
  }
  .meta-item { display: flex; flex-direction: column; gap: 0.3rem; }
  .meta-key {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--accent2);
  }
  .meta-val {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    color: var(--white);
  }

  /* ---------- CONFIDENCE BAR ---------- */
  .conf-bar-wrap { margin-top: 1rem; }
  .conf-label {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--cream);
    margin-bottom: 0.4rem;
  }
  .conf-track {
    height: 3px;
    background: var(--grey3);
    position: relative;
    overflow: hidden;
  }
  .conf-fill {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    background: var(--accent);
    transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
  }
  .conf-fill.danger-fill { background: var(--red); }
  .conf-fill.safe-fill   { background: var(--green); }

  /* ---------- LOADING SPINNER ---------- */
  .analyzing {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .spin {
    width: 18px; height: 18px;
    border: 1px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ---------- TAGS ---------- */
  .tag-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
  .tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    border: 1px solid var(--border);
    color: var(--cream);
    background: var(--grey2);
  }
  .tag.tag-red   { border-color: var(--red);    color: var(--red); }
  .tag.tag-green { border-color: var(--green);  color: var(--green); }
  .tag.tag-gold  { border-color: var(--accent); color: var(--accent); }

  /* ---------- STATS STRIP ---------- */
  .stats-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: 1px solid var(--border);
    margin-top: 5rem;
  }
  .stat-cell {
    padding: 2.5rem 2rem;
    border-right: 1px solid var(--border);
    text-align: center;
  }
  .stat-cell:last-child { border-right: none; }
  .stat-num {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    color: var(--accent);
    line-height: 1;
  }
  .stat-lbl {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    opacity: 0.7;
    margin-top: 0.5rem;
  }

  /* ---------- HOW IT WORKS ---------- */
  .how-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2px;
    margin-top: 4rem;
  }
  .how-card {
    background: var(--grey1);
    padding: 2.5rem 2rem;
    border: 1px solid var(--border);
    transition: background 0.3s;
  }
  .how-card:hover { background: var(--grey2); }
  .how-num {
    font-family: var(--font-display);
    font-size: 4rem;
    color: var(--accent);
    opacity: 0.25;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .how-title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 0.6rem;
  }
  .how-body {
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--cream);
    opacity: 0.8;
    line-height: 1.7;
  }

  /* ---------- FOOTER ---------- */
  .footer {
    border-top: 1px solid var(--border);
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    letter-spacing: 0.12em;
    color: var(--accent);
  }
  .footer-note {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent2);
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    section { padding: 5rem 1.5rem; }
    .hero { padding: 0 1.5rem 4rem; }
    .stats-strip { grid-template-columns: repeat(2, 1fr); }
    .stat-cell:nth-child(2) { border-right: none; }
    .footer { flex-direction: column; text-align: center; }
    .tool-header { padding: 1.5rem; }
    .tool-body-inner { padding: 1.5rem; }
  }
`;

/* ============================================================
   MOCK ANALYZER — simulates AI responses
   ============================================================ */
function mockAnalyze(type, input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === "deepfake") {
        const isFake = Math.random() > 0.5;
        resolve({
          verdict: isFake ? "FAKE" : "AUTHENTIC",
          verdictClass: isFake ? "verdict-fake" : "verdict-real",
          confidence: Math.floor(Math.random() * 30 + 70),
          details: [
            { key: "Face Consistency", val: isFake ? "Irregular" : "Consistent" },
            { key: "Blink Pattern", val: isFake ? "Unnatural" : "Normal" },
            { key: "Texture Analysis", val: isFake ? "GAN artifacts" : "Clean" },
            { key: "Metadata", val: "EXIF present" },
          ],
          tags: isFake
            ? [["GAN Detected", "red"], ["Face Swap", "red"], ["AI Generated", "gold"]]
            : [["No Manipulation", "green"], ["Authentic", "green"]],
        });
      } else if (type === "url") {
        const risk = Math.random();
        let verdict, verdictClass, tags, details;
        if (risk < 0.33) {
          verdict = "SAFE"; verdictClass = "verdict-safe";
          tags = [["HTTPS Verified", "green"], ["No Malware", "green"], ["Trusted Domain", "green"]];
          details = [
            { key: "SSL Certificate", val: "Valid" },
            { key: "Domain Age", val: "8+ years" },
            { key: "Blacklist Check", val: "Clean" },
            { key: "Redirect Chain", val: "None" },
          ];
        } else if (risk < 0.66) {
          verdict = "SUSPICIOUS"; verdictClass = "verdict-warning";
          tags = [["Short URL", "gold"], ["New Domain", "gold"], ["Redirect", "gold"]];
          details = [
            { key: "SSL Certificate", val: "Self-signed" },
            { key: "Domain Age", val: "3 days" },
            { key: "Blacklist Check", val: "1 match" },
            { key: "Redirect Chain", val: "2 hops" },
          ];
        } else {
          verdict = "DANGEROUS"; verdictClass = "verdict-danger";
          tags = [["Phishing", "red"], ["Malware Host", "red"], ["Blacklisted", "red"]];
          details = [
            { key: "SSL Certificate", val: "None" },
            { key: "Domain Age", val: "1 day" },
            { key: "Blacklist Check", val: "6 matches" },
            { key: "Redirect Chain", val: "5+ hops" },
          ];
        }
        resolve({ verdict, verdictClass, confidence: Math.floor(Math.random() * 20 + 78), details, tags });
      } else if (type === "nsfw") {
        const isNsfw = Math.random() > 0.5;
        resolve({
          verdict: isNsfw ? "NSFW DETECTED" : "SAFE",
          verdictClass: isNsfw ? "verdict-nsfw" : "verdict-clean",
          confidence: Math.floor(Math.random() * 25 + 72),
          details: [
            { key: "Explicit Content", val: isNsfw ? "Detected" : "None" },
            { key: "Violence", val: isNsfw && Math.random()>0.5 ? "Moderate" : "None" },
            { key: "Safe For Work", val: isNsfw ? "No" : "Yes" },
            { key: "Content Category", val: isNsfw ? "Adult" : "General" },
          ],
          tags: isNsfw
            ? [["NSFW", "red"], ["Restricted", "red"], ["Adult Content", "red"]]
            : [["Safe", "green"], ["Family Friendly", "green"], ["No Flags", "green"]],
        });
      }
    }, 1600 + Math.random() * 800);
  });
}

/* ============================================================
   MARQUEE COMPONENT
   ============================================================ */
function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-track">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} className={item.accent ? "accent" : ""}>{item.text}</span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CONFIDENCE BAR
   ============================================================ */
function ConfBar({ value, danger }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { setTimeout(() => setWidth(value), 100); }, [value]);
  return (
    <div className="conf-bar-wrap">
      <div className="conf-label">
        <span>Confidence Score</span>
        <span>{value}%</span>
      </div>
      <div className="conf-track">
        <div
          className={`conf-fill ${danger ? "danger-fill" : "safe-fill"}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   RESULT BOX
   ============================================================ */
function ResultBox({ result }) {
  const isDanger = result.verdictClass.includes("fake") || result.verdictClass.includes("danger") || result.verdictClass.includes("nsfw");
  return (
    <div className="result-box">
      <div className={`result-verdict ${result.verdictClass}`}>{result.verdict}</div>
      <ConfBar value={result.confidence} danger={isDanger} />
      {result.tags && (
        <div className="tag-row">
          {result.tags.map(([label, color], i) => (
            <span key={i} className={`tag tag-${color}`}>{label}</span>
          ))}
        </div>
      )}
      {result.details && (
        <div className="result-meta">
          {result.details.map((d, i) => (
            <div key={i} className="meta-item">
              <span className="meta-key">{d.key}</span>
              <span className="meta-val">{d.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   DEEPFAKE DETECTOR
   ============================================================ */
function DeepfakeDetector() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [drag, setDrag] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const res = await mockAnalyze("deepfake", file);
    setResult(res);
    setLoading(false);
  };

  return (
    <div>
      <div
        className={`drop-zone ${drag ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
      >
        <input type="file" accept="image/*,video/*" onChange={(e) => handleFile(e.target.files[0])} />
        <span className="drop-icon">🎭</span>
        <div className="drop-label">Drop image or video here</div>
        <div className="drop-sub">Supported: JPG, PNG, MP4, WEBM · Max 50MB</div>
      </div>
      {preview && (
        <div className="preview-wrap">
          <img src={preview} alt="preview" className="preview-img" />
          <div className="preview-name">{file?.name}</div>
        </div>
      )}
      {file && !loading && (
        <button className="btn-analyze" style={{ marginTop: "1.5rem" }} onClick={analyze}>
          Analyze for Deepfake
        </button>
      )}
      {loading && (
        <div className="analyzing">
          <div className="spin" /> Scanning for manipulation artifacts...
        </div>
      )}
      {result && <ResultBox result={result} />}
    </div>
  );
}

/* ============================================================
   URL DETECTOR
   ============================================================ */
function UrlDetector() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await mockAnalyze("url", url);
    setResult(res);
    setLoading(false);
  };

  return (
    <div>
      <div className="url-row">
        <input
          className="url-input"
          type="text"
          placeholder="https://example.com/suspicious-link"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setResult(null); }}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
        />
        <button className="btn-analyze" onClick={analyze} disabled={loading || !url.trim()}>
          {loading ? "Scanning…" : "Scan URL"}
        </button>
      </div>
      {loading && (
        <div className="analyzing">
          <div className="spin" /> Cross-referencing threat databases...
        </div>
      )}
      {result && <ResultBox result={result} />}
    </div>
  );
}

/* ============================================================
   NSFW DETECTOR
   ============================================================ */
function NsfwDetector() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [drag, setDrag] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const res = await mockAnalyze("nsfw", file);
    setResult(res);
    setLoading(false);
  };

  return (
    <div>
      <div
        className={`drop-zone ${drag ? "drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
      >
        <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files[0])} />
        <span className="drop-icon">🔍</span>
        <div className="drop-label">Drop image to check content safety</div>
        <div className="drop-sub">Supported: JPG, PNG, WEBP · Max 20MB</div>
      </div>
      {preview && (
        <div className="preview-wrap">
          <img src={preview} alt="preview" className="preview-img" style={{ filter: result?.verdictClass?.includes("nsfw") ? "blur(16px) brightness(0.5)" : "brightness(0.9)" }} />
          <div className="preview-name">{file?.name}</div>
        </div>
      )}
      {file && !loading && (
        <button className="btn-analyze" style={{ marginTop: "1.5rem" }} onClick={analyze}>
          Check Content Safety
        </button>
      )}
      {loading && (
        <div className="analyzing">
          <div className="spin" /> Running content moderation model...
        </div>
      )}
      {result && <ResultBox result={result} />}
    </div>
  );
}

/* ============================================================
   TOOL ACCORDION CARD
   ============================================================ */
const TOOLS = [
  {
    id: "deepfake",
    num: "01",
    name: "Deepfake Detector",
    desc: "COMPUTER VISION · GAN DETECTION · FACE ANALYSIS",
    component: <DeepfakeDetector />,
  },
  {
    id: "url",
    num: "02",
    name: "Fake & Unsafe URL",
    desc: "THREAT INTELLIGENCE · PHISHING DETECTION · REAL-TIME SCAN",
    component: <UrlDetector />,
  },
  {
    id: "nsfw",
    num: "03",
    name: "NSFW Image Detector",
    desc: "CONTENT MODERATION · SAFE-FOR-WORK ANALYSIS · AI CLASSIFIER",
    component: <NsfwDetector />,
  },
];

function ToolCard({ tool, isOpen, onToggle }) {
  return (
    <div className={`tool-card ${isOpen ? "open" : ""}`}>
      <div className="tool-header" onClick={onToggle}>
        <div className="tool-num">{tool.num}</div>
        <div className="tool-meta">
          <div className="tool-name">{tool.name}</div>
          <div className="tool-desc">{tool.desc}</div>
        </div>
        <div className="tool-toggle">+</div>
      </div>
      <div className="tool-body">
        <div className="tool-body-inner">{tool.component}</div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [openTool, setOpenTool] = useState(null);

  const marqueeItems = [
    { text: "Deepfake Detection" }, { text: "—", accent: true },
    { text: "URL Safety Scanner" }, { text: "—", accent: true },
    { text: "NSFW Classifier" }, { text: "—", accent: true },
    { text: "Real-Time Analysis" }, { text: "—", accent: true },
    { text: "AI-Powered Security" }, { text: "—", accent: true },
    { text: "Deepfake Detection" }, { text: "—", accent: true },
    { text: "URL Safety Scanner" }, { text: "—", accent: true },
    { text: "NSFW Classifier" }, { text: "—", accent: true },
    { text: "Real-Time Analysis" }, { text: "—", accent: true },
    { text: "AI-Powered Security" }, { text: "—", accent: true },
  ];

  const marqueeItems2 = [
    { text: "Available for Integration" }, { text: "·", accent: true },
    { text: "REST API Ready" }, { text: "·", accent: true },
    { text: "Enterprise Grade" }, { text: "·", accent: true },
    { text: "99.2% Accuracy" }, { text: "·", accent: true },
    { text: "Available for Integration" }, { text: "·", accent: true },
    { text: "REST API Ready" }, { text: "·", accent: true },
    { text: "Enterprise Grade" }, { text: "·", accent: true },
    { text: "99.2% Accuracy" }, { text: "·", accent: true },
  ];

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">SENTINEL</a>
        <ul className="nav-links">
          <li><a href="#tools">Tools</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#stats">Stats</a></li>
        </ul>
        <a href="#tools" className="nav-cta">Try Now</a>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg-text">AI</div>
        <div className="hero-eyebrow">// AI-Powered Security Suite — v2.4.1</div>
        <h1 className="hero-title">
          DETECT<br />
          <span className="outline">THE</span>{" "}
          <span className="gold">TRUTH</span>
        </h1>
        <p className="hero-sub">
          Three powerful AI models. One unified platform. Deepfakes, malicious URLs, and NSFW content — exposed instantly.
        </p>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <Marquee items={marqueeItems} />

      {/* TOOLS SECTION */}
      <section id="tools">
        <div className="section-label">Detection Suite</div>
        <h2 className="section-title">Three<br />Tools.</h2>
        <div className="tools-grid">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isOpen={openTool === tool.id}
              onToggle={() => setOpenTool(openTool === tool.id ? null : tool.id)}
            />
          ))}
        </div>

        {/* STATS */}
        <div className="stats-strip" id="stats">
          <div className="stat-cell">
            <div className="stat-num">99.2%</div>
            <div className="stat-lbl">Detection Accuracy</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">1.4s</div>
            <div className="stat-lbl">Avg Response Time</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">12M+</div>
            <div className="stat-lbl">Files Analyzed</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">0</div>
            <div className="stat-lbl">Data Stored</div>
          </div>
        </div>
      </section>

      {/* MARQUEE 2 */}
      <Marquee items={marqueeItems2} />

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="section-label">Process</div>
        <h2 className="section-title">How It<br />Works.</h2>
        <div className="how-grid">
          {[
            { n: "01", t: "Upload", b: "Drop your file or paste a URL into the detector. All inputs are processed in-memory and never stored on our servers." },
            { n: "02", t: "Analyze", b: "Our multi-layer AI pipeline runs GAN detection, threat intelligence lookups, and content classification simultaneously." },
            { n: "03", t: "Verdict", b: "Receive a confidence-scored verdict with detailed breakdown — manipulations, threat vectors, or content flags clearly labeled." },
            { n: "04", t: "Act", b: "Use the result to make an informed decision. Export the report, integrate via API, or escalate to your security team." },
          ].map((c) => (
            <div className="how-card" key={c.n}>
              <div className="how-num">{c.n}</div>
              <div className="how-title">{c.t}</div>
              <p className="how-body">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">SENTINEL</div>
        <div className="footer-note">© 2025 Sentinel AI · All data processed locally · No storage</div>
        <div className="footer-note">Built with React + Vanilla CSS</div>
      </footer>
    </>
  );
}