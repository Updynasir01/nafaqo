import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Kicker, Quote, Section, Shell } from "@/components/ui";
import { glance, strengths, values } from "@/content/site";

export const metadata: Metadata = { title: "About" };

const facts = [
  { value: "Hormuud Salaam Foundation", label: "Institutional host" },
  { value: "Public\u2013private partnership", label: "Structure" },
  { value: "A structured pilot in Mogadishu", label: "First operation" },
  { value: "School feeding and local food systems", label: "Focus" },
];

const guides = [
  { icon: "Eye" as const, kicker: "Vision", body: "A Somalia where no child has to learn hungry.", strong: true },
  { icon: "Target" as const, kicker: "Mission", body: "To build Somalia\u2019s school-feeding model and prove it works \u2014 safe, nutritious meals at the lowest sustainable cost per child, delivered through centralised kitchens, verified to the learner, sourced locally and financed jointly by government, communities and partners.", strong: false },
  { icon: "HeartHandshake" as const, kicker: "Purpose", body: "To turn a school meal into better learning, local jobs, stronger markets and lasting public value \u2014 a model Somali institutions, businesses and communities can run and expand.", strong: false },
];

const origins = [
  { title: "Origin", body: "Born out of the WFP\u2013iRise Hub IGNITE Programme, where it was shortlisted among Somalia\u2019s most promising early-stage ventures." },
  { title: "Since then", body: "Continued to operate and to receive incubation, mentorship and technical training from a range of national and international institutions." },
  { title: "Founding investment", body: "Seed capital from Hormuud Salaam Foundation and the Rockefeller Foundation Catalytic Capital, with further philanthropic and private investment being sought." },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="green">
        <Shell className="relative py-20">
          <span aria-hidden="true" className="pointer-events-none absolute -right-[120px] -top-20 h-[420px] w-[420px] rounded-full border border-gold-300/[0.18]" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 top-5 h-[260px] w-[260px] rounded-full bg-gold-400/[0.08]" />
          <Kicker tone="onDark">About us</Kicker>
          <h1 className="my-6 max-w-[20ch] text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.02]">Who We Are</h1>
          <p className="m-0 max-w-[58ch] text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-white/85">
            &ldquo;NAFAQO&rdquo; means nourishment in Somali. It reflects a simple conviction: nourishing children today
            builds the learning, opportunity and stability of tomorrow.
          </p>
        </Shell>
        <div className="border-t border-white/[0.14]">
          <div className="mx-auto grid max-w-shell grid-cols-1 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={"py-9 pr-6 " + (index < 3 ? "lg:border-r lg:border-white/[0.14]" : "") + (index > 0 ? " lg:pl-6" : "")}
              >
                <div className="text-[18px] font-extrabold leading-[1.25] text-gold-300">{fact.value}</div>
                <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/[0.62]">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <Shell className="py-24 text-center">
          <Kicker>Our purpose</Kicker>
          <Reveal>
            <h2 className="mx-auto mb-12 mt-6 max-w-[28ch] text-[clamp(23px,2.9vw,36px)] font-extrabold leading-[1.16]">
              To turn a school meal into better learning, local jobs, stronger markets and lasting public value.
            </h2>
          </Reveal>
          <div className="rounded-lg bg-ground px-9 py-12 text-left">
            <div className="mb-12 text-center text-[19px] font-extrabold">What guides the institution</div>
            <div className="grid grid-cols-1 gap-9 md:grid-cols-3">
              {guides.map((guide) => (
                <div key={guide.kicker}>
                  <span className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Icon name={guide.icon} />
                  </span>
                  <Kicker tone="gold">{guide.kicker}</Kicker>
                  {guide.strong ? (
                    <p className="mt-3 text-[19px] font-extrabold leading-[1.25]">{guide.body}</p>
                  ) : (
                    <p className="mt-3 text-[15.5px] leading-[1.6] text-sand-800">{guide.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-[64ch] text-[16.5px] leading-[1.65] text-sand-800">
            Our aim is not to run every school kitchen in the country. It is to build a model that works, prove it with
            evidence, and put it in the hands of Somali institutions, businesses and communities to run and expand.
          </p>
        </Shell>
      </Section>

      <Section tone="greenDeep">
        <Shell className="py-24 text-center">
          <Kicker tone="onDark">Who we are</Kicker>
          <h2 className="mx-auto mb-12 mt-6 max-w-[30ch] text-[clamp(23px,2.9vw,36px)] font-extrabold leading-[1.16]">
            Somalia&rsquo;s first integrated, centralised school-feeding model &mdash; one accountable system rather than
            scattered, unconnected arrangements.
          </h2>
          <div className="relative h-[min(52vh,440px)] overflow-hidden rounded-lg">
            <Image
              src="/assets/photo-serving-line.png"
              alt="A kitchen worker serving a hot meal to a queue of schoolchildren"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            {origins.map((origin) => (
              <div key={origin.title} className="border-t-2 border-gold-400 pt-4">
                <div className="text-[16px] font-extrabold text-gold-300">{origin.title}</div>
                <p className="mt-2 text-[15px] leading-[1.58] text-white/[0.78]">{origin.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 items-start gap-12 rounded-lg bg-green-800 p-12 text-left md:grid-cols-2">
            <div>
              <Kicker tone="onDark">How we work</Kicker>
              <h3 className="mt-4 text-[clamp(26px,3.4vw,42px)] font-extrabold leading-[1.06]">Our Values</h3>
            </div>
            <div>
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3 border-b border-white/[0.14] py-3">
                  <span className="h-[7px] w-[7px] flex-none rounded-full bg-gold-400" />
                  <span className="text-[16.5px] font-extrabold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="py-24">
          <div className="mb-14 grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <Kicker tone="gold">Our institutional character</Kicker>
              <h2 className="mt-4 max-w-[20ch] text-[clamp(25px,3vw,38px)] font-extrabold leading-[1.1]">Nafaqo&rsquo;s core strengths</h2>
            </div>
            <p className="m-0 max-w-[46ch] text-[16.5px] leading-[1.65] text-sand-700">
              Our strength is not a single tool or activity. It is how the parts are held together &mdash; and what that
              makes possible.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {strengths.map((strength) => (
              <div key={strength.title} className="border-t-2 border-green-800 pt-4">
                <h3 className="mb-3 text-[19px] font-extrabold leading-[1.22] text-green-800">{strength.title}</h3>
                <p className="m-0 text-[15.5px] leading-[1.62] text-sand-700">{strength.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <Kicker>At a glance</Kicker>
          <h2 className="mb-12 mt-4 text-[clamp(24px,2.9vw,34px)] font-extrabold leading-[1.08]">The institution in nine lines.</h2>
          <div className="border-t border-divider">
            {glance.map((row) => (
              <div key={row.k} className="grid grid-cols-1 gap-2 border-b border-divider py-4 sm:grid-cols-[minmax(150px,210px)_1fr] sm:gap-6">
                <div className="pt-[3px] text-[11.5px] font-bold uppercase tracking-[0.13em] text-green-700">{row.k}</div>
                <div className="text-[16px] leading-[1.55] text-sand-800">{row.v}</div>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="green">
        <Shell className="grid grid-cols-1 gap-12 py-24 md:grid-cols-2">
          <div>
            <Kicker tone="onDark">Looking ahead</Kicker>
            <h2 className="mt-4 text-[clamp(24px,2.9vw,34px)] font-extrabold leading-[1.08]">Our ambition</h2>
          </div>
          <div>
            <p className="mb-4 text-[16.5px] leading-[1.68] text-white/[0.88]">
              Nafaqo Kitchen intends to build Somalia&rsquo;s school-feeding model, prove it at scale, and make it
              national &mdash; owned by Somali institutions, financed increasingly from Somali sources, and staffed by
              Somali people.
            </p>
            <p className="mb-6 text-[16.5px] leading-[1.68] text-white/[0.88]">
              Our contribution will be measured in a system that outlives any single project: healthier and
              better-educated children, stronger public institutions, deeper local food markets and communities more able
              to withstand the next shock.
            </p>
            <Quote>
              We measure ourselves not only by meals served, but by children supported, trust earned, local value
              created, systems strengthened and public value that lasts.
            </Quote>
          </div>
        </Shell>
      </Section>
    </>
  );
}
