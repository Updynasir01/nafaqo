"use client";

import { useState } from "react";
import { modelNodes } from "@/content/site";

const SPOKES = [0, 1, 2, 3, 4, 5];

export default function ModelDiagram({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const node = modelNodes[active];
  const hubLive = active === 0;
  const spokesLive = active === 1 || active === 2;
  const recordLive = active === 2;
  const loopLive = active === 3;

  return (
    <div>
      <div role="tablist" aria-label="How the model works" className="mb-12 flex flex-wrap gap-2">
        {modelNodes.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.num}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(index)}
              className={
                "inline-flex items-center gap-2 rounded-full px-5 py-3 transition-colors " +
                (selected
                  ? "border border-gold-400 bg-gold-400 text-green-900"
                  : "border border-white/30 bg-transparent text-white/80 hover:bg-white/10")
              }
            >
              <span className="text-[11px] font-bold tracking-[0.12em] opacity-75">{item.num}</span>
              <span className="text-[15px] font-semibold">{item.short}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className={"relative mx-auto aspect-square w-full " + (compact ? "max-w-[400px]" : "max-w-[480px]")}>
          <div
            className={
              "absolute inset-[2%] rounded-full transition-all duration-300 " +
              (loopLive
                ? "animate-ringPulse border-2 border-dashed border-gold-400"
                : "border border-dashed border-white/20")
            }
          />

          {SPOKES.map((index) => {
            const deg = (360 / 6) * index - 90;
            return (
              <div
                key={"line-" + index}
                className={
                  "absolute left-1/2 top-1/2 z-[1] w-[40%] origin-left transition-all duration-300 " +
                  (spokesLive ? "h-0.5 bg-gold-400/85" : "h-px bg-white/20")
                }
                style={{ transform: "rotate(" + deg + "deg)" }}
              />
            );
          })}

          {SPOKES.map((index) => {
            const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
            const left = 50 + Math.cos(angle) * 40;
            const top = 50 + Math.sin(angle) * 40;
            return (
              <div
                key={"spoke-" + index}
                className={
                  "absolute z-[2] flex h-[21%] w-[21%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center text-[11.5px] font-bold transition-all duration-300 " +
                  (spokesLive
                    ? "border border-green-300 bg-green-500 text-sand-100"
                    : "border border-white/25 bg-white/10 text-white/75")
                }
                style={{ left: left + "%", top: top + "%" }}
              >
                {recordLive ? "Verified" : "School"}
              </div>
            );
          })}

          <div
            className={
              "absolute left-1/2 top-1/2 z-[3] flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full transition-all duration-300 " +
              (hubLive
                ? "bg-gold-400 text-green-900 shadow-[0_0_0_14px_rgba(221,184,85,0.18)]"
                : "bg-green-700 text-sand-100 shadow-[0_0_0_10px_rgba(255,255,255,0.07)]")
            }
          >
            <span className="text-[10px] uppercase tracking-[0.14em] opacity-80">The hub</span>
            <span className="mt-1 text-center text-[17px] font-semibold leading-tight">
              Central
              <br />
              Kitchen
            </span>
          </div>
        </div>

        <div role="tabpanel">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-gold-300">{node.num}</div>
          <h2 className="mb-4 mt-4 text-[clamp(23px,2.9vw,36px)] font-semibold leading-[1.1]">{node.title}</h2>
          <p className="m-0 max-w-[48ch] text-[17.5px] leading-[1.65] text-white/[0.88]">{node.body}</p>
        </div>
      </div>
    </div>
  );
}
