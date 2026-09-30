/**
 * Allow-list HTML sanitiser for articles written in the dashboard editor.
 * No dependencies: every tag is rebuilt from scratch, so only the tags and
 * attributes listed here can ever reach the page.
 */
const ALLOWED: Record<string, string[]> = {
  p: ["style"],
  div: ["style"],
  span: ["style"],
  font: ["face", "size", "color"],
  br: [],
  hr: [],
  b: [],
  strong: [],
  i: [],
  em: [],
  u: [],
  s: [],
  strike: [],
  sub: [],
  sup: [],
  h2: ["style"],
  h3: ["style"],
  h4: ["style"],
  blockquote: ["style"],
  ul: ["style"],
  ol: ["style"],
  li: ["style"],
  a: ["href"],
};

const VOID = new Set(["br", "hr"]);
const STYLE_PROPS = new Set([
  "text-align",
  "font-size",
  "font-family",
  "font-weight",
  "font-style",
  "text-decoration",
  "color",
  "background-color",
]);

function escapeText(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function cleanStyle(value: string): string {
  return value
    .split(";")
    .map((declaration) => {
      const index = declaration.indexOf(":");
      if (index < 0) return "";
      const prop = declaration.slice(0, index).trim().toLowerCase();
      const val = declaration.slice(index + 1).trim();
      if (!STYLE_PROPS.has(prop) || !val) return "";
      if (/url\s*\(|expression|javascript:|[<>"\\]/i.test(val)) return "";
      return prop + ": " + val;
    })
    .filter(Boolean)
    .join("; ");
}

function cleanAttr(name: string, value: string): string {
  const v = value.trim();
  if (name === "style") return cleanStyle(v);
  if (name === "href") return /^(https?:|mailto:|\/|#)/i.test(v) ? v : "";
  if (name === "size") return /^[1-7]$/.test(v) ? v : "";
  if (name === "color") return /^#?[0-9a-z]{1,20}$/i.test(v) ? v : "";
  if (name === "face") return /^[\w ,'-]{1,60}$/.test(v) ? v : "";
  return "";
}

const TAG = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g;
const ATTR = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g;

function rebuildTag(slash: string, rawTag: string, rawAttrs: string): string {
  const tag = rawTag.toLowerCase();
  const allowed = ALLOWED[tag];
  if (!allowed) return "";
  if (slash) return VOID.has(tag) ? "" : "</" + tag + ">";

  const attrs: string[] = [];
  ATTR.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = ATTR.exec(rawAttrs)) !== null) {
    const name = match[1].toLowerCase();
    if (!allowed.includes(name)) continue;
    const value = cleanAttr(name, match[3] ?? match[4] ?? match[5] ?? "");
    if (value) attrs.push(name + '="' + escapeAttr(value) + '"');
  }
  if (tag === "a") attrs.push('rel="noopener noreferrer"');
  return "<" + tag + (attrs.length ? " " + attrs.join(" ") : "") + ">";
}

export function sanitizeHtml(input: string): string {
  const source = input
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed|noscript|template|svg|math|textarea|select)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<[!?][^>]*>/g, "");

  let output = "";
  let last = 0;
  TAG.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TAG.exec(source)) !== null) {
    output += escapeText(source.slice(last, match.index));
    output += rebuildTag(match[1], match[2], match[3]);
    last = match.index + match[0].length;
  }
  output += escapeText(source.slice(last));
  return output;
}

/** True when a stored body was written with the rich editor rather than as plain text. */
export function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][^>]*>/i.test(value);
}
