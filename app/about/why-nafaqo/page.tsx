import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { PageHero, Quote, Section, Shell } from "@/components/ui";
import { capabilities, financing, localValue, metrics, valueChain } from "@/content/site";

export const metadata = { title: "Why Nafaqo" };

export default function WhyNafaqoPage() {
  return (
    <>
      <PageHero
        kicker="Why Nafaqo"
        title="Why Nafaqo"
        standfirst="School feeding is not a new idea in Somalia. What has been missing is a single operator accountable for the whole chain — from the farm to the child, with a record to show for it."
      />

      <Section tone="greenDeep">
        <Shell className="py-20">
          <h2 className="max-w-[24ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">What we hold together</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <Link
                key={capability.num}
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
            <h2 className="max-w-[24ch] text-[clamp(23px,2.8vw,34px)] leading-[1.1]">Co-investment, not charity</h2>
            <p className="mt-4 max-w-[54ch] text-[16.5px] leading-[1.65] text-white/[0.85]">
              School feeding is affordable when the cost is shared, and durable when the share moves steadily towards
              Somali and public sources.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2">
              {financing.map((step) => (
                <div key={step.step} className="border-t-2 border-gold-400 pt-4">
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
          <h2 className="max-w-[26ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">What we will publish</h2>
          <p className="mt-4 max-w-[54ch] text-[17px] leading-[1.65] text-sand-800">
            These are the measures we commit to reporting openly, including the ones that disappoint.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.num} className="flex items-baseline justify-between gap-4 border-b border-divider pb-4">
                <span className="text-[16px] leading-[1.5] text-ink">{metric.label}</span>
                <span className="flex-none text-[13px] font-bold uppercase tracking-[0.1em] text-gold-700">{metric.cadence}</span>
              </div>
            ))}
          </div>
          <Quote className="mt-14 text-ink">
            We will publish operating reports quarterly and results annually, with independent review of the evidence
            behind our claims.
          </Quote>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <h2 className="max-w-[26ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">Jobs, skills and local value</h2>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2">
            {localValue.map((item) => (
              <div key={item.title} className="rounded-md bg-ground p-7">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Icon name={item.icon as IconName} size={20} />
                </span>
                <h3 className="text-[19px] leading-[1.2]">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-sand-700">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {valueChain.map((link) => (
              <span key={link} className="rounded-full bg-green-100 px-4 py-2 text-[14px] font-bold text-green-800">
                {link}
              </span>
            ))}
          </div>
        </Shell>
      </Section>
    </>
  );
}
