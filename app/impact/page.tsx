import type { Metadata } from "next";
import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import { Kicker, PageHero, Section, Shell } from "@/components/ui";
import { localValue, metrics, valueChain } from "@/content/site";

export const metadata: Metadata = { title: "Impact & Accountability" };

export default function ImpactPage() {
  return (
    <>
      <PageHero
        kicker="Evidence and accountability"
        title="Trust is earned with numbers."
        standfirst="Published on a schedule, including the ones that disappoint. These are the measures we commit to reporting openly. Figures will be published as the Mogadishu pilot generates them."
      />

      <Section>
        <Shell className="py-16">
          <div id="publish" className="grid scroll-mt-[100px] grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.num} className="flex min-h-[150px] flex-col justify-between border-t-2 border-green-800 pb-6 pt-4">
                <div className="text-xs font-extrabold tracking-[0.1em] text-gold-700">{metric.num}</div>
                <div>
                  <div className="text-[18.5px] font-extrabold leading-[1.25]">{metric.label}</div>
                  <div className="mt-3 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-sand-600">
                    Reported {metric.cadence}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="green">
        <Shell className="grid grid-cols-1 gap-9 py-20 md:grid-cols-2">
          <div>
            <Kicker tone="onDark">Reporting cadence</Kicker>
            <p className="mt-4 text-[clamp(20px,2.4vw,28px)] font-extrabold leading-[1.18]">
              Operating reports quarterly, results annually, and independent review of the evidence behind our claims.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {[
              { k: "Quarterly", v: "Operating reports" },
              { k: "Annually", v: "Results" },
              { k: "Independent", v: "Review of the evidence behind our claims" },
            ].map((row) => (
              <div key={row.k} className="border-t border-white/25 pt-3">
                <strong className="text-[16px]">{row.k}</strong>
                <span className="block text-[15px] text-white/75">{row.v}</span>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <div id="local-value" className="scroll-mt-[100px]">
            <Kicker tone="gold">People and local economy</Kicker>
            <h2 className="mb-4 mt-4 max-w-[26ch] text-[clamp(25px,3vw,36px)] font-extrabold leading-[1.08]">
              Jobs, skills and local value
            </h2>
            <p className="mb-16 max-w-[62ch] text-[17px] leading-[1.65] text-sand-800">
              A school-feeding programme is also an employment programme and a market. Designed well, the same money
              that feeds a child pays a cook, buys a farmer&rsquo;s harvest and builds a skill that lasts.
            </p>
            <div className="mb-16 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {valueChain.map((step, index) => (
                <div
                  key={step}
                  className={
                    "rounded-full px-4 py-4 text-center text-[15.5px] font-extrabold text-green-900 " +
                    (index % 2 === 0 ? "border border-green-200 bg-green-100" : "border border-gold-200 bg-gold-100")
                  }
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="relative mb-16 h-[min(46vh,380px)] overflow-hidden rounded-lg">
              <Image
                src="/assets/photo-dining-hall.png"
                alt="Schoolchildren eating together at long tables in a school dining hall"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
              {localValue.map((item) => (
                <div key={item.title}>
                  <span className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <Icon name={item.icon as IconName} />
                  </span>
                  <h3 className="mb-3 text-[19px] font-extrabold leading-[1.2] text-green-800">{item.title}</h3>
                  <p className="m-0 text-[15.5px] leading-[1.62] text-sand-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </Section>
    </>
  );
}
