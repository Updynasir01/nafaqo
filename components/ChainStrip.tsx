"use client";

import { useState } from "react";
import { chain } from "@/content/site";
import Icon, { type IconName } from "./Icon";

export default function ChainStrip() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {chain.map((step, index) => {
          const on = index === active;
          return (
            <button
              key={step.num}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-pressed={on}
              className={
                "rounded-md px-4 py-6 text-left transition-colors " +
                (on ? "bg-green-800 text-sand-100" : "border border-divider bg-ground text-ink")
              }
            >
              <span
                className={
                  "mb-3 flex h-10 w-10 items-center justify-center rounded-full transition-colors " +
                  (on ? "bg-gold-400 text-green-900" : "bg-green-100 text-green-700")
                }
              >
                <Icon name={step.icon as IconName} />
              </span>
              <span className="block text-[11px] font-bold tracking-[0.14em] opacity-70">{step.num}</span>
              <span className="mt-2 block text-[17px] font-extrabold leading-tight">{step.label}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.65] text-sand-800">{chain[active].note}</p>
    </div>
  );
}
