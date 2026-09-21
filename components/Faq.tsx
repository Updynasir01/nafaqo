"use client";

import { useState } from "react";

export default function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <div className="max-w-[820px] border-t border-divider">
      {items.map((item, index) => (
        <div key={item.q} className="border-b border-divider">
          <button
            type="button"
            aria-expanded={open === index}
            onClick={() => setOpen((v) => (v === index ? -1 : index))}
            className="flex w-full items-center justify-between gap-4 py-6 text-left font-head text-[19px] font-semibold text-ink"
          >
            {item.q}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={"flex-none text-green-700 transition-transform duration-200 " + (open === index ? "rotate-180" : "")}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {open === index ? <p className="mb-6 max-w-[62ch] text-[16.5px] leading-[1.68] text-sand-800">{item.a}</p> : null}
        </div>
      ))}
    </div>
  );
}
