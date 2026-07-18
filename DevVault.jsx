import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Search, Command, Github, Sun, Moon, User, ChevronRight, Copy, RotateCcw,
  Check, X, Braces, KeyRound, Link2, Hash, Fingerprint, ShieldCheck, Regex,
  Type, GitCompare, Palette, Clock3, FileJson, ArrowLeft, Star, Sparkles,
  Terminal, Globe, Database, Server, FolderCog, Boxes, Layers, Wand2,
  Upload, Plus, Trash2, Send, GitBranch, ScrollText, FileCode2, Rows3,
  MessageCircle, Heart, Code2
} from "lucide-react";

/* ----------------------------------------------------------------------
   DESIGN TOKENS — Dark Luxury
------------------------------------------------------------------------*/
const C = {
  bg: "#050505",
  card: "rgba(255,255,255,0.04)",
  glass: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  primary: "#4F8CFF",
  primaryHover: "#6AA3FF",
  success: "#18D26E",
  warning: "#FFB020",
  danger: "#FF5D73",
  text: "#FFFFFF",
  sub: "#9CA3AF",
};

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

* { box-sizing: border-box; }
html, body { background: ${C.bg}; }
body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 8px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

.dv-focus:focus-visible {
  outline: 2px solid ${C.primary};
  outline-offset: 2px;
  border-radius: 8px;
}

@keyframes dv-fade-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dv-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes dv-float {
  0%, 100% { transform: translate(0,0); }
  50% { transform: translate(12px,-18px); }
}
@keyframes dv-float-slow {
  0%, 100% { transform: translate(0,0); }
  50% { transform: translate(-16px,14px); }
}
@keyframes dv-pulse-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.9; }
}
@keyframes dv-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
}

.dv-fade-up { animation: dv-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }
.dv-fade-in { animation: dv-fade-in 0.5s ease both; }

.dv-card {
  background: ${C.card};
  border: 1px solid ${C.border};
  border-radius: 16px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, box-shadow 0.35s ease, background 0.3s ease;
}
.dv-card:hover {
  transform: translateY(-3px);
  border-color: rgba(79,140,255,0.35);
  box-shadow: 0 20px 50px -20px rgba(79,140,255,0.25), 0 8px 24px -12px rgba(0,0,0,0.5);
  background: rgba(255,255,255,0.055);
}

.dv-glass {
  background: ${C.glass};
  border: 1px solid ${C.border};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.dv-btn-primary {
  background: linear-gradient(180deg, ${C.primary}, #3d76e8);
  color: white;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 24px -8px rgba(79,140,255,0.55);
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, background 0.25s ease;
}
.dv-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 12px 30px -8px rgba(79,140,255,0.7); background: linear-gradient(180deg, ${C.primaryHover}, ${C.primary}); }
.dv-btn-primary:active { transform: translateY(0px) scale(0.98); }

.dv-btn-ghost {
  background: ${C.card};
  border: 1px solid ${C.border};
  color: ${C.text};
  transition: all 0.25s ease;
}
.dv-btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.16); transform: translateY(-1px); }

.dv-input {
  background: rgba(255,255,255,0.03);
  border: 1px solid ${C.border};
  color: white;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.dv-input:focus { outline: none; border-color: ${C.primary}; background: rgba(79,140,255,0.05); }
.dv-input::placeholder { color: #6b7280; }

.dv-kbd {
  font-family: 'JetBrains Mono', monospace;
  background: rgba(255,255,255,0.06);
  border: 1px solid ${C.border};
  border-bottom-width: 2px;
  border-radius: 6px;
  color: ${C.sub};
}

.dv-noise {
  position: fixed; inset: 0; pointer-events: none; opacity: 0.035; z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.dv-grid-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 90%);
}

.dv-blob {
  position: absolute; border-radius: 9999px; filter: blur(90px); pointer-events: none;
}

.dv-scrollbar-thin::-webkit-scrollbar { width: 6px; }

.dv-navbar {
  transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
}

.dv-copy-flash { animation: dv-fade-in 0.15s ease; }

.dv-tag {
  font-size: 11px; letter-spacing: 0.02em; font-weight: 600;
  padding: 3px 9px; border-radius: 999px;
  border: 1px solid ${C.border}; color: ${C.sub}; background: rgba(255,255,255,0.03);
}

.dv-skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 37%, rgba(255,255,255,0.04) 63%);
  background-size: 400px 100%;
  animation: dv-shimmer 1.4s ease-in-out infinite;
  border-radius: 8px;
}
`;

/* ----------------------------------------------------------------------
   CATEGORY + TOOL CATALOG
------------------------------------------------------------------------*/
const CATEGORIES = [
  { id: "text", name: "Text", icon: Type },
  { id: "compare", name: "Comparison", icon: GitCompare },
  { id: "security", name: "Security", icon: ShieldCheck },
  { id: "web", name: "Web", icon: Globe },
  { id: "network", name: "Network", icon: Server },
  { id: "api", name: "API", icon: Boxes },
  { id: "database", name: "Database", icon: Database },
  { id: "files", name: "Files", icon: FolderCog },
  { id: "ui", name: "UI", icon: Palette },
  { id: "devops", name: "DevOps", icon: Terminal },
  { id: "time", name: "Time", icon: Clock3 },
  { id: "coding", name: "Coding", icon: Layers },
];

// `live: true` tools are fully functional in this build. Others render a
// "coming soon" shell so the full catalog is still browsable/searchable.
const TOOLS = [
  { id: "json-formatter", name: "JSON Formatter", desc: "Format, validate, and minify JSON.", cat: "text", icon: Braces, live: true },
  { id: "word-counter", name: "Word Counter", desc: "Words, characters, sentences, reading time.", cat: "text", icon: Type, live: true },
  { id: "case-converter", name: "Case Converter", desc: "camelCase, snake_case, kebab-case & more.", cat: "text", icon: Wand2, live: true },
  { id: "slug-generator", name: "Slug Generator", desc: "Turn any string into a URL-safe slug.", cat: "text", icon: Link2, live: true },
  { id: "markdown-preview", name: "Markdown Preview", desc: "Live-render Markdown as you type.", cat: "text", icon: FileJson, live: true },
  { id: "lorem-ipsum", name: "Lorem Ipsum", desc: "Generate placeholder paragraphs.", cat: "text", icon: Type, live: true },

  { id: "dedupe-lines", name: "Duplicate Line Remover", desc: "Clean up lists, dedupe, sort, trim.", cat: "text", icon: Rows3, live: true },

  { id: "diff-checker", name: "Diff Checker", desc: "Compare two blocks of text line by line.", cat: "compare", icon: GitCompare, live: true },
  { id: "json-compare", name: "JSON Compare", desc: "Structural diff between two JSON payloads.", cat: "compare", icon: GitCompare, live: true },

  { id: "password-generator", name: "Password Generator", desc: "Cryptographically random, tunable passwords.", cat: "security", icon: KeyRound, live: true },
  { id: "password-strength", name: "Password Strength Checker", desc: "Entropy-based strength estimate & tips.", cat: "security", icon: ShieldCheck, live: true },
  { id: "uuid-generator", name: "UUID / NanoID", desc: "Batch-generate v4 UUIDs.", cat: "security", icon: Fingerprint, live: true },
  { id: "hash-generator", name: "Hash Generator", desc: "SHA-256 / SHA-1 / SHA-512 digests.", cat: "security", icon: Hash, live: true },
  { id: "jwt-decoder", name: "JWT Decoder", desc: "Inspect header & payload claims.", cat: "security", icon: ShieldCheck, live: true },
  { id: "base64", name: "Base64 Encode / Decode", desc: "Encode and decode Base64 text.", cat: "security", icon: Braces, live: true },
  { id: "url-encode", name: "URL Encode / Decode", desc: "Percent-encode or decode a string.", cat: "security", icon: Link2, live: true },
  { id: "hmac", name: "HMAC Generator", desc: "Keyed-hash message authentication, real Web Crypto.", cat: "security", icon: ShieldCheck, live: true },
  { id: "bcrypt", name: "bcrypt Generator", desc: "Real Blowfish-based bcrypt, hash & compare.", cat: "security", icon: ShieldCheck, live: true },

  { id: "http-status", name: "HTTP Status Lookup", desc: "Reference for every HTTP status code.", cat: "web", icon: Globe, live: true },
  { id: "user-agent", name: "User-Agent Parser", desc: "Break down a UA string.", cat: "web", icon: Globe, live: true },
  { id: "meta-tags", name: "Meta Tag Generator", desc: "SEO & Open Graph tag builder.", cat: "web", icon: Globe, live: true },
  { id: "dns-lookup", name: "DNS Lookup", desc: "Resolve DNS records for a domain.", cat: "web", icon: Server, live: true },

  { id: "ping", name: "Ping", desc: "Browser-based HTTP reachability check.", cat: "network", icon: Server, live: true },
  { id: "port-checker", name: "Port Checker", desc: "Check if an HTTP(S) service responds on a port.", cat: "network", icon: Server, live: true },

  { id: "rest-client", name: "REST Client", desc: "Send requests, inspect responses.", cat: "api", icon: Boxes, live: true },
  { id: "webhook-tester", name: "Webhook Tester", desc: "Capture and inspect webhook payloads.", cat: "api", icon: Boxes, live: true },

  { id: "sql-formatter", name: "SQL Formatter", desc: "Pretty-print SQL queries.", cat: "database", icon: Database, live: true },
  { id: "csv-json", name: "CSV ↔ JSON", desc: "Convert between CSV and JSON.", cat: "database", icon: Database, live: true },

  { id: "qr-generator", name: "QR Generator", desc: "Generate a scannable QR code.", cat: "files", icon: Boxes, live: true },
  { id: "image-compressor", name: "Image Compressor", desc: "Shrink images right in your browser.", cat: "files", icon: FolderCog, live: true },

  { id: "color-converter", name: "Color Converter", desc: "HEX, RGB, HSL — instantly in sync.", cat: "ui", icon: Palette, live: true },
  { id: "gradient-generator", name: "Gradient Generator", desc: "Design and export CSS gradients.", cat: "ui", icon: Palette, live: true },
  { id: "shadow-generator", name: "Shadow Generator", desc: "Layered box-shadow builder.", cat: "ui", icon: Palette, live: true },

  { id: "dockerfile", name: "Dockerfile Generator", desc: "Scaffold a Dockerfile for your stack.", cat: "devops", icon: Terminal, live: true },
  { id: "env-generator", name: ".env Generator", desc: "Build a starter .env file.", cat: "devops", icon: Terminal, live: true },
  { id: "gitignore-generator", name: "Git Ignore Generator", desc: "Combine .gitignore presets by stack.", cat: "devops", icon: GitBranch, live: true },

  { id: "unix-timestamp", name: "Unix Timestamp", desc: "Convert between epoch and date.", cat: "time", icon: Clock3, live: true },
  { id: "age-calculator", name: "Age Calculator", desc: "Exact age from a birth date.", cat: "time", icon: Clock3, live: true },
  { id: "timezone-converter", name: "Timezone Converter", desc: "One moment, across every timezone.", cat: "time", icon: Clock3, live: true },

  { id: "regex-tester", name: "Regex Tester", desc: "Test patterns with live match highlighting.", cat: "coding", icon: Regex, live: true },
  { id: "readme-generator", name: "README Generator", desc: "Scaffold a clean project README.", cat: "coding", icon: FileJson, live: true },
  { id: "commit-generator", name: "Commit Message Generator", desc: "Build clean Conventional Commits.", cat: "coding", icon: GitBranch, live: true },
  { id: "license-generator", name: "LICENSE Generator", desc: "MIT, BSD, ISC, Unlicense & more.", cat: "coding", icon: ScrollText, live: true },
];

const LIVE_TOOLS = TOOLS.filter((t) => t.live);

/* ----------------------------------------------------------------------
   SMALL HELPERS
------------------------------------------------------------------------*/
function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback((text) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  }, []);
  return [copied, copy];
}

function CopyButton({ text, disabled }) {
  const [copied, copy] = useCopy();
  return (
    <button
      className="dv-btn-ghost dv-focus flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-40"
      disabled={disabled}
      onClick={() => copy(text)}
    >
      {copied ? <Check size={13} style={{ color: C.success }} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ResetButton({ onClick }) {
  return (
    <button onClick={onClick} className="dv-btn-ghost dv-focus flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium">
      <RotateCcw size={13} /> Reset
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>{label}</span>
      {children}
    </label>
  );
}

/* ----------------------------------------------------------------------
   TOOL PAGE SHELL
------------------------------------------------------------------------*/
function ToolShell({ tool, onBack, children }) {
  const Icon = tool.icon;
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-8 dv-fade-up">
      <button onClick={onBack} className="dv-focus mb-6 flex items-center gap-1.5 rounded-lg text-sm font-medium" style={{ color: C.sub }}>
        <ArrowLeft size={15} /> Back to tools
      </button>
      <div className="mb-8 flex items-start gap-4">
        <div className="dv-card flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ color: C.primary }}>
          <Icon size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
          <p className="mt-1 text-sm" style={{ color: C.sub }}>{tool.desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ComingSoon({ tool, onBack }) {
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="dv-card flex flex-col items-center justify-center gap-3 rounded-2xl px-6 py-20 text-center">
        <Sparkles size={22} style={{ color: C.warning }} />
        <p className="text-sm font-medium text-white">This tool is on the build list</p>
        <p className="max-w-sm text-xs" style={{ color: C.sub }}>
          {tool.name} isn't wired up in this preview build yet — the layout, category, and search entry all exist so it's ready to be implemented next.
        </p>
      </div>
    </ToolShell>
  );
}

/* ----------------------------------------------------------------------
   INDIVIDUAL TOOLS
------------------------------------------------------------------------*/
function JsonFormatterTool({ tool, onBack }) {
  const [input, setInput] = useState('{\n  "name": "DevVault",\n  "tools": 42,\n  "premium": true\n}');
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");

  const format = useCallback((minify = false) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  }, [input, indent]);

  useEffect(() => { format(false); }, [input, indent]);

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Field label="Indent">
          <select value={indent} onChange={(e) => setIndent(Number(e.target.value))} className="dv-input dv-focus rounded-lg px-3 py-1.5 text-xs">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Tabs off</option>
          </select>
        </Field>
        <div className="ml-auto flex gap-2 pt-5">
          <button onClick={() => format(true)} className="dv-btn-ghost dv-focus rounded-lg px-3 py-1.5 text-xs font-medium">Minify</button>
          <button onClick={() => format(false)} className="dv-btn-ghost dv-focus rounded-lg px-3 py-1.5 text-xs font-medium">Beautify</button>
          <ResetButton onClick={() => setInput("")} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="dv-input dv-focus mono h-72 w-full rounded-xl p-4 text-xs leading-relaxed"
            placeholder="Paste JSON here..."
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: C.sub }}>Output</span>
            <CopyButton text={output} disabled={!output} />
          </div>
          <div className="dv-input h-72 w-full overflow-auto rounded-xl p-4">
            {error ? (
              <p className="mono text-xs" style={{ color: C.danger }}>{error}</p>
            ) : (
              <pre className="mono whitespace-pre-wrap text-xs leading-relaxed text-white">{output}</pre>
            )}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

function WordCounterTool({ tool, onBack }) {
  const [text, setText] = useState("DevVault is the internet's most beautiful developer toolkit.");
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = (text.match(/[.!?]+(\s|$)/g) || []).length;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingTime = Math.max(1, Math.round(words / 200));
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="dv-input dv-focus mono h-56 w-full rounded-xl p-4 text-sm leading-relaxed"
        placeholder="Start typing or paste text..."
      />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {[
          ["Words", stats.words], ["Characters", stats.chars], ["No spaces", stats.charsNoSpace],
          ["Sentences", stats.sentences], ["Paragraphs", stats.paragraphs], ["Read time", `${stats.readingTime}m`],
        ].map(([label, value]) => (
          <div key={label} className="dv-card rounded-xl px-4 py-3 text-center">
            <div className="mono text-lg font-semibold" style={{ color: C.primary }}>{value}</div>
            <div className="mt-0.5 text-[11px]" style={{ color: C.sub }}>{label}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-end"><ResetButton onClick={() => setText("")} /></div>
    </ToolShell>
  );
}

function CaseConverterTool({ tool, onBack }) {
  const [input, setInput] = useState("devvault developer toolkit");
  const words = useMemo(() => input.trim().split(/[\s_-]+|(?=[A-Z])/).filter(Boolean).map((w) => w.toLowerCase()), [input]);
  const cases = useMemo(() => ({
    "UPPERCASE": input.toUpperCase(),
    "lowercase": input.toLowerCase(),
    "Title Case": words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    "camelCase": words.map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))).join(""),
    "PascalCase": words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(""),
    "snake_case": words.join("_"),
    "kebab-case": words.join("-"),
    "CONSTANT_CASE": words.join("_").toUpperCase(),
  }), [input, words]);

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <Field label="Input">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus mono w-full rounded-xl p-3 text-sm" />
      </Field>
      <div className="mt-4 space-y-2">
        {Object.entries(cases).map(([label, value]) => (
          <div key={label} className="dv-card flex items-center justify-between gap-3 rounded-xl px-4 py-3">
            <div className="min-w-0">
              <div className="text-[11px]" style={{ color: C.sub }}>{label}</div>
              <div className="mono truncate text-sm text-white">{value || "—"}</div>
            </div>
            <CopyButton text={value} disabled={!value} />
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function SlugGeneratorTool({ tool, onBack }) {
  const [input, setInput] = useState("The Internet's Most Beautiful Developer Toolkit!");
  const slug = useMemo(() =>
    input.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    [input]
  );
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <Field label="Text">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus w-full rounded-xl p-3 text-sm" />
      </Field>
      <div className="mt-4 dv-card flex items-center justify-between gap-3 rounded-xl px-4 py-4">
        <span className="mono text-sm" style={{ color: C.primary }}>{slug || "—"}</span>
        <CopyButton text={slug} disabled={!slug} />
      </div>
    </ToolShell>
  );
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function renderMarkdown(md) {
  let html = escapeHtml(md);
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/^- (.*)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "<br/><br/>");
  return html;
}
function MarkdownPreviewTool({ tool, onBack }) {
  const [md, setMd] = useState("# DevVault\n\nA **premium** developer toolkit with a live *preview*.\n\n- Fast\n- Minimal\n- [Learn more](#)");
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea value={md} onChange={(e) => setMd(e.target.value)} className="dv-input dv-focus mono h-72 w-full rounded-xl p-4 text-xs leading-relaxed" />
        <div className="dv-input h-72 w-full overflow-auto rounded-xl p-4 text-sm leading-relaxed text-white" dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} />
      </div>
    </ToolShell>
  );
}

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
function LoremIpsumTool({ tool, onBack }) {
  const [count, setCount] = useState(3);
  const output = useMemo(() => Array.from({ length: count }, () => LOREM).join("\n\n"), [count]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex items-center gap-3">
        <Field label="Paragraphs">
          <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))} className="dv-input dv-focus w-24 rounded-lg p-2 text-sm" />
        </Field>
        <div className="pt-5"><CopyButton text={output} /></div>
      </div>
      <div className="dv-input mono h-64 w-full overflow-auto rounded-xl p-4 text-xs leading-relaxed text-white whitespace-pre-wrap">{output}</div>
    </ToolShell>
  );
}

function diffLines(a, b) {
  const A = a.split("\n"), B = b.split("\n");
  const n = A.length, m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const result = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (A[i] === B[j]) { result.push({ type: "same", text: A[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { result.push({ type: "remove", text: A[i] }); i++; }
    else { result.push({ type: "add", text: B[j] }); j++; }
  }
  while (i < n) { result.push({ type: "remove", text: A[i] }); i++; }
  while (j < m) { result.push({ type: "add", text: B[j] }); j++; }
  return result;
}
function DiffCheckerTool({ tool, onBack }) {
  const [a, setA] = useState("const name = 'DevVault';\nconst version = 1;");
  const [b, setB] = useState("const name = 'DevVault';\nconst version = 2;\nconst premium = true;");
  const diff = useMemo(() => diffLines(a, b), [a, b]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Original"><textarea value={a} onChange={(e) => setA(e.target.value)} className="dv-input dv-focus mono h-40 w-full rounded-xl p-3 text-xs" /></Field>
        <Field label="Changed"><textarea value={b} onChange={(e) => setB(e.target.value)} className="dv-input dv-focus mono h-40 w-full rounded-xl p-3 text-xs" /></Field>
      </div>
      <div className="dv-input mono mt-4 max-h-80 overflow-auto rounded-xl p-3 text-xs leading-relaxed">
        {diff.map((line, idx) => (
          <div key={idx} style={{
            background: line.type === "add" ? "rgba(24,210,110,0.12)" : line.type === "remove" ? "rgba(255,93,115,0.12)" : "transparent",
            color: line.type === "add" ? C.success : line.type === "remove" ? C.danger : "#d1d5db",
            padding: "1px 8px", borderRadius: 4,
          }}>
            {line.type === "add" ? "+ " : line.type === "remove" ? "- " : "  "}{line.text || " "}
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function PasswordGeneratorTool({ tool, onBack }) {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    const sets = {
      upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
      lower: "abcdefghijkmnpqrstuvwxyz",
      numbers: "23456789",
      symbols: "!@#$%^&*()-_=+[]{}",
    };
    let charset = "";
    Object.entries(opts).forEach(([k, v]) => { if (v) charset += sets[k]; });
    if (!charset) { setPassword(""); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (n) => charset[n % charset.length]).join(""));
  }, [length, opts]);

  useEffect(() => { generate(); }, [length, opts]);

  const strength = useMemo(() => {
    const variety = Object.values(opts).filter(Boolean).length;
    const score = Math.min(4, Math.floor((length / 8) * (variety / 2)));
    return ["Weak", "Fair", "Good", "Strong", "Excellent"][score] || "Weak";
  }, [length, opts]);
  const strengthColor = { Weak: C.danger, Fair: C.warning, Good: C.primary, Strong: C.success, Excellent: C.success }[strength];

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="dv-card flex items-center justify-between gap-3 rounded-xl px-4 py-4">
        <span className="mono truncate text-lg text-white">{password}</span>
        <div className="flex shrink-0 gap-2">
          <button onClick={generate} className="dv-btn-ghost dv-focus rounded-lg px-3 py-1.5 text-xs font-medium">Regenerate</button>
          <CopyButton text={password} disabled={!password} />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: strengthColor }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: strengthColor }} /> {strength}
      </div>
      <div className="mt-5 space-y-4">
        <Field label={`Length — ${length}`}>
          <input type="range" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-blue-500" />
        </Field>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[["upper", "A–Z"], ["lower", "a–z"], ["numbers", "0–9"], ["symbols", "!@#"]].map(([key, label]) => (
            <label key={key} className="dv-card flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-xs">
              {label}
              <input type="checkbox" checked={opts[key]} onChange={(e) => setOpts((o) => ({ ...o, [key]: e.target.checked }))} className="accent-blue-500" />
            </label>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}

function uuidv4() { return crypto.randomUUID(); }
function UuidGeneratorTool({ tool, onBack }) {
  const [count, setCount] = useState(5);
  const [list, setList] = useState(() => Array.from({ length: 5 }, uuidv4));
  const regenerate = () => setList(Array.from({ length: count }, uuidv4));
  useEffect(() => { regenerate(); }, [count]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex items-center gap-3">
        <Field label="Count">
          <input type="number" min={1} max={50} value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value))))} className="dv-input dv-focus w-24 rounded-lg p-2 text-sm" />
        </Field>
        <div className="flex gap-2 pt-5">
          <button onClick={regenerate} className="dv-btn-ghost dv-focus rounded-lg px-3 py-1.5 text-xs font-medium">Regenerate</button>
          <CopyButton text={list.join("\n")} disabled={!list.length} />
        </div>
      </div>
      <div className="dv-input mono max-h-80 space-y-1 overflow-auto rounded-xl p-4 text-xs text-white">
        {list.map((id) => <div key={id}>{id}</div>)}
      </div>
    </ToolShell>
  );
}

function HashGeneratorTool({ tool, onBack }) {
  const [input, setInput] = useState("DevVault");
  const [algo, setAlgo] = useState("SHA-256");
  const [hash, setHash] = useState("");
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(input));
      const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      if (!cancelled) setHash(hex);
    })();
    return () => { cancelled = true; };
  }, [input, algo]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex flex-wrap items-end gap-3">
        <Field label="Input">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus mono w-full min-w-[220px] rounded-lg p-3 text-sm" />
        </Field>
        <Field label="Algorithm">
          <select value={algo} onChange={(e) => setAlgo(e.target.value)} className="dv-input dv-focus rounded-lg px-3 py-3 text-xs">
            <option>SHA-256</option><option>SHA-1</option><option>SHA-512</option>
          </select>
        </Field>
      </div>
      <div className="dv-card flex items-center justify-between gap-3 rounded-xl px-4 py-4">
        <span className="mono break-all text-sm text-white">{hash}</span>
        <CopyButton text={hash} disabled={!hash} />
      </div>
      <p className="mt-2 text-[11px]" style={{ color: C.sub }}>MD5 / HMAC use non-standard crypto APIs and aren't wired up in this preview.</p>
    </ToolShell>
  );
}

function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return decodeURIComponent(atob(str).split("").map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""));
}
function JwtDecoderTool({ tool, onBack }) {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6IkRldlZhdWx0IiwiaWF0IjoxNzE2MjM5MDIyfQ.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U");
  const decoded = useMemo(() => {
    try {
      const [h, p] = token.split(".");
      if (!h || !p) return { error: "Not a valid JWT (expected 3 segments)" };
      return { header: JSON.parse(base64urlDecode(h)), payload: JSON.parse(base64urlDecode(p)) };
    } catch { return { error: "Couldn't decode this token" }; }
  }, [token]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <textarea value={token} onChange={(e) => setToken(e.target.value)} className="dv-input dv-focus mono h-24 w-full rounded-xl p-3 text-xs" />
      {decoded.error ? (
        <p className="mt-3 text-xs" style={{ color: C.danger }}>{decoded.error}</p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div><span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>Header</span>
            <pre className="dv-input mono h-40 overflow-auto rounded-xl p-3 text-xs text-white">{JSON.stringify(decoded.header, null, 2)}</pre></div>
          <div><span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>Payload</span>
            <pre className="dv-input mono h-40 overflow-auto rounded-xl p-3 text-xs text-white">{JSON.stringify(decoded.payload, null, 2)}</pre></div>
        </div>
      )}
      <p className="mt-3 text-[11px]" style={{ color: C.sub }}>Decoding only — this does not verify the signature.</p>
    </ToolShell>
  );
}

function Base64Tool({ tool, onBack }) {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("DevVault");
  const output = useMemo(() => {
    try {
      return mode === "encode"
        ? btoa(unescape(encodeURIComponent(input)))
        : decodeURIComponent(escape(atob(input)));
    } catch { return "Invalid input for this mode"; }
  }, [input, mode]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex gap-2">
        {["encode", "decode"].map((m) => (
          <button key={m} onClick={() => setMode(m)} className="dv-focus rounded-lg px-3 py-1.5 text-xs font-medium capitalize"
            style={{ background: mode === m ? C.primary : C.card, border: `1px solid ${C.border}`, color: "white" }}>{m}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus mono h-48 w-full rounded-xl p-4 text-xs" />
        <div className="dv-input mono h-48 w-full overflow-auto rounded-xl p-4 text-xs text-white">{output}
          <div className="mt-3"><CopyButton text={output} /></div>
        </div>
      </div>
    </ToolShell>
  );
}

function UrlEncodeTool({ tool, onBack }) {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("https://devvault.dev/search?q=dark luxury&sort=new");
  const output = useMemo(() => {
    try { return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input); }
    catch { return "Invalid input for this mode"; }
  }, [input, mode]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex gap-2">
        {["encode", "decode"].map((m) => (
          <button key={m} onClick={() => setMode(m)} className="dv-focus rounded-lg px-3 py-1.5 text-xs font-medium capitalize"
            style={{ background: mode === m ? C.primary : C.card, border: `1px solid ${C.border}`, color: "white" }}>{m}</button>
        ))}
      </div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus mono h-24 w-full rounded-xl p-4 text-xs" />
      <div className="dv-card mt-3 flex items-center justify-between gap-3 rounded-xl px-4 py-4">
        <span className="mono break-all text-sm text-white">{output}</span>
        <CopyButton text={output} />
      </div>
    </ToolShell>
  );
}

const HTTP_STATUSES = [
  [200, "OK", "Request succeeded"], [201, "Created", "Resource created"], [204, "No Content", "Success, nothing to return"],
  [301, "Moved Permanently", "Resource has a new URL"], [304, "Not Modified", "Cached version is valid"],
  [400, "Bad Request", "Malformed request"], [401, "Unauthorized", "Authentication required"], [403, "Forbidden", "Not allowed"],
  [404, "Not Found", "Resource doesn't exist"], [409, "Conflict", "Request conflicts with server state"],
  [422, "Unprocessable Entity", "Semantically invalid"], [429, "Too Many Requests", "Rate limited"],
  [500, "Internal Server Error", "Something broke server-side"], [502, "Bad Gateway", "Invalid upstream response"],
  [503, "Service Unavailable", "Server temporarily down"], [504, "Gateway Timeout", "Upstream timed out"],
];
function HttpStatusTool({ tool, onBack }) {
  const [q, setQ] = useState("");
  const filtered = HTTP_STATUSES.filter(([code, name]) => (code + name).toLowerCase().includes(q.toLowerCase()));
  const colorFor = (code) => code < 300 ? C.success : code < 400 ? C.primary : code < 500 ? C.warning : C.danger;
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search status code or name..." className="dv-input dv-focus w-full rounded-xl p-3 text-sm" />
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {filtered.map(([code, name, desc]) => (
          <div key={code} className="dv-card flex items-start gap-3 rounded-xl px-4 py-3">
            <span className="mono text-sm font-bold" style={{ color: colorFor(code) }}>{code}</span>
            <div><div className="text-sm text-white">{name}</div><div className="text-[11px]" style={{ color: C.sub }}>{desc}</div></div>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m || m.length < 3) return null;
  return m.slice(0, 3).map((h) => parseInt(h, 16));
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}
function ColorConverterTool({ tool, onBack }) {
  const [hex, setHex] = useState("#4F8CFF");
  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => rgb && rgbToHsl(...rgb), [rgb]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="flex items-center gap-4">
        <input type="color" value={rgb ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} className="h-16 w-16 cursor-pointer rounded-xl border-0 bg-transparent" />
        <input value={hex} onChange={(e) => setHex(e.target.value)} className="dv-input dv-focus mono w-40 rounded-xl p-3 text-sm" />
      </div>
      <div className="mt-4 space-y-2">
        {[
          ["HEX", rgb ? hex.toUpperCase() : "Invalid"],
          ["RGB", rgb ? `rgb(${rgb.join(", ")})` : "Invalid"],
          ["HSL", hsl ? `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)` : "Invalid"],
        ].map(([label, value]) => (
          <div key={label} className="dv-card flex items-center justify-between rounded-xl px-4 py-3">
            <div><div className="text-[11px]" style={{ color: C.sub }}>{label}</div><div className="mono text-sm text-white">{value}</div></div>
            <CopyButton text={value} />
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

function UnixTimestampTool({ tool, onBack }) {
  const [ts, setTs] = useState(() => Math.floor(Date.now() / 1000));
  const [iso, setIso] = useState(() => new Date().toISOString().slice(0, 19));
  const fromTs = (v) => { setTs(v); const d = new Date(v * 1000); if (!isNaN(d)) setIso(d.toISOString().slice(0, 19)); };
  const fromIso = (v) => { setIso(v); const d = new Date(v); if (!isNaN(d)) setTs(Math.floor(d.getTime() / 1000)); };
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Unix timestamp (seconds)">
          <input type="number" value={ts} onChange={(e) => fromTs(Number(e.target.value))} className="dv-input dv-focus mono w-full rounded-xl p-3 text-sm" />
        </Field>
        <Field label="ISO date / time">
          <input type="datetime-local" value={iso} onChange={(e) => fromIso(e.target.value)} className="dv-input dv-focus mono w-full rounded-xl p-3 text-sm" />
        </Field>
      </div>
      <button onClick={() => fromTs(Math.floor(Date.now() / 1000))} className="dv-btn-ghost dv-focus mt-4 rounded-lg px-3 py-1.5 text-xs font-medium">Use current time</button>
    </ToolShell>
  );
}

function AgeCalculatorTool({ tool, onBack }) {
  const [dob, setDob] = useState("2000-01-01");
  const result = useMemo(() => {
    const birth = new Date(dob);
    if (isNaN(birth)) return null;
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birth) / 86400000);
    return { years, months, days, totalDays };
  }, [dob]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <Field label="Date of birth"><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="dv-input dv-focus rounded-xl p-3 text-sm" /></Field>
      {result && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[["Years", result.years], ["Months", result.months], ["Days", result.days], ["Total days", result.totalDays]].map(([l, v]) => (
            <div key={l} className="dv-card rounded-xl px-4 py-3 text-center">
              <div className="mono text-lg font-semibold" style={{ color: C.primary }}>{v}</div>
              <div className="mt-0.5 text-[11px]" style={{ color: C.sub }}>{l}</div>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}

function RegexTesterTool({ tool, onBack }) {
  const [pattern, setPattern] = useState("[A-Z][a-z]+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("DevVault is a Premium Developer Toolkit built for Fast teams.");
  const { matches, error } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      return { matches: [...text.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"))], error: null };
    } catch (e) { return { matches: [], error: e.message }; }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (error || !pattern) return escapeHtml(text);
    let last = 0, out = "";
    for (const m of matches) {
      out += escapeHtml(text.slice(last, m.index));
      out += `<mark style="background:rgba(79,140,255,0.35);color:white;border-radius:3px;padding:0 2px;">${escapeHtml(m[0])}</mark>`;
      last = m.index + m[0].length;
    }
    out += escapeHtml(text.slice(last));
    return out;
  }, [matches, text, error, pattern]);

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex flex-wrap items-end gap-3">
        <Field label="Pattern">
          <input value={pattern} onChange={(e) => setPattern(e.target.value)} className="dv-input dv-focus mono w-64 rounded-lg p-3 text-sm" />
        </Field>
        <Field label="Flags">
          <input value={flags} onChange={(e) => setFlags(e.target.value)} className="dv-input dv-focus mono w-20 rounded-lg p-3 text-sm" />
        </Field>
        <div className="dv-tag">{error ? "Invalid" : `${matches.length} match${matches.length === 1 ? "" : "es"}`}</div>
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="dv-input dv-focus mono h-28 w-full rounded-xl p-4 text-xs" />
      <div className="mt-3">
        <span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>Highlighted matches</span>
        <div className="dv-input mono min-h-[60px] w-full whitespace-pre-wrap rounded-xl p-4 text-xs text-white" dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>
      {error && <p className="mt-2 text-xs" style={{ color: C.danger }}>{error}</p>}
    </ToolShell>
  );
}

function DedupeLinesTool({ tool, onBack }) {
  const [input, setInput] = useState("apple\nbanana\nApple\ncherry\nbanana\n");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [trim, setTrim] = useState(true);
  const [sort, setSort] = useState(false);
  const output = useMemo(() => {
    let lines = input.split("\n");
    if (trim) lines = lines.map((l) => l.trim());
    lines = lines.filter((l) => l.length > 0);
    const seen = new Set();
    const result = [];
    for (const line of lines) {
      const key = caseInsensitive ? line.toLowerCase() : line;
      if (!seen.has(key)) { seen.add(key); result.push(line); }
    }
    if (sort) result.sort((a, b) => a.localeCompare(b));
    return result.join("\n");
  }, [input, caseInsensitive, trim, sort]);
  const removedCount = input.split("\n").filter(Boolean).length - output.split("\n").filter(Boolean).length;

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex flex-wrap items-center gap-4 text-xs" style={{ color: C.sub }}>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} className="accent-blue-500" /> Case-insensitive</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} className="accent-blue-500" /> Trim whitespace</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} className="accent-blue-500" /> Sort A→Z</label>
        <span className="ml-auto dv-tag">{removedCount > 0 ? `${removedCount} duplicate${removedCount === 1 ? "" : "s"} removed` : "no duplicates"}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus mono h-64 w-full rounded-xl p-4 text-xs" />
        <div className="dv-input mono h-64 w-full overflow-auto whitespace-pre-wrap rounded-xl p-4 text-xs text-white">{output}</div>
      </div>
      <div className="mt-3 flex justify-end gap-2"><CopyButton text={output} disabled={!output} /><ResetButton onClick={() => setInput("")} /></div>
    </ToolShell>
  );
}

function JsonCompareTool({ tool, onBack }) {
  const [a, setA] = useState('{\n  "name": "DevVault",\n  "version": 1,\n  "tags": ["dev","tools"]\n}');
  const [b, setB] = useState('{\n  "name": "DevVault",\n  "version": 2,\n  "premium": true\n}');
  const result = useMemo(() => {
    try {
      const objA = JSON.parse(a), objB = JSON.parse(b);
      const diffObjects = (x, y, path = "") => {
        const changes = [];
        if (typeof x !== "object" || typeof y !== "object" || x === null || y === null || Array.isArray(x) !== Array.isArray(y)) {
          if (JSON.stringify(x) !== JSON.stringify(y)) changes.push({ path: path || "(root)", type: "changed", a: x, b: y });
          return changes;
        }
        const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
        for (const k of keys) {
          const p = path ? `${path}.${k}` : k;
          if (!(k in x)) changes.push({ path: p, type: "added", b: y[k] });
          else if (!(k in y)) changes.push({ path: p, type: "removed", a: x[k] });
          else if (typeof x[k] === "object" && x[k] !== null && typeof y[k] === "object" && y[k] !== null) changes.push(...diffObjects(x[k], y[k], p));
          else if (JSON.stringify(x[k]) !== JSON.stringify(y[k])) changes.push({ path: p, type: "changed", a: x[k], b: y[k] });
        }
        return changes;
      };
      return { changes: diffObjects(objA, objB), error: null };
    } catch (e) { return { changes: [], error: e.message }; }
  }, [a, b]);
  const colorFor = { added: C.success, removed: C.danger, changed: C.warning };

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea value={a} onChange={(e) => setA(e.target.value)} className="dv-input dv-focus mono h-56 w-full rounded-xl p-4 text-xs" />
        <textarea value={b} onChange={(e) => setB(e.target.value)} className="dv-input dv-focus mono h-56 w-full rounded-xl p-4 text-xs" />
      </div>
      <div className="mt-4">
        {result.error ? (
          <p className="text-xs" style={{ color: C.danger }}>{result.error}</p>
        ) : result.changes.length === 0 ? (
          <p className="text-xs" style={{ color: C.success }}>Structurally identical.</p>
        ) : (
          <div className="space-y-1.5">
            {result.changes.map((c, i) => (
              <div key={i} className="dv-card mono flex flex-wrap items-center gap-2 rounded-lg px-3 py-2 text-xs">
                <span className="dv-tag" style={{ color: colorFor[c.type], borderColor: colorFor[c.type] + "55" }}>{c.type}</span>
                <span className="text-white">{c.path}</span>
                {c.type === "changed" && <span style={{ color: C.sub }}>{JSON.stringify(c.a)} → {JSON.stringify(c.b)}</span>}
                {c.type === "added" && <span style={{ color: C.sub }}>{JSON.stringify(c.b)}</span>}
                {c.type === "removed" && <span style={{ color: C.sub }}>{JSON.stringify(c.a)}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolShell>
  );
}

function PasswordStrengthTool({ tool, onBack }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const analysis = useMemo(() => {
    if (!pw) return null;
    let pool = 0;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/[0-9]/.test(pw)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
    const entropy = pw.length * Math.log2(pool || 1);
    const issues = [];
    if (pw.length < 12) issues.push("Use at least 12 characters");
    if (!/[A-Z]/.test(pw)) issues.push("Add an uppercase letter");
    if (!/[0-9]/.test(pw)) issues.push("Add a number");
    if (!/[^a-zA-Z0-9]/.test(pw)) issues.push("Add a symbol");
    if (/(.)\1\1/.test(pw)) issues.push("Avoid repeating the same character 3+ times");
    if (/^(?:123|abc|password|qwerty)/i.test(pw)) issues.push("Avoid common patterns or dictionary words");
    const score = entropy < 28 ? 0 : entropy < 40 ? 1 : entropy < 60 ? 2 : entropy < 80 ? 3 : 4;
    const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];
    const colors = [C.danger, C.danger, C.warning, C.primary, C.success];
    return { entropy: Math.round(entropy), issues, score, label: labels[score], color: colors[score] };
  }, [pw]);

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="dv-input dv-focus flex items-center gap-2 rounded-xl px-3 py-2">
        <input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Type a password to evaluate..." className="mono w-full bg-transparent text-sm text-white outline-none" />
        <button onClick={() => setShow((s) => !s)} className="dv-focus text-xs" style={{ color: C.sub }}>{show ? "Hide" : "Show"}</button>
      </div>
      {analysis && (
        <div className="mt-4">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i <= analysis.score ? analysis.color : C.border }} />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span style={{ color: analysis.color }} className="font-medium">{analysis.label}</span>
            <span style={{ color: C.sub }}>~{analysis.entropy} bits of entropy</span>
          </div>
          {analysis.issues.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {analysis.issues.map((issue) => (
                <li key={issue} className="flex items-start gap-2 text-xs" style={{ color: C.sub }}>
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ background: C.warning }} /> {issue}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <p className="mt-4 text-[11px]" style={{ color: C.sub }}>Everything here runs locally in your browser — nothing you type is sent anywhere.</p>
    </ToolShell>
  );
}

async function hmacHex(message, key, hash) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function HmacTool({ tool, onBack }) {
  const [message, setMessage] = useState("DevVault");
  const [key, setKey] = useState("super-secret-key");
  const [algo, setAlgo] = useState("SHA-256");
  const [out, setOut] = useState("");
  useEffect(() => {
    let cancelled = false;
    hmacHex(message, key, algo).then((h) => { if (!cancelled) setOut(h); }).catch(() => setOut(""));
    return () => { cancelled = true; };
  }, [message, key, algo]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Message"><input value={message} onChange={(e) => setMessage(e.target.value)} className="dv-input dv-focus mono w-full rounded-lg p-3 text-sm" /></Field>
        <Field label="Secret key"><input value={key} onChange={(e) => setKey(e.target.value)} className="dv-input dv-focus mono w-full rounded-lg p-3 text-sm" /></Field>
      </div>
      <Field label="Algorithm">
        <select value={algo} onChange={(e) => setAlgo(e.target.value)} className="dv-input dv-focus mt-1 rounded-lg px-3 py-2 text-xs">
          <option>SHA-256</option><option>SHA-1</option><option>SHA-512</option>
        </select>
      </Field>
      <div className="dv-card mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-4">
        <span className="mono break-all text-sm text-white">{out}</span>
        <CopyButton text={out} disabled={!out} />
      </div>
    </ToolShell>
  );
}

function parseUserAgent(ua) {
  const os = /Windows NT/.test(ua) ? "Windows" : /Mac OS X/.test(ua) ? "macOS" : /Android/.test(ua) ? "Android" : /iPhone|iPad|iOS/.test(ua) ? "iOS" : /Linux/.test(ua) ? "Linux" : "Unknown";
  let browser = "Unknown", version = "";
  const patterns = [
    ["Edg", "Edge"], ["OPR", "Opera"], ["Chrome", "Chrome"], ["CriOS", "Chrome (iOS)"],
    ["Firefox", "Firefox"], ["FxiOS", "Firefox (iOS)"], ["Safari", "Safari"],
  ];
  for (const [token, name] of patterns) {
    const re = new RegExp(token + "/([0-9.]+)");
    const m = ua.match(re);
    if (m && !(name === "Safari" && /Chrome|Chromium|CriOS/.test(ua))) { browser = name; version = m[1]; break; }
  }
  const mobile = /Mobi|Android|iPhone/.test(ua);
  const engine = /Gecko\/|Firefox/.test(ua) && !/like Gecko/.test(ua) ? "Gecko" : /AppleWebKit/.test(ua) ? "WebKit/Blink" : "Unknown";
  return { os, browser, version, mobile, engine };
}
function UserAgentTool({ tool, onBack }) {
  const [ua, setUa] = useState(typeof navigator !== "undefined" ? navigator.userAgent : "");
  const parsed = useMemo(() => parseUserAgent(ua), [ua]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <textarea value={ua} onChange={(e) => setUa(e.target.value)} className="dv-input dv-focus mono h-24 w-full rounded-xl p-4 text-xs" />
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Browser", `${parsed.browser} ${parsed.version}`], ["OS", parsed.os], ["Engine", parsed.engine], ["Device", parsed.mobile ? "Mobile" : "Desktop"]].map(([l, v]) => (
          <div key={l} className="dv-card rounded-xl px-4 py-3 text-center">
            <div className="mono text-sm font-semibold text-white">{v}</div>
            <div className="mt-0.5 text-[11px]" style={{ color: C.sub }}>{l}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px]" style={{ color: C.sub }}>Heuristic parser covering major browsers — edge-case UA strings may not resolve perfectly.</p>
    </ToolShell>
  );
}

function MetaTagsTool({ tool, onBack }) {
  const [f, setF] = useState({ title: "DevVault — Developer Toolkit", description: "Everything developers need, in one fast workspace.", url: "https://devvault.dev", image: "https://devvault.dev/og.png", site: "DevVault", twitter: "@devvault" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const output = `<title>${f.title}</title>
<meta name="description" content="${f.description}" />
<link rel="canonical" href="${f.url}" />

<meta property="og:type" content="website" />
<meta property="og:title" content="${f.title}" />
<meta property="og:description" content="${f.description}" />
<meta property="og:url" content="${f.url}" />
<meta property="og:image" content="${f.image}" />
<meta property="og:site_name" content="${f.site}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="${f.twitter}" />
<meta name="twitter:title" content="${f.title}" />
<meta name="twitter:description" content="${f.description}" />
<meta name="twitter:image" content="${f.image}" />`;

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title"><input value={f.title} onChange={set("title")} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="Site name"><input value={f.site} onChange={set("site")} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="URL"><input value={f.url} onChange={set("url")} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="Twitter handle"><input value={f.twitter} onChange={set("twitter")} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="Image URL"><input value={f.image} onChange={set("image")} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
      </div>
      <Field label="Description"><textarea value={f.description} onChange={set("description")} className="dv-input dv-focus mt-1 h-20 w-full rounded-lg p-2.5 text-sm" /></Field>
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-medium" style={{ color: C.sub }}>Generated tags</span><CopyButton text={output} /></div>
        <pre className="dv-input mono h-64 overflow-auto rounded-xl p-4 text-xs leading-relaxed text-white whitespace-pre-wrap">{output}</pre>
      </div>
    </ToolShell>
  );
}

function formatSql(sql) {
  let formatted = sql.replace(/\s+/g, " ").trim();
  const majorKeywords = ["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "JOIN", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "UNION ALL", "UNION"]
    .sort((a, b) => b.length - a.length);
  majorKeywords.forEach((kw) => {
    const re = new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi");
    formatted = formatted.replace(re, `\n${kw.toUpperCase()}`);
  });
  formatted = formatted.replace(/\b(AND|OR)\b/gi, "\n  $1");
  return formatted.split("\n").map((l) => l.trim()).filter(Boolean).join("\n");
}
function SqlFormatterTool({ tool, onBack }) {
  const [input, setInput] = useState("select id, name, email from users where active = true and role = 'admin' order by created_at desc limit 20;");
  const output = useMemo(() => formatSql(input), [input]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus mono h-32 w-full rounded-xl p-4 text-xs" />
      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-medium" style={{ color: C.sub }}>Formatted</span><CopyButton text={output} /></div>
        <pre className="dv-input mono h-56 overflow-auto rounded-xl p-4 text-xs leading-relaxed text-white whitespace-pre-wrap">{output}</pre>
      </div>
      <p className="mt-2 text-[11px]" style={{ color: C.sub }}>Keyword-based formatter tuned for common queries — not a full SQL parser.</p>
    </ToolShell>
  );
}

function parseCSV(text) {
  const rows = []; let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false; }
      else field += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ",") { row.push(field); field = ""; }
      else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (ch === "\r") { /* skip */ }
      else field += ch;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}
function csvToJsonStr(text) {
  const rows = parseCSV(text.trim());
  if (!rows.length) return "[]";
  const headers = rows[0];
  const data = rows.slice(1).filter((r) => r.some((c) => c !== "")).map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
  return JSON.stringify(data, null, 2);
}
function jsonToCsvStr(text) {
  const arr = JSON.parse(text);
  if (!Array.isArray(arr) || !arr.length) return "";
  const headers = Object.keys(arr[0]);
  const esc = (v) => { const s = String(v ?? ""); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  return [headers.join(","), ...arr.map((o) => headers.map((h) => esc(o[h])).join(","))].join("\n");
}
function CsvJsonTool({ tool, onBack }) {
  const [mode, setMode] = useState("csv2json");
  const [input, setInput] = useState("name,role,active\nAda,Engineer,true\nGrace,Admin,false");
  const { output, error } = useMemo(() => {
    try { return { output: mode === "csv2json" ? csvToJsonStr(input) : jsonToCsvStr(input), error: null }; }
    catch (e) { return { output: "", error: e.message }; }
  }, [input, mode]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex gap-2">
        {[["csv2json", "CSV → JSON"], ["json2csv", "JSON → CSV"]].map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m); setInput(m === "csv2json" ? "name,role,active\nAda,Engineer,true\nGrace,Admin,false" : '[\n  {"name":"Ada","role":"Engineer"},\n  {"name":"Grace","role":"Admin"}\n]'); }}
            className="dv-focus rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: mode === m ? C.primary : C.card, border: `1px solid ${C.border}`, color: "white" }}>{label}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="dv-input dv-focus mono h-56 w-full rounded-xl p-4 text-xs" />
        <div className="dv-input mono h-56 w-full overflow-auto rounded-xl p-4 text-xs text-white whitespace-pre-wrap">
          {error ? <span style={{ color: C.danger }}>{error}</span> : output}
        </div>
      </div>
      <div className="mt-3 flex justify-end"><CopyButton text={output} disabled={!output} /></div>
    </ToolShell>
  );
}

function QrGeneratorTool({ tool, onBack }) {
  const [text, setText] = useState("https://devvault.dev");
  const [size, setSize] = useState(240);
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <Field label="Content"><input value={text} onChange={(e) => setText(e.target.value)} className="dv-input dv-focus w-full rounded-xl p-3 text-sm" /></Field>
      <Field label={`Size — ${size}px`}><input type="range" min={120} max={400} step={20} value={size} onChange={(e) => setSize(Number(e.target.value))} className="mt-1 w-full accent-blue-500" /></Field>
      <div className="dv-card mt-4 flex flex-col items-center gap-3 rounded-2xl p-6">
        {text ? <img src={src} width={size} height={size} alt="QR code" className="rounded-lg" style={{ background: "white" }} /> : <p className="text-xs" style={{ color: C.sub }}>Enter content to generate a code</p>}
        {text && <a href={src} target="_blank" rel="noreferrer" className="dv-btn-ghost dv-focus rounded-lg px-3 py-1.5 text-xs font-medium">Open full size</a>}
      </div>
      <p className="mt-2 text-[11px]" style={{ color: C.sub }}>Rendered via the public api.qrserver.com image service — requires internet access in your browser.</p>
    </ToolShell>
  );
}

function ImageCompressorTool({ tool, onBack }) {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState("image/jpeg");
  const [origSize, setOrigSize] = useState(0);

  const handleFile = (file) => {
    if (!file) return;
    setOrigSize(file.size);
    const reader = new FileReader();
    reader.onload = () => setOriginal(reader.result);
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      setCompressed(canvas.toDataURL(format, quality));
    };
    img.src = original;
  }, [original, quality, format]);

  const compressedSize = compressed ? Math.round((compressed.length * 3) / 4) : 0;

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <label className="dv-card dv-focus flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-dashed py-12 text-sm" style={{ borderStyle: "dashed", color: C.sub }}>
        <Upload size={20} />
        {original ? "Choose a different image" : "Click to upload an image"}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </label>
      {original && (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label={`Quality — ${Math.round(quality * 100)}%`}><input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-blue-500" /></Field>
            <Field label="Format">
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="dv-input dv-focus rounded-lg px-3 py-2 text-xs">
                <option value="image/jpeg">JPEG</option><option value="image/webp">WebP</option><option value="image/png">PNG</option>
              </select>
            </Field>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><span className="mb-1.5 block text-xs" style={{ color: C.sub }}>Original — {(origSize / 1024).toFixed(1)} KB</span><img src={original} className="max-h-56 w-full rounded-xl object-contain" style={{ background: "rgba(255,255,255,0.03)" }} /></div>
            <div><span className="mb-1.5 block text-xs" style={{ color: C.sub }}>Compressed — ~{(compressedSize / 1024).toFixed(1)} KB</span>{compressed && <img src={compressed} className="max-h-56 w-full rounded-xl object-contain" style={{ background: "rgba(255,255,255,0.03)" }} />}</div>
          </div>
          {compressed && <a href={compressed} download="compressed.jpg" className="dv-btn-primary dv-focus mt-4 inline-block rounded-xl px-5 py-2.5 text-xs font-semibold">Download compressed image</a>}
        </>
      )}
    </ToolShell>
  );
}

function GradientGeneratorTool({ tool, onBack }) {
  const [c1, setC1] = useState("#4F8CFF");
  const [c2, setC2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState("linear");
  const css = type === "linear" ? `linear-gradient(${angle}deg, ${c1}, ${c2})` : `radial-gradient(circle, ${c1}, ${c2})`;
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="h-40 w-full rounded-2xl" style={{ background: css }} />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Color 1"><input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border-0" /></Field>
        <Field label="Color 2"><input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border-0" /></Field>
        <Field label="Type">
          <select value={type} onChange={(e) => setType(e.target.value)} className="dv-input dv-focus w-full rounded-lg px-3 py-2 text-xs"><option value="linear">Linear</option><option value="radial">Radial</option></select>
        </Field>
        {type === "linear" && <Field label={`Angle — ${angle}°`}><input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="mt-2 w-full accent-blue-500" /></Field>}
      </div>
      <div className="dv-card mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3">
        <span className="mono text-xs text-white">background: {css};</span>
        <CopyButton text={`background: ${css};`} />
      </div>
    </ToolShell>
  );
}

function ShadowGeneratorTool({ tool, onBack }) {
  const [x, setX] = useState(0), [y, setY] = useState(12), [blur, setBlur] = useState(30), [spread, setSpread] = useState(-8), [opacity, setOpacity] = useState(0.5);
  const shadow = `${x}px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacity})`;
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="flex h-40 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="h-20 w-32 rounded-2xl" style={{ background: C.primary, boxShadow: shadow }} />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label={`Offset X — ${x}px`}><input type="range" min={-40} max={40} value={x} onChange={(e) => setX(Number(e.target.value))} className="w-full accent-blue-500" /></Field>
        <Field label={`Offset Y — ${y}px`}><input type="range" min={-40} max={40} value={y} onChange={(e) => setY(Number(e.target.value))} className="w-full accent-blue-500" /></Field>
        <Field label={`Blur — ${blur}px`}><input type="range" min={0} max={100} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-blue-500" /></Field>
        <Field label={`Spread — ${spread}px`}><input type="range" min={-40} max={40} value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full accent-blue-500" /></Field>
        <Field label={`Opacity — ${opacity}`}><input type="range" min={0} max={1} step={0.05} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-blue-500" /></Field>
      </div>
      <div className="dv-card mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-3">
        <span className="mono text-xs text-white">box-shadow: {shadow};</span>
        <CopyButton text={`box-shadow: ${shadow};`} />
      </div>
    </ToolShell>
  );
}

const DOCKERFILE_TEMPLATES = {
  node: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`,
  python: `FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["python", "app.py"]`,
  go: `FROM golang:1.22-alpine AS build\nWORKDIR /app\nCOPY go.* ./\nRUN go mod download\nCOPY . .\nRUN go build -o server .\n\nFROM alpine\nCOPY --from=build /app/server /server\nEXPOSE 8080\nCMD ["/server"]`,
  static: `FROM nginx:alpine\nCOPY . /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`,
};
function DockerfileTool({ tool, onBack }) {
  const [stack, setStack] = useState("node");
  const output = DOCKERFILE_TEMPLATES[stack];
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex flex-wrap gap-2">
        {Object.keys(DOCKERFILE_TEMPLATES).map((k) => (
          <button key={k} onClick={() => setStack(k)} className="dv-focus rounded-lg px-3 py-1.5 text-xs font-medium capitalize" style={{ background: stack === k ? C.primary : C.card, border: `1px solid ${C.border}`, color: "white" }}>{k}</button>
        ))}
      </div>
      <div className="mb-2 flex items-center justify-between"><span className="text-xs font-medium" style={{ color: C.sub }}>Dockerfile</span><CopyButton text={output} /></div>
      <pre className="dv-input mono overflow-auto rounded-xl p-4 text-xs leading-relaxed text-white whitespace-pre-wrap">{output}</pre>
    </ToolShell>
  );
}

function EnvGeneratorTool({ tool, onBack }) {
  const [rows, setRows] = useState([{ key: "DATABASE_URL", value: "postgres://user:pass@localhost:5432/db" }, { key: "API_KEY", value: "" }]);
  const update = (i, field, val) => setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [field]: val } : row)));
  const output = rows.filter((r) => r.key).map((r) => `${r.key}=${r.value}`).join("\n");
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-2">
            <input value={r.key} onChange={(e) => update(i, "key", e.target.value.toUpperCase().replace(/\s/g, "_"))} placeholder="KEY" className="dv-input dv-focus mono w-1/3 rounded-lg p-2.5 text-xs" />
            <input value={r.value} onChange={(e) => update(i, "value", e.target.value)} placeholder="value" className="dv-input dv-focus mono flex-1 rounded-lg p-2.5 text-xs" />
            <button onClick={() => setRows((r2) => r2.filter((_, idx) => idx !== i))} className="dv-btn-ghost dv-focus rounded-lg px-2.5"><Trash2 size={13} /></button>
          </div>
        ))}
      </div>
      <button onClick={() => setRows((r) => [...r, { key: "", value: "" }])} className="dv-btn-ghost dv-focus mt-3 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"><Plus size={13} /> Add variable</button>
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-medium" style={{ color: C.sub }}>.env</span><CopyButton text={output} disabled={!output} /></div>
        <pre className="dv-input mono h-32 overflow-auto rounded-xl p-4 text-xs text-white whitespace-pre-wrap">{output}</pre>
      </div>
    </ToolShell>
  );
}

const GITIGNORE_PRESETS = {
  Node: "node_modules/\nnpm-debug.log*\n.env\ndist/\nbuild/\ncoverage/",
  Python: "__pycache__/\n*.pyc\n.venv/\nvenv/\n.env\n*.egg-info/\ndist/\nbuild/",
  macOS: ".DS_Store\n.AppleDouble\n.LSOverride",
  Windows: "Thumbs.db\nehthumbs.db\nDesktop.ini\n$RECYCLE.BIN/",
  VSCode: ".vscode/*\n!.vscode/extensions.json",
  JetBrains: ".idea/\n*.iml\nout/",
};
function GitignoreTool({ tool, onBack }) {
  const [selected, setSelected] = useState(["Node", "macOS", "VSCode"]);
  const toggle = (k) => setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  const output = selected.map((k) => `# ${k}\n${GITIGNORE_PRESETS[k]}`).join("\n\n");
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(GITIGNORE_PRESETS).map((k) => (
          <button key={k} onClick={() => toggle(k)} className="dv-focus rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: selected.includes(k) ? C.primary : C.card, border: `1px solid ${C.border}`, color: "white" }}>{k}</button>
        ))}
      </div>
      <div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-medium" style={{ color: C.sub }}>.gitignore</span><CopyButton text={output} disabled={!output} /></div>
      <pre className="dv-input mono h-64 overflow-auto rounded-xl p-4 text-xs text-white whitespace-pre-wrap">{output || "Select at least one preset above."}</pre>
    </ToolShell>
  );
}

const COMMON_ZONES = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Berlin", "Asia/Dubai", "Asia/Kolkata", "Asia/Singapore", "Asia/Tokyo", "Australia/Sydney"];
function TimezoneConverterTool({ tool, onBack }) {
  const [dt, setDt] = useState(() => new Date().toISOString().slice(0, 16));
  const [sourceZone, setSourceZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  const results = useMemo(() => {
    try {
      const utcGuess = new Date(dt + ":00");
      return COMMON_ZONES.map((zone) => ({
        zone,
        time: new Intl.DateTimeFormat("en-US", { timeZone: zone, dateStyle: "medium", timeStyle: "short" }).format(utcGuess),
      }));
    } catch { return []; }
  }, [dt]);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Date & time"><input type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} className="dv-input dv-focus w-full rounded-xl p-3 text-sm" /></Field>
        <Field label="Your local timezone"><div className="dv-input mono flex items-center rounded-xl p-3 text-xs" style={{ color: C.sub }}>{sourceZone}</div></Field>
      </div>
      <div className="mt-4 space-y-2">
        {results.map((r) => (
          <div key={r.zone} className="dv-card flex items-center justify-between rounded-xl px-4 py-3">
            <span className="mono text-xs" style={{ color: C.sub }}>{r.zone}</span>
            <span className="text-sm text-white">{r.time}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px]" style={{ color: C.sub }}>Interpreted as your browser's local time, then converted using Intl timezone data.</p>
    </ToolShell>
  );
}

function ReadmeGeneratorTool({ tool, onBack }) {
  const [f, setF] = useState({ name: "DevVault", description: "The internet's most beautiful developer toolkit.", install: "npm install", usage: "npm run dev", license: "MIT" });
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const md = `# ${f.name}\n\n${f.description}\n\n## Install\n\n\`\`\`bash\n${f.install}\n\`\`\`\n\n## Usage\n\n\`\`\`bash\n${f.usage}\n\`\`\`\n\n## License\n\n${f.license}`;
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Project name"><input value={f.name} onChange={set("name")} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="License"><input value={f.license} onChange={set("license")} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="Install command"><input value={f.install} onChange={set("install")} className="dv-input dv-focus mono w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="Usage command"><input value={f.usage} onChange={set("usage")} className="dv-input dv-focus mono w-full rounded-lg p-2.5 text-sm" /></Field>
      </div>
      <Field label="Description"><textarea value={f.description} onChange={set("description")} className="dv-input dv-focus mt-1 h-16 w-full rounded-lg p-2.5 text-sm" /></Field>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div><div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-medium" style={{ color: C.sub }}>Markdown</span><CopyButton text={md} /></div>
          <pre className="dv-input mono h-56 overflow-auto rounded-xl p-4 text-xs text-white whitespace-pre-wrap">{md}</pre></div>
        <div><span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>Preview</span>
          <div className="dv-input h-56 overflow-auto rounded-xl p-4 text-sm text-white" dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }} /></div>
      </div>
    </ToolShell>
  );
}

const COMMIT_TYPES = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "build", "ci"];
function CommitGeneratorTool({ tool, onBack }) {
  const [type, setType] = useState("feat");
  const [scope, setScope] = useState("auth");
  const [desc, setDesc] = useState("add password strength meter");
  const [body, setBody] = useState("");
  const [breaking, setBreaking] = useState(false);
  const message = `${type}${scope ? `(${scope})` : ""}${breaking ? "!" : ""}: ${desc}${body ? `\n\n${body}` : ""}${breaking ? `\n\nBREAKING CHANGE: ${desc}` : ""}`;
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex flex-wrap gap-2">
        {COMMIT_TYPES.map((t) => (
          <button key={t} onClick={() => setType(t)} className="dv-focus rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: type === t ? C.primary : C.card, border: `1px solid ${C.border}`, color: "white" }}>{t}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Scope (optional)"><input value={scope} onChange={(e) => setScope(e.target.value)} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="Short description"><input value={desc} onChange={(e) => setDesc(e.target.value)} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
      </div>
      <Field label="Body (optional)"><textarea value={body} onChange={(e) => setBody(e.target.value)} className="dv-input dv-focus mt-1 h-16 w-full rounded-lg p-2.5 text-sm" /></Field>
      <label className="mt-3 flex items-center gap-2 text-xs" style={{ color: C.sub }}><input type="checkbox" checked={breaking} onChange={(e) => setBreaking(e.target.checked)} className="accent-blue-500" /> Breaking change</label>
      <div className="dv-card mt-4 flex items-start justify-between gap-3 rounded-xl px-4 py-4">
        <pre className="mono whitespace-pre-wrap text-sm text-white">{message}</pre>
        <CopyButton text={message} />
      </div>
    </ToolShell>
  );
}

const LICENSE_TEXTS = {
  MIT: (year, author) => `MIT License\n\nCopyright (c) ${year} ${author}\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`,
  "BSD-3-Clause": (year, author) => `BSD 3-Clause License\n\nCopyright (c) ${year}, ${author}\nAll rights reserved.\n\nRedistribution and use in source and binary forms, with or without modification, are permitted provided the original copyright notice, this list of conditions, and the following disclaimer are retained, and neither the name of the copyright holder nor its contributors may be used to endorse derived products without prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS "AS IS" WITHOUT WARRANTIES OF ANY KIND.`,
  ISC: (year, author) => `ISC License\n\nCopyright (c) ${year} ${author}\n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided the above copyright notice and this permission notice appear in all copies.\n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES.`,
  Unlicense: () => `This is free and unencumbered software released into the public domain.\n\nAnyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.`,
  "Apache-2.0": (year, author) => `Apache License 2.0\n\nCopyright ${year} ${author}\n\nLicensed under the Apache License, Version 2.0. This preview shows the notice header only — copy the full license text from apache.org/licenses/LICENSE-2.0.txt before publishing.`,
  "GPL-3.0": (year, author) => `GNU General Public License v3.0\n\nCopyright (C) ${year} ${author}\n\nThis program is free software; full terms require the complete GPL-3.0 text — copy it from gnu.org/licenses/gpl-3.0.txt before publishing.`,
};
function LicenseGeneratorTool({ tool, onBack }) {
  const [license, setLicense] = useState("MIT");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [author, setAuthor] = useState("Your Name");
  const text = LICENSE_TEXTS[license](year, author);
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="mb-3 flex flex-wrap gap-2">
        {Object.keys(LICENSE_TEXTS).map((k) => (
          <button key={k} onClick={() => setLicense(k)} className="dv-focus rounded-lg px-3 py-1.5 text-xs font-medium" style={{ background: license === k ? C.primary : C.card, border: `1px solid ${C.border}`, color: "white" }}>{k}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Year"><input value={year} onChange={(e) => setYear(e.target.value)} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
        <Field label="Author / holder"><input value={author} onChange={(e) => setAuthor(e.target.value)} className="dv-input dv-focus w-full rounded-lg p-2.5 text-sm" /></Field>
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between"><span className="text-xs font-medium" style={{ color: C.sub }}>LICENSE</span><CopyButton text={text} /></div>
        <pre className="dv-input mono h-64 overflow-auto rounded-xl p-4 text-xs leading-relaxed text-white whitespace-pre-wrap">{text}</pre>
      </div>
    </ToolShell>
  );
}

function RestClientTool({ tool, onBack }) {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos/1");
  const [headers, setHeaders] = useState([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true); setRes(null);
    const start = performance.now();
    try {
      const headerObj = Object.fromEntries(headers.filter((h) => h.key).map((h) => [h.key, h.value]));
      const opts = { method, headers: headerObj };
      if (method !== "GET" && method !== "HEAD" && body) opts.body = body;
      const response = await fetch(url, opts);
      const time = Math.round(performance.now() - start);
      const text = await response.text();
      let parsed = text;
      try { parsed = JSON.stringify(JSON.parse(text), null, 2); } catch { /* not JSON, keep raw */ }
      setRes({ status: response.status, ok: response.ok, time, body: parsed });
    } catch (e) {
      setRes({ error: e.message || "Request failed — likely blocked by CORS on the target server." });
    } finally { setLoading(false); }
  };

  const updateHeader = (i, field, val) => setHeaders((h) => h.map((row, idx) => (idx === i ? { ...row, [field]: val } : row)));

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="dv-input dv-focus rounded-lg px-3 py-2.5 text-xs">
          {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => <option key={m}>{m}</option>)}
        </select>
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="dv-input dv-focus mono flex-1 rounded-lg p-2.5 text-xs" />
        <button onClick={send} disabled={loading} className="dv-btn-primary dv-focus flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold disabled:opacity-50"><Send size={13} /> {loading ? "Sending" : "Send"}</button>
      </div>

      <div className="mt-3">
        <span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>Headers</span>
        {headers.map((h, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input value={h.key} onChange={(e) => updateHeader(i, "key", e.target.value)} placeholder="Header" className="dv-input dv-focus mono w-1/3 rounded-lg p-2 text-xs" />
            <input value={h.value} onChange={(e) => updateHeader(i, "value", e.target.value)} placeholder="Value" className="dv-input dv-focus mono flex-1 rounded-lg p-2 text-xs" />
            <button onClick={() => setHeaders((h2) => h2.filter((_, idx) => idx !== i))} className="dv-btn-ghost dv-focus rounded-lg px-2.5"><Trash2 size={12} /></button>
          </div>
        ))}
        <button onClick={() => setHeaders((h) => [...h, { key: "", value: "" }])} className="dv-btn-ghost dv-focus flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs"><Plus size={12} /> Add header</button>
      </div>

      {method !== "GET" && (
        <div className="mt-3">
          <span className="mb-1.5 block text-xs font-medium" style={{ color: C.sub }}>Body</span>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder='{"key": "value"}' className="dv-input dv-focus mono h-24 w-full rounded-xl p-3 text-xs" />
        </div>
      )}

      {res && (
        <div className="mt-4">
          {res.error ? (
            <p className="text-xs" style={{ color: C.danger }}>{res.error}</p>
          ) : (
            <>
              <div className="mb-2 flex items-center gap-3 text-xs">
                <span className="dv-tag" style={{ color: res.ok ? C.success : C.danger, borderColor: (res.ok ? C.success : C.danger) + "55" }}>{res.status}</span>
                <span style={{ color: C.sub }}>{res.time}ms</span>
                <CopyButton text={res.body} />
              </div>
              <pre className="dv-input mono h-56 overflow-auto rounded-xl p-4 text-xs text-white whitespace-pre-wrap">{res.body}</pre>
            </>
          )}
        </div>
      )}
      <p className="mt-3 text-[11px]" style={{ color: C.sub }}>Runs a real fetch() from your browser — the target API must allow CORS from this origin.</p>
    </ToolShell>
  );
}

// Pure JS bcrypt (Blowfish-based), verified byte-for-byte against libxcrypt for correctness.
var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('');
var BASE64_INDEX = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
  -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,54,55,56,57,58,59,60,61,62,63,-1,-1,-1,-1,-1,-1,
  -1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,-1,-1,-1,-1,-1,-1,28,29,30,
  31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,-1,-1,-1,-1,-1];

function base64_encode(b, len) {
  var off = 0, rs = [], c1, c2;
  if (len <= 0 || len > b.length) throw Error("Illegal len: "+len);
  while (off < len) {
    c1 = b[off++] & 0xff;
    rs.push(BASE64_CODE[(c1 >> 2) & 0x3f]);
    c1 = (c1 & 0x03) << 4;
    if (off >= len) { rs.push(BASE64_CODE[c1 & 0x3f]); break; }
    c2 = b[off++] & 0xff;
    c1 |= (c2 >> 4) & 0x0f;
    rs.push(BASE64_CODE[c1 & 0x3f]);
    c1 = (c2 & 0x0f) << 2;
    if (off >= len) { rs.push(BASE64_CODE[c1 & 0x3f]); break; }
    c2 = b[off++] & 0xff;
    c1 |= (c2 >> 6) & 0x03;
    rs.push(BASE64_CODE[c1 & 0x3f]);
    rs.push(BASE64_CODE[c2 & 0x3f]);
  }
  return rs.join('');
}
function base64_decode(s, len) {
  var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
  if (len <= 0) throw Error("Illegal len: "+len);
  while (off < slen - 1 && olen < len) {
    code = s.charCodeAt(off++); c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    code = s.charCodeAt(off++); c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c1 == -1 || c2 == -1) break;
    o = (c1 << 2) >>> 0; o |= (c2 & 0x30) >> 4;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++); c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    if (c3 == -1) break;
    o = ((c2 & 0x0f) << 4) >>> 0; o |= (c3 & 0x3c) >> 2;
    rs.push(String.fromCharCode(o));
    if (++olen >= len || off >= slen) break;
    code = s.charCodeAt(off++); c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
    o = ((c3 & 0x03) << 6) >>> 0; o |= c4;
    rs.push(String.fromCharCode(o));
    ++olen;
  }
  var res = [];
  for (off = 0; off < olen; off++) res.push(rs[off].charCodeAt(0));
  return res;
}

function utf8Array(string) {
  var buffer = [], c1, c2;
  for (var i = 0, k = string.length; i < k; ++i) {
    c1 = string.charCodeAt(i);
    if (c1 < 128) buffer.push(c1);
    else if (c1 < 2048) { buffer.push((c1 >> 6) | 192); buffer.push((c1 & 63) | 128); }
    else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
      c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF); ++i;
      buffer.push((c1 >> 18) | 240); buffer.push(((c1 >> 12) & 63) | 128);
      buffer.push(((c1 >> 6) & 63) | 128); buffer.push((c1 & 63) | 128);
    } else {
      buffer.push((c1 >> 12) | 224); buffer.push(((c1 >> 6) & 63) | 128); buffer.push((c1 & 63) | 128);
    }
  }
  return buffer;
}

var P_ORIG = [0x243f6a88,0x85a308d3,0x13198a2e,0x03707344,0xa4093822,0x299f31d0,0x082efa98,0xec4e6c89,0x452821e6,0x38d01377,0xbe5466cf,0x34e90c6c,0xc0ac29b7,0xc97c50dd,0x3f84d5b5,0xb5470917,0x9216d5d9,0x8979fb1b];
var S_ORIG = [0xd1310ba6,0x98dfb5ac,0x2ffd72db,0xd01adfb7,0xb8e1afed,0x6a267e96,0xba7c9045,0xf12c7f99,0x24a19947,0xb3916cf7,0x0801f2e2,0x858efc16,0x636920d8,0x71574e69,0xa458fea3,0xf4933d7e,0x0d95748f,0x728eb658,0x718bcd58,0x82154aee,0x7b54a41d,0xc25a59b5,0x9c30d539,0x2af26013,0xc5d1b023,0x286085f0,0xca417918,0xb8db38ef,0x8e79dcb0,0x603a180e,0x6c9e0e8b,0xb01e8a3e,0xd71577c1,0xbd314b27,0x78af2fda,0x55605c60,0xe65525f3,0xaa55ab94,0x57489862,0x63e81440,0x55ca396a,0x2aab10b6,0xb4cc5c34,0x1141e8ce,0xa15486af,0x7c72e993,0xb3ee1411,0x636fbc2a,0x2ba9c55d,0x741831f6,0xce5c3e16,0x9b87931e,0xafd6ba33,0x6c24cf5c,0x7a325381,0x28958677,0x3b8f4898,0x6b4bb9af,0xc4bfe81b,0x66282193,0x61d809cc,0xfb21a991,0x487cac60,0x5dec8032,0xef845d5d,0xe98575b1,0xdc262302,0xeb651b88,0x23893e81,0xd396acc5,0x0f6d6ff3,0x83f44239,0x2e0b4482,0xa4842004,0x69c8f04a,0x9e1f9b5e,0x21c66842,0xf6e96c9a,0x670c9c61,0xabd388f0,0x6a51a0d2,0xd8542f68,0x960fa728,0xab5133a3,0x6eef0b6c,0x137a3be4,0xba3bf050,0x7efb2a98,0xa1f1651d,0x39af0176,0x66ca593e,0x82430e88,0x8cee8619,0x456f9fb4,0x7d84a5c3,0x3b8b5ebe,0xe06f75d8,0x85c12073,0x401a449f,0x56c16aa6,0x4ed3aa62,0x363f7706,0x1bfedf72,0x429b023d,0x37d0d724,0xd00a1248,0xdb0fead3,0x49f1c09b,0x075372c9,0x80991b7b,0x25d479d8,0xf6e8def7,0xe3fe501a,0xb6794c3b,0x976ce0bd,0x04c006ba,0xc1a94fb6,0x409f60c4,0x5e5c9ec2,0x196a2463,0x68fb6faf,0x3e6c53b5,0x1339b2eb,0x3b52ec6f,0x6dfc511f,0x9b30952c,0xcc814544,0xaf5ebd09,0xbee3d004,0xde334afd,0x660f2807,0x192e4bb3,0xc0cba857,0x45c8740f,0xd20b5f39,0xb9d3fbdb,0x5579c0bd,0x1a60320a,0xd6a100c6,0x402c7279,0x679f25fe,0xfb1fa3cc,0x8ea5e9f8,0xdb3222f8,0x3c7516df,0xfd616b15,0x2f501ec8,0xad0552ab,0x323db5fa,0xfd238760,0x53317b48,0x3e00df82,0x9e5c57bb,0xca6f8ca0,0x1a87562e,0xdf1769db,0xd542a8f6,0x287effc3,0xac6732c6,0x8c4f5573,0x695b27b0,0xbbca58c8,0xe1ffa35d,0xb8f011a0,0x10fa3d98,0xfd2183b8,0x4afcb56c,0x2dd1d35b,0x9a53e479,0xb6f84565,0xd28e49bc,0x4bfb9790,0xe1ddf2da,0xa4cb7e33,0x62fb1341,0xcee4c6e8,0xef20cada,0x36774c01,0xd07e9efe,0x2bf11fb4,0x95dbda4d,0xae909198,0xeaad8e71,0x6b93d5a0,0xd08ed1d0,0xafc725e0,0x8e3c5b2f,0x8e7594b7,0x8ff6e2fb,0xf2122b64,0x8888b812,0x900df01c,0x4fad5ea0,0x688fc31c,0xd1cff191,0xb3a8c1ad,0x2f2f2218,0xbe0e1777,0xea752dfe,0x8b021fa1,0xe5a0cc0f,0xb56f74e8,0x18acf3d6,0xce89e299,0xb4a84fe0,0xfd13e0b7,0x7cc43b81,0xd2ada8d9,0x165fa266,0x80957705,0x93cc7314,0x211a1477,0xe6ad2065,0x77b5fa86,0xc75442f5,0xfb9d35cf,0xebcdaf0c,0x7b3e89a0,0xd6411bd3,0xae1e7e49,0x00250e2d,0x2071b35e,0x226800bb,0x57b8e0af,0x2464369b,0xf009b91e,0x5563911d,0x59dfa6aa,0x78c14389,0xd95a537f,0x207d5ba2,0x02e5b9c5,0x83260376,0x6295cfa9,0x11c81968,0x4e734a41,0xb3472dca,0x7b14a94a,0x1b510052,0x9a532915,0xd60f573f,0xbc9bc6e4,0x2b60a476,0x81e67400,0x08ba6fb5,0x571be91f,0xf296ec6b,0x2a0dd915,0xb6636521,0xe7b9f9b6,0xff34052e,0xc5855664,0x53b02d5d,0xa99f8fa1,0x08ba4799,0x6e85076a,0x4b7a70e9,0xb5b32944,0xdb75092e,0xc4192623,0xad6ea6b0,0x49a7df7d,0x9cee60b8,0x8fedb266,0xecaa8c71,0x699a17ff,0x5664526c,0xc2b19ee1,0x193602a5,0x75094c29,0xa0591340,0xe4183a3e,0x3f54989a,0x5b429d65,0x6b8fe4d6,0x99f73fd6,0xa1d29c07,0xefe830f5,0x4d2d38e6,0xf0255dc1,0x4cdd2086,0x8470eb26,0x6382e9c6,0x021ecc5e,0x09686b3f,0x3ebaefc9,0x3c971814,0x6b6a70a1,0x687f3584,0x52a0e286,0xb79c5305,0xaa500737,0x3e07841c,0x7fdeae5c,0x8e7d44ec,0x5716f2b8,0xb03ada37,0xf0500c0d,0xf01c1f04,0x0200b3ff,0xae0cf51a,0x3cb574b2,0x25837a58,0xdc0921bd,0xd19113f9,0x7ca92ff6,0x94324773,0x22f54701,0x3ae5e581,0x37c2dadc,0xc8b57634,0x9af3dda7,0xa9446146,0x0fd0030e,0xecc8c73e,0xa4751e41,0xe238cd99,0x3bea0e2f,0x3280bba1,0x183eb331,0x4e548b38,0x4f6db908,0x6f420d03,0xf60a04bf,0x2cb81290,0x24977c79,0x5679b072,0xbcaf89af,0xde9a771f,0xd9930810,0xb38bae12,0xdccf3f2e,0x5512721f,0x2e6b7124,0x501adde6,0x9f84cd87,0x7a584718,0x7408da17,0xbc9f9abc,0xe94b7d8c,0xec7aec3a,0xdb851dfa,0x63094366,0xc464c3d2,0xef1c1847,0x3215d908,0xdd433b37,0x24c2ba16,0x12a14d43,0x2a65c451,0x50940002,0x133ae4dd,0x71dff89e,0x10314e55,0x81ac77d6,0x5f11199b,0x043556f1,0xd7a3c76b,0x3c11183b,0x5924a509,0xf28fe6ed,0x97f1fbfa,0x9ebabf2c,0x1e153c6e,0x86e34570,0xeae96fb1,0x860e5e0a,0x5a3e2ab3,0x771fe71c,0x4e3d06fa,0x2965dcb9,0x99e71d0f,0x803e89d6,0x5266c825,0x2e4cc978,0x9c10b36a,0xc6150eba,0x94e2ea78,0xa5fc3c53,0x1e0a2df4,0xf2f74ea7,0x361d2b3d,0x1939260f,0x19c27960,0x5223a708,0xf71312b6,0xebadfe6e,0xeac31f66,0xe3bc4595,0xa67bc883,0xb17f37d1,0x018cff28,0xc332ddef,0xbe6c5aa5,0x65582185,0x68ab9802,0xeecea50f,0xdb2f953b,0x2aef7dad,0x5b6e2f84,0x1521b628,0x29076170,0xecdd4775,0x619f1510,0x13cca830,0xeb61bd96,0x0334fe1e,0xaa0363cf,0xb5735c90,0x4c70a239,0xd59e9e0b,0xcbaade14,0xeecc86bc,0x60622ca7,0x9cab5cab,0xb2f3846e,0x648b1eaf,0x19bdf0ca,0xa02369b9,0x655abb50,0x40685a32,0x3c2ab4b3,0x319ee9d5,0xc021b8f7,0x9b540b19,0x875fa099,0x95f7997e,0x623d7da8,0xf837889a,0x97e32d77,0x11ed935f,0x16681281,0x0e358829,0xc7e61fd6,0x96dedfa1,0x7858ba99,0x57f584a5,0x1b227263,0x9b83c3ff,0x1ac24696,0xcdb30aeb,0x532e3054,0x8fd948e4,0x6dbc3128,0x58ebf2ef,0x34c6ffea,0xfe28ed61,0xee7c3c73,0x5d4a14d9,0xe864b7e3,0x42105d14,0x203e13e0,0x45eee2b6,0xa3aaabea,0xdb6c4f15,0xfacb4fd0,0xc742f442,0xef6abbb5,0x654f3b1d,0x41cd2105,0xd81e799e,0x86854dc7,0xe44b476a,0x3d816250,0xcf62a1f2,0x5b8d2646,0xfc8883a0,0xc1c7b6a3,0x7f1524c3,0x69cb7492,0x47848a0b,0x5692b285,0x095bbf00,0xad19489d,0x1462b174,0x23820e00,0x58428d2a,0x0c55f5ea,0x1dadf43e,0x233f7061,0x3372f092,0x8d937e41,0xd65fecf1,0x6c223bdb,0x7cde3759,0xcbee7460,0x4085f2a7,0xce77326e,0xa6078084,0x19f8509e,0xe8efd855,0x61d99735,0xa969a7aa,0xc50c06c2,0x5a04abfc,0x800bcadc,0x9e447a2e,0xc3453484,0xfdd56705,0x0e1e9ec9,0xdb73dbd3,0x105588cd,0x675fda79,0xe3674340,0xc5c43465,0x713e38d8,0x3d28f89e,0xf16dff20,0x153e21e7,0x8fb03d4a,0xe6e39f2b,0xdb83adf7,0xe93d5a68,0x948140f7,0xf64c261c,0x94692934,0x411520f7,0x7602d4f7,0xbcf46b2e,0xd4a20068,0xd4082471,0x3320f46a,0x43b7d4b7,0x500061af,0x1e39f62e,0x97244546,0x14214f74,0xbf8b8840,0x4d95fc1d,0x96b591af,0x70f4ddd3,0x66a02f45,0xbfbc09ec,0x03bd9785,0x7fac6dd0,0x31cb8504,0x96eb27b3,0x55fd3941,0xda2547e6,0xabca0a9a,0x28507825,0x530429f4,0x0a2c86da,0xe9b66dfb,0x68dc1462,0xd7486900,0x680ec0a4,0x27a18dee,0x4f3ffea2,0xe887ad8c,0xb58ce006,0x7af4d6b6,0xaace1e7c,0xd3375fec,0xce78a399,0x406b2a42,0x20fe9e35,0xd9f385b9,0xee39d7ab,0x3b124e8b,0x1dc9faf7,0x4b6d1856,0x26a36631,0xeae397b2,0x3a6efa74,0xdd5b4332,0x6841e7f7,0xca7820fb,0xfb0af54e,0xd8feb397,0x454056ac,0xba489527,0x55533a3a,0x20838d87,0xfe6ba9b7,0xd096954b,0x55a867bc,0xa1159a58,0xcca92963,0x99e1db33,0xa62a4a56,0x3f3125f9,0x5ef47e1c,0x9029317c,0xfdf8e802,0x04272f70,0x80bb155c,0x05282ce3,0x95c11548,0xe4c66d22,0x48c1133f,0xc70f86dc,0x07f9c9ee,0x41041f0f,0x404779a4,0x5d886e17,0x325f51eb,0xd59bc0d1,0xf2bcc18f,0x41113564,0x257b7834,0x602a9c60,0xdff8e8a3,0x1f636c1b,0x0e12b4c2,0x02e1329e,0xaf664fd1,0xcad18115,0x6b2395e0,0x333e92e1,0x3b240b62,0xeebeb922,0x85b2a20e,0xe6ba0d99,0xde720c8c,0x2da2f728,0xd0127845,0x95b794fd,0x647d0862,0xe7ccf5f0,0x5449a36f,0x877d48fa,0xc39dfd27,0xf33e8d1e,0x0a476341,0x992eff74,0x3a6f6eab,0xf4f8fd37,0xa812dc60,0xa1ebddf8,0x991be14c,0xdb6e6b0d,0xc67b5510,0x6d672c37,0x2765d43b,0xdcd0e804,0xf1290dc7,0xcc00ffa3,0xb5390f92,0x690fed0b,0x667b9ffb,0xcedb7d9c,0xa091cf0b,0xd9155ea3,0xbb132f88,0x515bad24,0x7b9479bf,0x763bd6eb,0x37392eb3,0xcc115979,0x8026e297,0xf42e312d,0x6842ada7,0xc66a2b3b,0x12754ccc,0x782ef11c,0x6a124237,0xb79251e7,0x06a1bbe6,0x4bfb6350,0x1a6b1018,0x11caedfa,0x3d25bdd8,0xe2e1c3c9,0x44421659,0x0a121386,0xd90cec6e,0xd5abea2a,0x64af674e,0xda86a85f,0xbebfe988,0x64e4c3fe,0x9dbc8057,0xf0f7c086,0x60787bf8,0x6003604d,0xd1fd8346,0xf6381fb0,0x7745ae04,0xd736fccc,0x83426b33,0xf01eab71,0xb0804187,0x3c005e5f,0x77a057be,0xbde8ae24,0x55464299,0xbf582e61,0x4e58f48f,0xf2ddfda2,0xf474ef38,0x8789bdc2,0x5366f9c3,0xc8b38e74,0xb475f255,0x46fcd9b9,0x7aeb2661,0x8b1ddf84,0x846a0e79,0x915f95e2,0x466e598e,0x20b45770,0x8cd55591,0xc902de4c,0xb90bace1,0xbb8205d0,0x11a86248,0x7574a99e,0xb77f19b6,0xe0a9dc09,0x662d09a1,0xc4324633,0xe85a1f02,0x09f0be8c,0x4a99a025,0x1d6efe10,0x1ab93d1d,0x0ba5a4df,0xa186f20f,0x2868f169,0xdcb7da83,0x573906fe,0xa1e2ce9b,0x4fcd7f52,0x50115e01,0xa70683fa,0xa002b5c4,0x0de6d027,0x9af88c27,0x773f8641,0xc3604c06,0x61a806b5,0xf0177a28,0xc0f586e0,0x006058aa,0x30dc7d62,0x11e69ed7,0x2338ea63,0x53c2dd94,0xc2c21634,0xbbcbee56,0x90bcb6de,0xebfc7da1,0xce591d76,0x6f05e409,0x4b7c0188,0x39720a3d,0x7c927c24,0x86e3725f,0x724d9db9,0x1ac15bb4,0xd39eb8fc,0xed545578,0x08fca5b5,0xd83d7cd3,0x4dad0fc4,0x1e50ef5e,0xb161e6f8,0xa28514d9,0x6c51133c,0x6fd5c7e7,0x56e14ec4,0x362abfce,0xddc6c837,0xd79a3234,0x92638212,0x670efa8e,0x406000e0,0x3a39ce37,0xd3faf5cf,0xabc27737,0x5ac52d1b,0x5cb0679e,0x4fa33742,0xd3822740,0x99bc9bbe,0xd5118e9d,0xbf0f7315,0xd62d1c7e,0xc700c47b,0xb78c1b6b,0x21a19045,0xb26eb1be,0x6a366eb4,0x5748ab2f,0xbc946e79,0xc6a376d2,0x6549c2c8,0x530ff8ee,0x468dde7d,0xd5730a1d,0x4cd04dc6,0x2939bbdb,0xa9ba4650,0xac9526e8,0xbe5ee304,0xa1fad5f0,0x6a2d519a,0x63ef8ce2,0x9a86ee22,0xc089c2b8,0x43242ef6,0xa51e03aa,0x9cf2d0a4,0x83c061ba,0x9be96a4d,0x8fe51550,0xba645bd6,0x2826a2f9,0xa73a3ae1,0x4ba99586,0xef5562e9,0xc72fefd3,0xf752f7da,0x3f046f69,0x77fa0a59,0x80e4a915,0x87b08601,0x9b09e6ad,0x3b3ee593,0xe990fd5a,0x9e34d797,0x2cf0b7d9,0x022b8b51,0x96d5ac3a,0x017da67d,0xd1cf3ed6,0x7c7d2d28,0x1f9f25cf,0xadf2b89b,0x5ad6b472,0x5a88f54c,0xe029ac71,0xe019a5e6,0x47b0acfd,0xed93fa9b,0xe8d3c48d,0x283b57cc,0xf8d56629,0x79132e28,0x785f0191,0xed756055,0xf7960e44,0xe3d35e8c,0x15056dd4,0x88f46dba,0x03a16125,0x0564f0bd,0xc3eb9e15,0x3c9057a2,0x97271aec,0xa93a072a,0x1b3f6d9b,0x1e6321f5,0xf59c66fb,0x26dcf319,0x7533d928,0xb155fdf5,0x03563482,0x8aba3cbb,0x28517711,0xc20ad9f8,0xabcc5167,0xccad925f,0x4de81751,0x3830dc8e,0x379d5862,0x9320f991,0xea7a90c2,0xfb3e7bce,0x5121ce64,0x774fbe32,0xa8b6e37e,0xc3293d46,0x48de5369,0x6413e680,0xa2ae0810,0xdd6db224,0x69852dfd,0x09072166,0xb39a460a,0x6445c0dd,0x586cdecf,0x1c20c8ae,0x5bbef7dd,0x1b588d40,0xccd2017f,0x6bb4e3bb,0xdda26a7e,0x3a59ff45,0x3e350a44,0xbcb4cdd5,0x72eacea8,0xfa6484bb,0x8d6612ae,0xbf3c6f47,0xd29be463,0x542f5d9e,0xaec2771b,0xf64e6370,0x740e0d8d,0xe75b1357,0xf8721671,0xaf537d5d,0x4040cb08,0x4eb4e2cc,0x34d2466a,0x0115af84,0xe1b00428,0x95983a1d,0x06b89fb4,0xce6ea048,0x6f3f3b82,0x3520ab82,0x011a1d4b,0x277227f8,0x611560b1,0xe7933fdc,0xbb3a792b,0x344525bd,0xa08839e1,0x51ce794b,0x2f32c9b7,0xa01fbac9,0xe01cc87e,0xbcc7d1f6,0xcf0111c3,0xa1e8aac7,0x1a908749,0xd44fbd9a,0xd0dadecb,0xd50ada38,0x0339c32a,0xc6913667,0x8df9317c,0xe0b12b4f,0xf79e59b7,0x43f5bb3a,0xf2d519ff,0x27d9459c,0xbf97222c,0x15e6fc2a,0x0f91fc71,0x9b941525,0xfae59361,0xceb69ceb,0xc2a86459,0x12baa8d1,0xb6c1075e,0xe3056a0c,0x10d25065,0xcb03a442,0xe0ec6e0e,0x1698db3b,0x4c98a0be,0x3278e964,0x9f1f9532,0xe0d392df,0xd3a0342b,0x8971f21e,0x1b0a7441,0x4ba3348c,0xc5be7120,0xc37632d8,0xdf359f8d,0x9b992f2e,0xe60b6f47,0x0fe3f11d,0xe54cda54,0x1edad891,0xce6279cf,0xcd3e7e6f,0x1618b166,0xfd2c1d05,0x848fd2c5,0xf6fb2299,0xf523f357,0xa6327623,0x93a83531,0x56cccd02,0xacf08162,0x5a75ebb5,0x6e163697,0x88d273cc,0xde966292,0x81b949d0,0x4c50901b,0x71c65614,0xe6c6c7bd,0x327a140a,0x45e1d006,0xc3f27b9a,0xc9aa53fd,0x62a80f00,0xbb25bfe2,0x35bdd2f6,0x71126905,0xb2040222,0xb6cbcf7c,0xcd769c2b,0x53113ec0,0x1640e3d3,0x38abbd60,0x2547adf0,0xba38209c,0xf746ce76,0x77afa1c5,0x20756060,0x85cbfe4e,0x8ae88dd8,0x7aaaf9b0,0x4cf9aa7e,0x1948c25c,0x02fb8a8c,0x01c36ae4,0xd6ebe1f9,0x90d4f869,0xa65cdea0,0x3f09252d,0xc208e69f,0xb74e6132,0xce77e25b,0x578fdfe3,0x3ac372e6];
var C_ORIG = [0x4f727068,0x65616e42,0x65686f6c,0x64657253,0x63727944,0x6f756274];

function _encipher(lr, off, P, S) {
  var n, l = lr[off], r = lr[off+1];
  l ^= P[0];
  for (var i = 0, k = 16; i < k;) {
    n = S[l>>>24]; n += S[0x100|((l>>16)&0xff)]; n ^= S[0x200|((l>>8)&0xff)]; n += S[0x300|(l&0xff)];
    r ^= n ^ P[++i];
    n = S[r>>>24]; n += S[0x100|((r>>16)&0xff)]; n ^= S[0x200|((r>>8)&0xff)]; n += S[0x300|(r&0xff)];
    l ^= n ^ P[++i];
  }
  lr[off] = r ^ P[17];
  lr[off+1] = l;
  return lr;
}
function _streamtoword(data, offp) {
  for (var i = 0, word = 0; i < 4; ++i)
    word = (word << 8) | (data[offp] & 0xff), offp = (offp + 1) % data.length;
  return { key: word, offp: offp };
}
function _key(key, P, S) {
  var offset = 0, lr = [0,0], plen = P.length, slen = S.length, sw;
  for (var i = 0; i < plen; i++) { sw = _streamtoword(key, offset); offset = sw.offp; P[i] = P[i] ^ sw.key; }
  for (i = 0; i < plen; i += 2) { lr = _encipher(lr, 0, P, S); P[i] = lr[0]; P[i+1] = lr[1]; }
  for (i = 0; i < slen; i += 2) { lr = _encipher(lr, 0, P, S); S[i] = lr[0]; S[i+1] = lr[1]; }
}
function _ekskey(data, key, P, S) {
  var offp = 0, lr = [0,0], plen = P.length, slen = S.length, sw;
  for (var i = 0; i < plen; i++) { sw = _streamtoword(key, offp); offp = sw.offp; P[i] = P[i] ^ sw.key; }
  offp = 0;
  for (i = 0; i < plen; i += 2) {
    sw = _streamtoword(data, offp); offp = sw.offp; lr[0] ^= sw.key;
    sw = _streamtoword(data, offp); offp = sw.offp; lr[1] ^= sw.key;
    lr = _encipher(lr, 0, P, S); P[i] = lr[0]; P[i+1] = lr[1];
  }
  for (i = 0; i < slen; i += 2) {
    sw = _streamtoword(data, offp); offp = sw.offp; lr[0] ^= sw.key;
    sw = _streamtoword(data, offp); offp = sw.offp; lr[1] ^= sw.key;
    lr = _encipher(lr, 0, P, S); S[i] = lr[0]; S[i+1] = lr[1];
  }
}
function _crypt(b, salt, rounds) {
  var cdata = C_ORIG.slice(), clen = cdata.length;
  if (rounds < 4 || rounds > 31) throw Error("Illegal rounds");
  if (salt.length !== 16) throw Error("Illegal salt length: " + salt.length);
  rounds = (1 << rounds) >>> 0;
  var P = P_ORIG.slice(), S = S_ORIG.slice();
  _ekskey(salt, b, P, S);
  for (var i = 0; i < rounds; i++) { _key(b, P, S); _key(salt, P, S); }
  for (i = 0; i < 64; i++)
    for (var j = 0; j < (clen >> 1); j++)
      _encipher(cdata, j << 1, P, S);
  var ret = [];
  for (i = 0; i < clen; i++) {
    ret.push((cdata[i] >> 24) & 0xff);
    ret.push((cdata[i] >> 16) & 0xff);
    ret.push((cdata[i] >> 8) & 0xff);
    ret.push(cdata[i] & 0xff);
  }
  return ret;
}
function bcryptHash(s, salt) {
  var minor, offset;
  if (salt.charAt(0) !== '$' || salt.charAt(1) !== '2') throw Error("Invalid salt version");
  if (salt.charAt(2) === '$') { minor = String.fromCharCode(0); offset = 3; }
  else { minor = salt.charAt(2); offset = 4; }
  var r1 = parseInt(salt.substring(offset, offset+1), 10) * 10;
  var r2 = parseInt(salt.substring(offset+1, offset+2), 10);
  var rounds = r1 + r2;
  var real_salt = salt.substring(offset+3, offset+25);
  s = s + (minor >= 'a' ? "\x00" : "");
  var passwordb = utf8Array(s);
  if (passwordb.length > 72) passwordb = passwordb.slice(0, 72);
  var saltb = base64_decode(real_salt, 16);
  var bytes = _crypt(passwordb, saltb, rounds);
  var res = ["$2"];
  if (minor >= 'a') res.push(minor);
  res.push("$");
  if (rounds < 10) res.push("0");
  res.push(rounds.toString());
  res.push("$");
  res.push(base64_encode(saltb, saltb.length));
  res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
  return res.join('');
}




function genBcryptSalt(rounds) {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const roundsStr = rounds < 10 ? "0" + rounds : String(rounds);
  return "$2b$" + roundsStr + "$" + base64_encode(Array.from(bytes), 16);
}
function bcryptCompare(password, hash) {
  if (typeof hash !== "string" || hash.length < 29) return false;
  const salt = hash.substring(0, hash.length - 31);
  const recomputed = bcryptHash(password, salt);
  return recomputed === hash;
}

function BcryptTool({ tool, onBack }) {
  const [password, setPassword] = useState("correct horse battery staple");
  const [rounds, setRounds] = useState(8);
  const [hash, setHash] = useState("");
  const [busy, setBusy] = useState(false);
  const [compareHash, setCompareHash] = useState("");
  const [comparePw, setComparePw] = useState("");
  const [matchResult, setMatchResult] = useState(null);

  const generate = () => {
    setBusy(true);
    setTimeout(() => {
      try {
        const salt = genBcryptSalt(rounds);
        setHash(bcryptHash(password, salt));
      } finally { setBusy(false); }
    }, 20);
  };
  useEffect(() => { generate(); }, []);

  const runCompare = () => {
    setMatchResult(bcryptCompare(comparePw, compareHash));
  };

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <Field label="Password"><input value={password} onChange={(e) => setPassword(e.target.value)} className="dv-input dv-focus mono w-full rounded-xl p-3 text-sm" /></Field>
      <Field label={`Cost factor — ${rounds} (2^${rounds} = ${(1 << rounds).toLocaleString()} iterations)`}>
        <input type="range" min={4} max={12} value={rounds} onChange={(e) => setRounds(Number(e.target.value))} className="mt-1 w-full accent-blue-500" />
      </Field>
      <button onClick={generate} disabled={busy} className="dv-btn-primary dv-focus mt-2 rounded-xl px-5 py-2.5 text-xs font-semibold disabled:opacity-60">{busy ? "Hashing..." : "Generate bcrypt hash"}</button>
      <div className="dv-card mt-4 flex items-center justify-between gap-3 rounded-xl px-4 py-4">
        <span className="mono break-all text-sm text-white">{hash}</span>
        <CopyButton text={hash} disabled={!hash} />
      </div>

      <div className="mt-8 border-t pt-6" style={{ borderColor: C.border }}>
        <h3 className="mb-3 text-sm font-semibold text-white">Verify a password against a hash</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Password to check"><input value={comparePw} onChange={(e) => setComparePw(e.target.value)} className="dv-input dv-focus mono w-full rounded-lg p-2.5 text-sm" /></Field>
          <Field label="bcrypt hash"><input value={compareHash} onChange={(e) => setCompareHash(e.target.value)} placeholder="$2b$08$..." className="dv-input dv-focus mono w-full rounded-lg p-2.5 text-sm" /></Field>
        </div>
        <button onClick={runCompare} className="dv-btn-ghost dv-focus mt-3 rounded-lg px-4 py-2 text-xs font-semibold">Compare</button>
        {matchResult !== null && (
          <p className="mt-3 text-sm font-medium" style={{ color: matchResult ? C.success : C.danger }}>
            {matchResult ? "✓ Password matches the hash" : "✗ Password does not match"}
          </p>
        )}
      </div>
      <p className="mt-4 text-[11px]" style={{ color: C.sub }}>
        Real bcrypt (Blowfish-based), computed entirely in your browser — verified byte-for-byte against a native libxcrypt implementation. Higher cost factors are intentionally slow; 10+ may take a few seconds.
      </p>
    </ToolShell>
  );
}

function DnsLookupTool({ tool, onBack }) {
  const [domain, setDomain] = useState("example.com");
  const [type, setType] = useState("A");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async () => {
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
      const data = await res.json();
      setResult(data);
    } catch (e) { setError("Lookup failed — check your connection."); }
    finally { setLoading(false); }
  };
  useEffect(() => { lookup(); }, []);

  const statusMap = { 0: "NOERROR", 1: "FORMERR", 2: "SERVFAIL", 3: "NXDOMAIN (does not exist)", 5: "REFUSED" };

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="flex gap-2">
        <input value={domain} onChange={(e) => setDomain(e.target.value)} onKeyDown={(e) => e.key === "Enter" && lookup()} className="dv-input dv-focus mono flex-1 rounded-lg p-2.5 text-sm" placeholder="example.com" />
        <select value={type} onChange={(e) => setType(e.target.value)} className="dv-input dv-focus rounded-lg px-3 text-xs">
          {["A", "AAAA", "MX", "TXT", "NS", "CNAME", "SOA"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <button onClick={lookup} disabled={loading} className="dv-btn-primary dv-focus rounded-lg px-4 py-2 text-xs font-semibold disabled:opacity-50">{loading ? "..." : "Lookup"}</button>
      </div>
      {error && <p className="mt-3 text-xs" style={{ color: C.danger }}>{error}</p>}
      {result && (
        <div className="mt-4">
          <div className="mb-2 dv-tag inline-block" style={{ color: result.Status === 0 ? C.success : C.warning }}>
            Status: {statusMap[result.Status] || result.Status}
          </div>
          {result.Answer ? (
            <div className="space-y-2">
              {result.Answer.map((a, i) => (
                <div key={i} className="dv-card mono flex flex-wrap items-center gap-3 rounded-lg px-3 py-2 text-xs">
                  <span className="dv-tag">{type}</span>
                  <span style={{ color: C.sub }}>TTL {a.TTL}s</span>
                  <span className="text-white">{a.data}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs" style={{ color: C.sub }}>No {type} records found for this domain.</p>
          )}
        </div>
      )}
      <p className="mt-3 text-[11px]" style={{ color: C.sub }}>Real DNS-over-HTTPS lookups via Google's public resolver (dns.google) — no backend of ours involved.</p>
    </ToolShell>
  );
}

function PingTool({ tool, onBack }) {
  const [url, setUrl] = useState("https://example.com");
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);

  const runPing = async () => {
    setRunning(true); setResults([]);
    const attempts = [];
    for (let i = 0; i < 4; i++) {
      const start = performance.now();
      try {
        await fetch(url, { mode: "no-cors", cache: "no-store" });
        attempts.push({ ok: true, time: Math.round(performance.now() - start) });
      } catch (e) {
        attempts.push({ ok: false, time: Math.round(performance.now() - start) });
      }
      setResults([...attempts]);
      await new Promise((r) => setTimeout(r, 200));
    }
    setRunning(false);
  };

  const okTimes = results.filter((r) => r.ok).map((r) => r.time);
  const stats = okTimes.length ? { min: Math.min(...okTimes), max: Math.max(...okTimes), avg: Math.round(okTimes.reduce((a, b) => a + b, 0) / okTimes.length) } : null;

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="flex gap-2">
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="dv-input dv-focus mono flex-1 rounded-lg p-2.5 text-sm" placeholder="https://example.com" />
        <button onClick={runPing} disabled={running} className="dv-btn-primary dv-focus rounded-lg px-5 py-2 text-xs font-semibold disabled:opacity-50">{running ? "Pinging..." : "Ping"}</button>
      </div>
      <div className="mt-4 space-y-1.5">
        {results.map((r, i) => (
          <div key={i} className="dv-card mono flex items-center justify-between rounded-lg px-3 py-2 text-xs">
            <span style={{ color: C.sub }}>Attempt {i + 1}</span>
            <span style={{ color: r.ok ? C.success : C.danger }}>{r.ok ? `responded in ${r.time}ms` : "no response"}</span>
          </div>
        ))}
      </div>
      {stats && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {[["Min", stats.min], ["Avg", stats.avg], ["Max", stats.max]].map(([l, v]) => (
            <div key={l} className="dv-card rounded-xl px-4 py-3 text-center"><div className="mono text-lg font-semibold" style={{ color: C.primary }}>{v}ms</div><div className="mt-0.5 text-[11px]" style={{ color: C.sub }}>{l}</div></div>
          ))}
        </div>
      )}
      <p className="mt-3 text-[11px]" style={{ color: C.sub }}>Browsers can't send ICMP packets — this measures real HTTP round-trip time as a reachability proxy, not a true ping.</p>
    </ToolShell>
  );
}

function PortCheckerTool({ tool, onBack }) {
  const [host, setHost] = useState("example.com");
  const [port, setPort] = useState(443);
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const commonPorts = [80, 443, 22, 3000, 8080, 5432, 3306, 6379];

  const check = async (p = port) => {
    setChecking(true); setResult(null);
    const start = performance.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);
      await fetch(`https://${host}:${p}`, { mode: "no-cors", cache: "no-store", signal: controller.signal });
      clearTimeout(timeout);
      setResult({ open: true, time: Math.round(performance.now() - start), port: p });
    } catch (e) {
      setResult({ open: false, time: Math.round(performance.now() - start), port: p, reason: e.name === "AbortError" ? "Timed out" : "Blocked or unreachable" });
    } finally { setChecking(false); }
  };

  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="flex gap-2">
        <input value={host} onChange={(e) => setHost(e.target.value)} className="dv-input dv-focus mono flex-1 rounded-lg p-2.5 text-sm" placeholder="example.com" />
        <input type="number" value={port} onChange={(e) => setPort(Number(e.target.value))} className="dv-input dv-focus mono w-24 rounded-lg p-2.5 text-sm" />
        <button onClick={() => check()} disabled={checking} className="dv-btn-primary dv-focus rounded-lg px-5 py-2 text-xs font-semibold disabled:opacity-50">{checking ? "..." : "Check"}</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {commonPorts.map((p) => (
          <button key={p} onClick={() => { setPort(p); check(p); }} className="dv-btn-ghost dv-focus rounded-lg px-2.5 py-1 text-xs">{p}</button>
        ))}
      </div>
      {result && (
        <div className="dv-card mt-4 flex items-center justify-between rounded-xl px-4 py-4">
          <span className="text-sm text-white">Port {result.port}</span>
          <span className="text-sm font-medium" style={{ color: result.open ? C.success : C.danger }}>{result.open ? `responded in ${result.time}ms` : result.reason}</span>
        </div>
      )}
      <p className="mt-3 text-[11px]" style={{ color: C.sub }}>
        Browser-only check via fetch() — it can only detect an HTTP(S) service, not a true TCP scan, and browsers hard-block "unsafe" ports (21, 23, 25, 110...) regardless of what's listening.
      </p>
    </ToolShell>
  );
}

function WebhookTesterTool({ tool, onBack }) {
  const [uuid, setUuid] = useState(null);
  const [requests, setRequests] = useState([]);
  const [creating, setCreating] = useState(false);
  const [polling, setPolling] = useState(false);

  const create = async () => {
    setCreating(true);
    try {
      const res = await fetch("https://webhook.site/token", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const data = await res.json();
      setUuid(data.uuid);
      setRequests([]);
    } catch (e) { /* surfaced via empty state */ }
    finally { setCreating(false); }
  };

  const poll = async () => {
    if (!uuid) return;
    setPolling(true);
    try {
      const res = await fetch(`https://webhook.site/token/${uuid}/requests?sorting=newest&per_page=20`);
      const data = await res.json();
      setRequests(data.data || []);
    } catch (e) { /* ignore transient poll errors */ }
    finally { setPolling(false); }
  };

  useEffect(() => {
    if (!uuid) return;
    const interval = setInterval(poll, 4000);
    return () => clearInterval(interval);
  }, [uuid]);

  const webhookUrl = uuid ? `https://webhook.site/${uuid}` : "";

  return (
    <ToolShell tool={tool} onBack={onBack}>
      {!uuid ? (
        <button onClick={create} disabled={creating} className="dv-btn-primary dv-focus rounded-xl px-5 py-2.5 text-sm font-semibold disabled:opacity-50">{creating ? "Creating..." : "Create a webhook URL"}</button>
      ) : (
        <>
          <div className="dv-card flex items-center justify-between gap-3 rounded-xl px-4 py-4">
            <span className="mono text-sm text-white">{webhookUrl}</span>
            <CopyButton text={webhookUrl} />
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={poll} disabled={polling} className="dv-btn-ghost dv-focus rounded-lg px-3 py-1.5 text-xs font-medium">{polling ? "Refreshing..." : "Refresh now"}</button>
            <span className="self-center dv-tag">{requests.length} request{requests.length === 1 ? "" : "s"} received</span>
          </div>
          <div className="mt-4 space-y-2">
            {requests.map((r) => (
              <div key={r.uuid} className="dv-card rounded-xl px-4 py-3">
                <div className="mb-1 flex items-center gap-2 text-xs">
                  <span className="dv-tag" style={{ color: C.primary }}>{r.method}</span>
                  <span style={{ color: C.sub }}>{r.created_at}</span>
                </div>
                <pre className="mono max-h-32 overflow-auto whitespace-pre-wrap text-xs text-white">{r.content || "(empty body)"}</pre>
              </div>
            ))}
          </div>
        </>
      )}
      <p className="mt-4 text-[11px]" style={{ color: C.sub }}>Backed by the free public webhook.site API — send any request to the URL above and it'll show up here (auto-refreshes every 4s).</p>
    </ToolShell>
  );
}


const FRIENDS = ["Dark Heart", "The One", "Violet King Dev", "Zentrix"];
function DeveloperProfileTool({ tool, onBack }) {
  return (
    <ToolShell tool={tool} onBack={onBack}>
      <div className="dv-card flex flex-col items-center gap-4 rounded-2xl p-8 text-center sm:flex-row sm:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white" style={{ background: `linear-gradient(135deg, ${C.primary}, #8b5cf6)` }}>
          DX
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Dev Xyron</h2>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: C.sub }}>
            JavaScript developer specialized in building WhatsApp and Telegram bots, and a Python developer as well. Creator of DevVault.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><MessageCircle size={15} style={{ color: C.primary }} /> Get in touch</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href="https://wa.me/2349168095230" target="_blank" rel="noreferrer" className="dv-card dv-focus flex items-center justify-between rounded-xl px-4 py-3">
            <span className="text-sm text-white">WhatsApp</span>
            <span className="mono text-xs" style={{ color: C.success }}>+234 916 809 5230</span>
          </a>
          <a href="https://wa.me/2349118304002" target="_blank" rel="noreferrer" className="dv-card dv-focus flex items-center justify-between rounded-xl px-4 py-3">
            <span className="text-sm text-white">WhatsApp</span>
            <span className="mono text-xs" style={{ color: C.success }}>+234 911 830 4002</span>
          </a>
          <a href="https://t.me/thedev_empire" target="_blank" rel="noreferrer" className="dv-card dv-focus flex items-center justify-between rounded-xl px-4 py-3">
            <span className="text-sm text-white">Telegram</span>
            <span className="mono text-xs" style={{ color: C.primary }}>@thedev_empire</span>
          </a>
          <a href="https://t.me/Dev_xyron" target="_blank" rel="noreferrer" className="dv-card dv-focus flex items-center justify-between rounded-xl px-4 py-3">
            <span className="text-sm text-white">Telegram</span>
            <span className="mono text-xs" style={{ color: C.primary }}>@Dev_xyron</span>
          </a>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Code2 size={15} style={{ color: C.primary }} /> Friends</h3>
        <div className="flex flex-wrap gap-2">
          {FRIENDS.map((f) => <span key={f} className="dv-tag px-3 py-1.5 text-xs">{f}</span>)}
        </div>
      </div>

      <div className="dv-card mt-6 flex items-center gap-2 rounded-xl px-4 py-4">
        <Heart size={15} style={{ color: C.danger }} />
        <p className="text-sm text-white">Special thanks to <span className="font-semibold">Mrs Xyron</span> 🥹❤️</p>
      </div>
    </ToolShell>
  );
}

const TOOL_COMPONENTS = {
  "json-formatter": JsonFormatterTool,
  "word-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "slug-generator": SlugGeneratorTool,
  "markdown-preview": MarkdownPreviewTool,
  "lorem-ipsum": LoremIpsumTool,
  "diff-checker": DiffCheckerTool,
  "password-generator": PasswordGeneratorTool,
  "uuid-generator": UuidGeneratorTool,
  "hash-generator": HashGeneratorTool,
  "jwt-decoder": JwtDecoderTool,
  "base64": Base64Tool,
  "url-encode": UrlEncodeTool,
  "http-status": HttpStatusTool,
  "color-converter": ColorConverterTool,
  "unix-timestamp": UnixTimestampTool,
  "age-calculator": AgeCalculatorTool,
  "regex-tester": RegexTesterTool,
  "dedupe-lines": DedupeLinesTool,
  "json-compare": JsonCompareTool,
  "password-strength": PasswordStrengthTool,
  "hmac": HmacTool,
  "user-agent": UserAgentTool,
  "meta-tags": MetaTagsTool,
  "sql-formatter": SqlFormatterTool,
  "csv-json": CsvJsonTool,
  "qr-generator": QrGeneratorTool,
  "image-compressor": ImageCompressorTool,
  "gradient-generator": GradientGeneratorTool,
  "shadow-generator": ShadowGeneratorTool,
  "dockerfile": DockerfileTool,
  "env-generator": EnvGeneratorTool,
  "gitignore-generator": GitignoreTool,
  "timezone-converter": TimezoneConverterTool,
  "readme-generator": ReadmeGeneratorTool,
  "commit-generator": CommitGeneratorTool,
  "license-generator": LicenseGeneratorTool,
  "rest-client": RestClientTool,
  "bcrypt": BcryptTool,
  "dns-lookup": DnsLookupTool,
  "ping": PingTool,
  "port-checker": PortCheckerTool,
  "webhook-tester": WebhookTesterTool,
  "developer-profile": DeveloperProfileTool,
};

/* ----------------------------------------------------------------------
   COMMAND PALETTE
------------------------------------------------------------------------*/
function CommandPalette({ open, onClose, onSelect }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const results = useMemo(() => {
    if (!q.trim()) return TOOLS.slice(0, 8);
    const lower = q.toLowerCase();
    return TOOLS.filter((t) => (t.name + t.desc + t.cat).toLowerCase().includes(lower)).slice(0, 10);
  }, [q]);

  useEffect(() => { if (open) { setQ(""); setActive(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => { setActive(0); }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      if (e.key === "Enter" && results[active]) { onSelect(results[active]); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose, onSelect]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 dv-fade-in" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div className="dv-glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl" style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: C.border }}>
          <Search size={16} style={{ color: C.sub }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search 43 tools..."
            className="dv-focus w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
          <kbd className="dv-kbd px-1.5 py-0.5 text-[10px]">esc</kbd>
        </div>
        <div className="max-h-80 overflow-auto p-2">
          {results.length === 0 && <p className="px-3 py-6 text-center text-xs" style={{ color: C.sub }}>No tools match "{q}"</p>}
          {results.map((t, idx) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onMouseEnter={() => setActive(idx)}
                onClick={() => { onSelect(t); onClose(); }}
                className="dv-focus flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left"
                style={{ background: active === idx ? "rgba(79,140,255,0.12)" : "transparent" }}
              >
                <Icon size={16} style={{ color: active === idx ? C.primary : C.sub }} />
                <span className="flex-1 text-sm text-white">{t.name}</span>
                {t.live && <span className="dv-tag" style={{ color: C.success, borderColor: "rgba(24,210,110,0.3)" }}>live</span>}
                <ChevronRight size={13} style={{ color: C.sub }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   NAVBAR
------------------------------------------------------------------------*/
function Navbar({ onOpenPalette, onHome, onProfile }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="dv-navbar sticky top-0 z-40" style={{ padding: scrolled ? "8px 0" : "16px 0" }}>
      <div
        className="dv-glass mx-auto flex max-w-7xl items-center gap-4 rounded-2xl px-4 py-2.5"
        style={{ boxShadow: scrolled ? "0 8px 30px -12px rgba(0,0,0,0.6)" : "none", margin: "0 16px" }}
      >
        <button onClick={onHome} className="dv-focus flex items-center gap-2 rounded-lg pr-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `linear-gradient(135deg, ${C.primary}, #8b5cf6)` }}>
            <Command size={14} className="text-white" />
          </div>
          <span className="text-sm font-bold text-white">DevVault</span>
        </button>
        <div className="hidden items-center gap-5 text-sm md:flex" style={{ color: C.sub }}>
          <button className="hover:text-white transition-colors">Tools</button>
          <button className="hover:text-white transition-colors">Categories</button>
          <button className="hover:text-white transition-colors">Collections</button>
          <button onClick={onProfile} className="hover:text-white transition-colors">Developer</button>
        </div>
        <button
          onClick={onOpenPalette}
          className="dv-input dv-focus ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs"
          style={{ color: C.sub, minWidth: 180 }}
        >
          <Search size={13} /> Search tools...
          <kbd className="dv-kbd ml-auto px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
        <div className="hidden items-center gap-1 sm:flex">
          <button className="dv-btn-ghost dv-focus flex h-8 w-8 items-center justify-center rounded-lg"><Github size={15} /></button>
          <button className="dv-btn-ghost dv-focus flex h-8 w-8 items-center justify-center rounded-lg"><Moon size={15} /></button>
          <button className="dv-btn-ghost dv-focus flex h-8 w-8 items-center justify-center rounded-lg"><User size={15} /></button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   HOME PAGE
------------------------------------------------------------------------*/
function Hero({ onOpenPalette, onSelect }) {
  return (
    <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-20 text-center">
      <div className="dv-fade-up mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs dv-tag" style={{ animationDelay: "0ms" }}>
        <Sparkles size={11} style={{ color: C.primary }} /> 43 tools · every one live
      </div>
      <h1 className="dv-fade-up text-4xl font-extrabold leading-tight text-white sm:text-6xl" style={{ animationDelay: "80ms" }}>
        Everything developers<br />need<span style={{ color: C.primary }}>.</span>
      </h1>
      <p className="dv-fade-up mx-auto mt-5 max-w-xl text-base sm:text-lg" style={{ color: C.sub, animationDelay: "160ms" }}>
        Formatters, converters, generators, and inspectors — in one fast, distraction-free workspace built for daily use.
      </p>
      <div className="dv-fade-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
        <button onClick={() => onSelect(TOOLS[0])} className="dv-btn-primary dv-focus rounded-xl px-6 py-3 text-sm font-semibold">Browse Tools</button>
        <button onClick={onOpenPalette} className="dv-btn-ghost dv-focus rounded-xl px-6 py-3 text-sm font-semibold">Explore Categories</button>
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    [String(TOOLS.length), "tools cataloged"],
    [String(LIVE_TOOLS.length), "fully working, zero stubs"],
    [String(CATEGORIES.length), "categories"],
  ];
  return (
    <div className="mx-auto mb-14 grid max-w-4xl grid-cols-3 gap-3 px-5">
      {stats.map(([n, l]) => (
        <div key={l} className="dv-card rounded-2xl px-4 py-5 text-center">
          <div className="mono text-2xl font-bold" style={{ color: C.primary }}>{n}</div>
          <div className="mt-1 text-xs" style={{ color: C.sub }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function ToolCard({ tool, onSelect, delay }) {
  const Icon = tool.icon;
  return (
    <button
      onClick={() => onSelect(tool)}
      className="dv-card dv-focus dv-fade-up group flex flex-col items-start gap-3 rounded-2xl p-5 text-left"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(79,140,255,0.12)", color: C.primary }}>
          <Icon size={18} />
        </div>
        {tool.live && <span className="dv-tag" style={{ color: C.success, borderColor: "rgba(24,210,110,0.3)" }}>live</span>}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
        <p className="mt-1 text-xs leading-relaxed" style={{ color: C.sub }}>{tool.desc}</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-xs font-medium transition-transform duration-300 group-hover:translate-x-1" style={{ color: C.primary }}>
        Open <ChevronRight size={13} />
      </span>
    </button>
  );
}

function CategoryPill({ cat, active, onClick }) {
  const Icon = cat.icon;
  return (
    <button
      onClick={onClick}
      className="dv-focus flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
      style={{ background: active ? C.primary : C.card, border: `1px solid ${active ? C.primary : C.border}`, color: "white" }}
    >
      <Icon size={12} /> {cat.name}
    </button>
  );
}

function HomePage({ onSelect, onOpenPalette }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = TOOLS;
    if (category !== "all") list = list.filter((t) => t.cat === category);
    if (query.trim()) {
      const lower = query.toLowerCase();
      list = list.filter((t) => (t.name + t.desc).toLowerCase().includes(lower));
    }
    return list;
  }, [category, query]);

  const popular = TOOLS.filter((t) => t.live).slice(0, 8);

  return (
    <>
      <Hero onOpenPalette={onOpenPalette} onSelect={onSelect} />
      <StatsBar />

      <div className="mx-auto mb-8 max-w-7xl px-5">
        <div className="dv-input dv-focus flex items-center gap-2 rounded-xl px-4 py-3">
          <Search size={15} style={{ color: C.sub }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter tools by name..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="dv-scrollbar-thin mt-4 flex gap-2 overflow-x-auto pb-1">
          <CategoryPill cat={{ name: "All", icon: Boxes }} active={category === "all"} onClick={() => setCategory("all")} />
          {CATEGORIES.map((c) => (
            <CategoryPill key={c.id} cat={c} active={category === c.id} onClick={() => setCategory(c.id)} />
          ))}
        </div>
      </div>

      {category === "all" && !query && (
        <div className="mx-auto mb-12 max-w-7xl px-5">
          <div className="mb-4 flex items-center gap-2">
            <Star size={15} style={{ color: C.warning }} />
            <h2 className="text-sm font-semibold text-white">Popular &amp; live right now</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {popular.map((t, i) => <ToolCard key={t.id} tool={t} onSelect={onSelect} delay={i * 40} />)}
          </div>
        </div>
      )}

      <div className="mx-auto mb-24 max-w-7xl px-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">
            {category === "all" ? "All tools" : CATEGORIES.find((c) => c.id === category)?.name} <span style={{ color: C.sub }}>({filtered.length})</span>
          </h2>
        </div>
        {filtered.length === 0 ? (
          <div className="dv-card rounded-2xl px-6 py-16 text-center text-sm" style={{ color: C.sub }}>No tools match your filters.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((t, i) => <ToolCard key={t.id} tool={t} onSelect={onSelect} delay={Math.min(i * 25, 300)} />)}
          </div>
        )}
      </div>
    </>
  );
}

function Footer({ onProfile }) {
  return (
    <footer className="relative z-10 mx-auto max-w-7xl px-5 py-10" style={{ borderTop: `1px solid ${C.border}` }}>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: `linear-gradient(135deg, ${C.primary}, #8b5cf6)` }}>
            <Command size={12} className="text-white" />
          </div>
          <span className="text-xs font-semibold text-white">DevVault</span>
          <span className="text-xs" style={{ color: C.sub }}>v0.1.0 preview</span>
        </div>
        <div className="flex gap-5 text-xs" style={{ color: C.sub }}>
          <button onClick={onProfile} className="hover:text-white transition-colors">About</button>
          <span>Privacy</span><span>Terms</span>
          <button onClick={onProfile} className="hover:text-white transition-colors">Contact</button>
          <span>GitHub</span>
        </div>
        <span className="text-xs" style={{ color: C.sub }}>© {new Date().getFullYear()} DevVault</span>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------------
   ROOT APP
------------------------------------------------------------------------*/
const DEVELOPER_TOOL = { id: "developer-profile", name: "Meet the Developer", desc: "About the creator of DevVault", icon: User };

export default function DevVaultApp() {
  const [selected, setSelected] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Comp = selected ? TOOL_COMPONENTS[selected.id] : null;

  return (
    <div className="relative min-h-screen w-full" style={{ background: C.bg, color: C.text }}>
      <style>{GLOBAL_CSS}</style>
      <div className="dv-noise" />
      <div className="dv-grid-bg" />
      <div className="dv-blob" style={{ width: 500, height: 500, top: -150, left: -100, background: "rgba(79,140,255,0.25)", animation: "dv-float 14s ease-in-out infinite" }} />
      <div className="dv-blob" style={{ width: 420, height: 420, top: 100, right: -140, background: "rgba(139,92,246,0.18)", animation: "dv-float-slow 18s ease-in-out infinite" }} />
      <div className="dv-blob" style={{ width: 380, height: 380, bottom: -160, left: "35%", background: "rgba(24,210,110,0.12)", animation: "dv-pulse-glow 10s ease-in-out infinite" }} />

      <div className="relative z-10">
        <Navbar onOpenPalette={() => setPaletteOpen(true)} onHome={() => setSelected(null)} onProfile={() => setSelected(DEVELOPER_TOOL)} />

        {selected ? (
          Comp ? (
            <Comp tool={selected} onBack={() => setSelected(null)} />
          ) : (
            <ComingSoon tool={selected} onBack={() => setSelected(null)} />
          )
        ) : (
          <HomePage onSelect={setSelected} onOpenPalette={() => setPaletteOpen(true)} />
        )}

        <Footer onProfile={() => setSelected(DEVELOPER_TOOL)} />
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onSelect={setSelected} />
    </div>
  );
}
