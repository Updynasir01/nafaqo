import type { Metadata } from "next";
import { Kicker, PageHero, Quote, Section, Shell } from "@/components/ui";
import { financing, fundingMix, phases, priorities } from "@/content/site";

export const metadata: Metadata = { title: "Our Strategy" };

export default function StrategyPage() {
  return (
    <>
      <PageHero
        kicker="What guides our growth"
        title="Our Strategy"
        standfirst="Four priorities, four phases and one rule about growth."
      />

      <Section>
        <Shell className="py-20">
          <h2 className="mb-12 max-w-[20ch] text-[clamp(23px,2.8vw,32px)] font-extrabold leading-[1.1]">Four priorities</h2>
          <div className="grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {priorities.map((priority) => (
              <div key={priority.num} className="border-t-2 border-green-800 pt-4">
                <div className="text-[13px] font-extrabold text-gold-700">{priority.num}</div>
                <h3 className="my-3 text-[23px] font-extrabold leading-[1.16]">{priority.title}</h3>
                <p className="mb-4 text-[15.5px] leading-[1.6] text-sand-700">{priority.body}</p>
                <div className="border-t border-divider pt-3 text-[13.5px] font-bold text-green-700">{priority.success}</div>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="greenDeep">
        <Shell className="py-20">
          <Kicker tone="onDark">How we scale</Kicker>
          <h2 className="mb-16 mt-4 max-w-[24ch] text-[clamp(26px,3.4vw,42px)] font-extrabold leading-[1.08]">
            Moving deliberately from operator to enabler.
          </h2>
          <div className="relative">
            <div aria-hidden="true" className="absolute left-0 right-0 top-[13px] h-0.5 bg-gold-300/[0.28]" />
            <div className="relative grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
              {phases.map((phase) => (
                <div key={phase.num}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-[11px] font-extrabold text-green-900">
                    {phase.num}
                  </div>
                  <h3 className="mb-3 mt-4 text-[26px] font-extrabold">{phase.title}</h3>
                  <p className="m-0 text-[15.5px] leading-[1.62] text-white/[0.82]">{phase.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 max-w-[34ch]">
            <Quote>
              We grow only where evidence, operational readiness, financing and child safety allow. Scale is never a
              reason to lower a standard.
            </Quote>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <div id="financing" className="scroll-mt-[100px]">
            <Kicker tone="gold">How the model is financed</Kicker>
            <h2 className="mb-4 mt-4 max-w-[20ch] text-[clamp(27px,3.4vw,44px)] font-extrabold leading-[1.06]">
              Co-Investment, Not Charity
            </h2>
            <p className="mb-14 max-w-[62ch] text-[17.5px] leading-[1.65] text-sand-800">
              A school-feeding programme funded by grants alone lasts exactly as long as the grants. Nafaqo Kitchen is
              built on shared financing from the start, with the mix shifting deliberately from philanthropy towards
              public and local sources as evidence accumulates.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {financing.map((source) => (
                <div key={source.title} className="border-t-2 border-gold-400 pt-4">
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.13em] text-green-700">{source.step}</div>
                  <h3 className="my-3 text-[20px] font-extrabold leading-[1.22]">{source.title}</h3>
                  <p className="m-0 text-[15.5px] leading-[1.6] text-sand-700">{source.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 rounded-lg bg-green-100 p-9">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-green-800">Founding investors</div>
              <p className="m-0 mt-4 max-w-[70ch] text-[17px] leading-[1.65] text-green-900">
                Hormuud Salaam Foundation and the Rockefeller Foundation Catalytic Capital provide the initial seed
                capital &mdash; to build the central kitchen, develop the model and invest in a sustainable, locally
                proven system rather than a one-off feeding round.
              </p>
            </div>
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <Kicker>The funding mix over time</Kicker>
          <h2 className="mb-12 mt-4 max-w-[24ch] text-[clamp(23px,2.8vw,32px)] font-extrabold leading-[1.1]">
            Philanthropy buys down the cost of the system, not the meal forever.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse">
              <thead>
                <tr>
                  {["Source", "Pilot", "Consolidation", "Scale"].map((head) => (
                    <th
                      key={head}
                      scope="col"
                      className="border-b border-divider pb-3 pr-4 text-left text-[11.5px] font-bold uppercase tracking-[0.13em] text-sand-700"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fundingMix.map((row) => (
                  <tr key={row.source}>
                    <th scope="row" className="border-b border-divider py-4 pr-4 text-left align-top text-[16px] font-extrabold">
                      {row.source}
                    </th>
                    <td className="border-b border-divider py-4 pr-4 align-top text-[15.5px] text-sand-800">{row.pilot}</td>
                    <td className="border-b border-divider py-4 pr-4 align-top text-[15.5px] text-sand-800">{row.consolidation}</td>
                    <td className="border-b border-divider py-4 align-top text-[15.5px] text-sand-800">{row.scale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Shell>
      </Section>
    </>
  );
}
