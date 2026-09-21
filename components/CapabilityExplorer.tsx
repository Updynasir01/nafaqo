"use client";

import { useState } from "react";
import { capabilities } from "@/content/site";
import Icon, { type IconName } from "./Icon";

export default function CapabilityExplorer({ initial = 0 }: { initial?: number }) {
  const [active, setActive] = useState(Math.min(Math.max(initial, 0), capabilities.length - 1));
  const item = capabilities[active];

  return (
    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
      <div className="border-t border-divider">
        {capabilities.map((capability, index) => {
          const on = index === active;
          return (
            <button
              key={capability.num}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={on}
              className={
                "grid w-full grid-cols-[44px_1fr] items-start gap-3 border-b border-divider border-l-[3px] px-3 py-4 text-left transition-colors " +
                (on ? "border-l-gold-400 bg-green-100 text-green-800" : "border-l-transparent text-ink hover:bg-sand-200")
              }
            >
              <span className="flex items-center gap-2 text-[14px] font-semibold text-gold-700">
                <Icon name={capability.icon as IconName} size={18} className="text-green-600" />
                {capability.num}
              </span>
              <span className="text-[19px] font-semibold leading-[1.25]">{capability.title}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-[340px] flex-col rounded-lg bg-green-800 p-9 text-sand-100 md:sticky md:top-[110px]">
        <div className="text-xs font-bold tracking-[0.14em] text-gold-300">{item.num}</div>
        <h2 className="mb-4 mt-4 text-[clamp(24px,2.8vw,34px)] font-semibold leading-[1.12]">{item.title}</h2>
        <p className="m-0 text-[17px] leading-[1.65] text-white/[0.88]">{item.body}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-9">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-gold-300/40 px-3.5 py-[7px] text-[12.5px] font-semibold text-gold-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
