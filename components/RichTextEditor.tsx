"use client";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { useEffect, useRef } from "react";

const FONTS: [string, string][] = [
  ["Nunito Sans", "Nunito Sans (body)"],
  ["Rubik", "Rubik (headings)"],
  ["Georgia", "Georgia"],
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
];

const SIZES: [string, string][] = [
  ["2", "Small"],
  ["3", "Normal"],
  ["4", "Large"],
  ["5", "Larger"],
  ["6", "Huge"],
];

const BLOCKS: [string, string][] = [
  ["p", "Paragraph"],
  ["h2", "Heading"],
  ["h3", "Subheading"],
  ["blockquote", "Quote"],
];

const COLORS: [string, string][] = [
  ["#1A2620", "Black"],
  ["#1B4F37", "Green"],
  ["#856216", "Gold"],
];

type Props = { value: string; onChange: (html: string) => void; placeholder?: string };

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useRef<HTMLDivElement>(null);
  const saved = useRef<Range | null>(null);

  // Only write into the editor when the value changes from outside (e.g. reset
  // after saving). Writing on every keystroke would move the caret.
  useEffect(() => {
    const el = editor.current;
    if (el && el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  // Remember the last selection inside the editor, so the dropdowns (which take
  // focus) can still apply to the selected text.
  useEffect(() => {
    const remember = () => {
      const el = editor.current;
      const selection = window.getSelection();
      if (!el || !selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      if (el.contains(range.commonAncestorContainer)) saved.current = range.cloneRange();
    };
    document.addEventListener("selectionchange", remember);
    return () => document.removeEventListener("selectionchange", remember);
  }, []);

  function run(command: string, arg?: string) {
    const el = editor.current;
    if (!el) return;
    el.focus();
    const selection = window.getSelection();
    if (saved.current && selection) {
      selection.removeAllRanges();
      selection.addRange(saved.current);
    }
    document.execCommand("styleWithCSS", false, "false");
    document.execCommand(command, false, arg);
    onChange(el.innerHTML);
  }

  function addLink() {
    const url = window.prompt("Link address (starting with https://)");
    if (url && /^(https?:|mailto:|\/)/i.test(url.trim())) run("createLink", url.trim());
  }

  const tool =
    "flex h-9 w-9 items-center justify-center rounded-[8px] text-ink hover:bg-surface";
  const select = "h-9 rounded-[8px] border border-divider bg-ground px-2 text-[13px] font-semibold text-ink";
  const keep = (event: React.MouseEvent) => event.preventDefault();
  const buttons: [string, string, React.ReactNode, string?][] = [
    ["bold", "Bold", <Bold key="b" size={17} />],
    ["italic", "Italic", <Italic key="i" size={17} />],
    ["underline", "Underline", <Underline key="u" size={17} />],
    ["strikeThrough", "Strikethrough", <Strikethrough key="s" size={17} />],
  ];
  const align: [string, string, React.ReactNode][] = [
    ["justifyLeft", "Align left", <AlignLeft key="l" size={17} />],
    ["justifyCenter", "Align centre", <AlignCenter key="c" size={17} />],
    ["justifyRight", "Align right", <AlignRight key="r" size={17} />],
    ["justifyFull", "Justify", <AlignJustify key="j" size={17} />],
  ];
  const lists: [string, string, React.ReactNode][] = [
    ["insertUnorderedList", "Bulleted list", <List key="ul" size={17} />],
    ["insertOrderedList", "Numbered list", <ListOrdered key="ol" size={17} />],
    ["insertHorizontalRule", "Divider line", <Minus key="hr" size={17} />],
  ];
  const divider = <span className="mx-1 h-6 w-px bg-divider" aria-hidden="true" />;

  return (
    <div className="overflow-hidden rounded-[10px] border border-divider bg-ground">
      <div className="flex flex-wrap items-center gap-1 border-b border-divider bg-surface/60 p-1.5">
        <select aria-label="Text style" className={select} value="" onChange={(e) => run("formatBlock", "<" + e.target.value + ">")}>
          <option value="" disabled>Style</option>
          {BLOCKS.map(([tag, label]) => (
            <option key={tag} value={tag}>{label}</option>
          ))}
        </select>
        <select aria-label="Font" className={select} value="" onChange={(e) => run("fontName", e.target.value)}>
          <option value="" disabled>Font</option>
          {FONTS.map(([face, label]) => (
            <option key={face} value={face}>{label}</option>
          ))}
        </select>
        <select aria-label="Font size" className={select} value="" onChange={(e) => run("fontSize", e.target.value)}>
          <option value="" disabled>Size</option>
          {SIZES.map(([size, label]) => (
            <option key={size} value={size}>{label}</option>
          ))}
        </select>
        {divider}
        {buttons.map(([command, label, icon]) => (
          <button key={command} type="button" title={label} aria-label={label} className={tool} onMouseDown={keep} onClick={() => run(command)}>
            {icon}
          </button>
        ))}
        {COLORS.map(([color, label]) => (
          <button
            key={color}
            type="button"
            title={"Text colour: " + label}
            aria-label={"Text colour: " + label}
            className={tool}
            onMouseDown={keep}
            onClick={() => run("foreColor", color)}
          >
            <span className="h-4 w-4 rounded-full border border-divider" style={{ background: color }} />
          </button>
        ))}
        {divider}
        {align.map(([command, label, icon]) => (
          <button key={command} type="button" title={label} aria-label={label} className={tool} onMouseDown={keep} onClick={() => run(command)}>
            {icon}
          </button>
        ))}
        {divider}
        {lists.map(([command, label, icon]) => (
          <button key={command} type="button" title={label} aria-label={label} className={tool} onMouseDown={keep} onClick={() => run(command)}>
            {icon}
          </button>
        ))}
        <button type="button" title="Add link" aria-label="Add link" className={tool} onMouseDown={keep} onClick={addLink}>
          <Link2 size={17} />
        </button>
        {divider}
        <button type="button" title="Undo" aria-label="Undo" className={tool} onMouseDown={keep} onClick={() => run("undo")}>
          <Undo2 size={17} />
        </button>
        <button type="button" title="Redo" aria-label="Redo" className={tool} onMouseDown={keep} onClick={() => run("redo")}>
          <Redo2 size={17} />
        </button>
        <button type="button" title="Clear formatting" aria-label="Clear formatting" className={tool} onMouseDown={keep} onClick={() => run("removeFormat")}>
          <RemoveFormatting size={17} />
        </button>
      </div>
      <div
        ref={editor}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Article"
        data-placeholder={placeholder ?? ""}
        onInput={(event) => onChange((event.currentTarget as HTMLDivElement).innerHTML)}
        className="rich-text rich-editor min-h-[320px] px-4 py-3 text-[15.5px] font-normal outline-none"
      />
    </div>
  );
}
