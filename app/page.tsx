import Link from "next/link";
import ChainStrip from "@/components/ChainStrip";
import HeroVideo from "@/components/HeroVideo";
import Icon, { type IconName } from "@/components/Icon";
import ModelDiagram from "@/components/ModelDiagram";
import Reveal from "@/components/Reveal";
import { PillLink, Section, Shell } from "@/components/ui";
import { operatingStandard, outcomes, partners } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="relative -mt-[74px] flex min-h-[min(100vh,860px)] items-end overflow-hidden bg-green-900 text-sand-100">
        <HeroVideo />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,42,28,0.62)_0%,rgba(11,42,28,0.4)_42%,rgba(11,42,28,0.92)_100%)]"
        />
        <Shell className="relative w-full animate-rise pb-20 pt-[130px]">
          <h1 className="m-0 max-w-[9ch] font-head text-[clamp(52px,11vw,150px)] font-semibold leading-[0.92] [text-shadow:0_2px_24px_rgba(11,42,28,0.55)]">
            Nourishing the <span className="text-gold-300">Future</span>
          </h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink href="/model/how-it-works">Explore Our Model</PillLink>
          </div>
        </Shell>
      </section>

      <Section tone="surface">
        <Shell className="py-20">
          <Reveal>
            <h2 className="mb-14 max-w-[30ch] text-[clamp(24px,3.2vw,40px)] leading-[1.14] text-sand-500">
              Buying, cooking, delivery and checking all sit <span className="text-ink">in one system we run ourselves</span> &mdash;
              which is how a meal stays <span className="text-ink">safe, the same every day, and cheap enough to grow.</span>
            </h2>
          </Reveal>
          <ChainStrip />
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <div className="overflow-hidden rounded-lg bg-green-800 text-sand-100">
            <div className="grid grid-cols-1 items-center gap-12 p-[clamp(28px,5vw,60px)] md:grid-cols-2">
              <div>
                <h2 className="max-w-[22ch] text-[clamp(24px,3vw,38px)] leading-[1.1]">One kitchen. Many schools. One record.</h2>
                <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.65] text-white/[0.85]">
                  Meals get lost in the gaps between people. We run one kitchen, many schools, and one record that joins them.
                </p>
                <div className="mt-8">
                  <PillLink href="/model/how-it-works" variant="outlineGold">How it works</PillLink>
                </div>
              </div>
              <ModelDiagram />
            </div>
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <h2 className="max-w-[24ch] text-[clamp(24px,3vw,38px)] leading-[1.1]">What a meal changes</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome.title} className="border-t-2 border-green-800 pt-4">
                <h3 className="text-[19px] leading-[1.22] text-green-800">{outcome.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.62] text-sand-700">{outcome.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <h2 className="max-w-[22ch] text-[clamp(24px,3vw,38px)] leading-[1.1]">Who we work with</h2>
          <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.6] text-sand-700">
            School feeding only works when everyone carries a part of it.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner.title} className="rounded-md bg-surface p-7">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon name={partner.icon as IconName} size={20} />
                </span>
                <h3 className="text-[20px] leading-[1.18]">{partner.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-sand-700">{partner.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="greenDeep">
        <Shell className="py-20 text-center">
          <p className="mx-auto max-w-[46ch] font-head text-[clamp(20px,2.6vw,32px)] font-semibold leading-[1.22] text-sand-100">
            {operatingStandard}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillLink href="/contact">Partner With Us</PillLink>
            <Link href="/insights/news" className="rounded-full border border-white/45 px-7 py-4 text-[15px] font-bold text-sand-100 no-underline transition-colors hover:bg-white/10">
              Latest updates
            </Link>
          </div>
        </Shell>
      </Section>
    </>
  );
}
