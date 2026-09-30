import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { PageHero, Quote, Section, Shell } from "@/components/ui";
import { getContent } from "@/lib/content";

export const metadata = { title: "Why Nafaqo" };
export const dynamic = "force-dynamic";

export default async function WhyNafaqoPage() {
  const c = await getContent();

  return (
    <>
      <PageHero kicker={c.whyKicker} title={c.whyTitle} standfirst={c.whyStandfirst} />

      <Section tone="greenDeep">
        <Shell className="py-20">
          <h2 className="max-w-[24ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">{c.whyHoldTitle}</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {c.capabilities.map((capability, index) => (
              <Link
                key={index}
                href="/model/what-we-do"
                className="rounded-md bg-green-800 p-7 text-sand-100 no-underline transition-colors hover:bg-green-700"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gold-300">
                  <Icon name={capability.icon as IconName} size={20} />
                </span>
                <h3 className="text-[19px] leading-[1.2]">{capability.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.58] text-white/[0.78]">{capability.body}</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 rounded-lg bg-green-800 p-[clamp(28px,4vw,56px)]">
            <h2 className="max-w-[24ch] text-[clamp(23px,2.8vw,34px)] leading-[1.1]">{c.whyCoTitle}</h2>
            <p className="mt-4 max-w-[54ch] text-[16.5px] leading-[1.65] text-white/[0.85]">{c.whyCoBody}</p>
            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2">
              {c.financing.map((step, index) => (
                <div key={index} className="border-t-2 border-gold-400 pt-4">
                  <div className="font-head text-[15px] font-semibold text-gold-300">{step.step}</div>
                  <h3 className="mt-2 text-[18px] leading-[1.2]">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.58] text-white/[0.78]">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <h2 className="max-w-[26ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">{c.whyPublishTitle}</h2>
          <p className="mt-4 max-w-[54ch] text-[17px] leading-[1.65] text-sand-800">{c.whyPublishBody}</p>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {c.metrics.map((metric, index) => (
              <div key={index} className="flex items-baseline justify-between gap-4 border-b border-divider pb-4">
                <span className="text-[16px] leading-[1.5] text-ink">{metric.label}</span>
                <span className="flex-none text-[13px] font-bold uppercase tracking-[0.1em] text-gold-700">{metric.cadence}</span>
              </div>
            ))}
          </div>
          {c.whyPublishQuote ? <Quote className="mt-14 text-ink">{c.whyPublishQuote}</Quote> : null}
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <h2 className="max-w-[26ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">{c.whyLocalTitle}</h2>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2">
            {c.localValue.map((item, index) => (
              <div key={index} className="rounded-md bg-ground p-7">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Icon name={item.icon as IconName} size={20} />
                </span>
                <h3 className="text-[19px] leading-[1.2]">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-sand-700">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {c.valueChain.map((link, index) => (
              <span key={index} className="rounded-full bg-green-100 px-4 py-2 text-[14px] font-bold text-green-800">
                {link}
              </span>
            ))}
          </div>
        </Shell>
      </Section>
    </>
  );
}
