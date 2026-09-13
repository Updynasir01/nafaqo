import Image from "next/image";
import Link from "next/link";
import ChainStrip from "@/components/ChainStrip";
import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Kicker, PillLink, Section, Shell } from "@/components/ui";
import { backers, capabilities, financing, metrics, operatingStandard, outcomes, partners, pillars, priorities } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section tone="green" className="overflow-hidden">
        <div className="mx-auto grid max-w-shell grid-cols-1 items-center gap-12 px-6 md:min-h-[min(74vh,620px)] md:grid-cols-2">
          <div className="relative animate-rise py-16">
            <span aria-hidden="true" className="pointer-events-none absolute -left-[140px] -top-[60px] h-[300px] w-[300px] rounded-full bg-gold-400/[0.09]" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-[90px] -left-10 h-[180px] w-[180px] rounded-full border border-gold-300/25" />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/40 px-4 py-[7px] text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Somali-led school feeding
            </div>
            <h1 className="mb-4 mt-6 max-w-[16ch] text-[clamp(32px,4.4vw,54px)] font-extrabold leading-[1.02]">
              Building a Somalia where no child has to <span className="text-gold-300">learn hungry.</span>
            </h1>
            <p className="mb-14 max-w-[50ch] text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-white/[0.82]">
              Nafaqo Kitchen is a Somali-led institution specialising in school feeding and nutrition-sensitive food
              services. We exist so that children arrive in class nourished, healthy and ready to learn.
            </p>
            <div className="flex flex-wrap gap-3">
              <PillLink href="/model">Explore Our Model</PillLink>
              <PillLink href="/contact" variant="outlineLight">Partner With Us</PillLink>
            </div>
          </div>
          <div className="relative h-[min(58vh,500px)] min-h-[320px] overflow-hidden rounded-lg">
            <Image
              src="/assets/photo-children-eating.png"
              alt="Two schoolchildren eating a nutritious meal from steel trays at a school table"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="border-t border-white/[0.14]">
          <Shell className="flex flex-wrap items-center gap-x-12 gap-y-4 py-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">Incubated and backed by</span>
            {backers.map((backer) => (
              <span key={backer} className="text-[15.5px] font-extrabold text-white/[0.88]">{backer}</span>
            ))}
          </Shell>
        </div>
      </Section>

      {/* Statement + chain */}
      <Section tone="surface">
        <Shell className="py-20">
          <Kicker>Somalia&rsquo;s first integrated, centralised school-feeding model</Kicker>
          <Reveal>
            <h2 className="mb-14 mt-6 max-w-[30ch] text-[clamp(24px,3.2vw,40px)] font-extrabold leading-[1.14] text-sand-500">
              Nutrition, safe production, last-mile delivery, digital verification and local sourcing sit{" "}
              <span className="text-ink">inside one accountable system</span> &mdash; so meals are{" "}
              <span className="text-ink">safe, consistent, traceable and affordable at scale.</span>
            </h2>
          </Reveal>
          <ChainStrip />
        </Shell>
      </Section>

      {/* Model panel */}
      <Section>
        <Shell className="py-20">
          <div className="overflow-hidden rounded-lg bg-green-800 text-sand-100">
            <div className="grid grid-cols-1 items-center gap-12 p-12 md:grid-cols-2">
              <div>
                <Kicker tone="onDark">How it works</Kicker>
                <h2 className="mb-4 mt-4 max-w-[24ch] text-[clamp(23px,2.9vw,34px)] font-extrabold leading-[1.14]">
                  One kitchen system. One supply chain. One verified record &mdash; from the farm gate to the child.
                </h2>
                <p className="mb-6 max-w-[46ch] text-[16.5px] leading-[1.62] text-white/[0.82]">
                  School feeding fails in the gaps between actors. We close those gaps by running one hub, many spokes,
                  and a single record connecting them.
                </p>
                <Link href="/model" className="inline-flex rounded-full bg-gold-400 px-6 py-3 text-[14.5px] font-bold text-green-900 no-underline hover:bg-gold-300">
                  See the model
                </Link>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[400px]">
                <div className="absolute inset-[2%] rounded-full border border-dashed border-white/20" />
                <div className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gold-400 text-green-900 shadow-[0_0_0_14px_rgba(221,184,85,0.18)]">
                  <span className="text-[10px] uppercase tracking-[0.14em] opacity-80">The hub</span>
                  <span className="mt-1 text-center text-[16px] font-extrabold leading-tight">Central<br />Kitchen</span>
                </div>
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
                  const deg = (360 / 6) * index - 90;
                  return (
                    <div key={index}>
                      <div className="absolute left-1/2 top-1/2 h-px w-[40%] origin-left bg-white/20" style={{ transform: "rotate(" + deg + "deg)" }} />
                      <div
                        className="absolute flex h-[21%] w-[21%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[11.5px] font-bold text-white/75"
                        style={{ left: 50 + Math.cos(angle) * 40 + "%", top: 50 + Math.sin(angle) * 40 + "%" }}
                      >
                        School
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 border-t border-white/[0.14] md:grid-cols-3">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className={"px-12 py-9 " + (index < 2 ? "md:border-r md:border-white/[0.14]" : "")}
                >
                  <div className="text-[17px] font-extrabold text-gold-300">{pillar.title}</div>
                  <p className="mt-2 text-[15px] leading-[1.55] text-white/75">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      {/* Shared responsibility */}
      <Section tone="surface">
        <Shell className="py-20">
          <div className="mb-12 grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12">
            <Kicker>Shared responsibility</Kicker>
            <h2 className="m-0 max-w-[26ch] text-[clamp(23px,2.8vw,32px)] font-extrabold leading-[1.16]">
              No single institution can deliver school feeding at national scale.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <Link
                key={partner.num}
                href="/partnerships"
                className="rounded-lg border border-divider bg-ground p-6 no-underline transition-colors hover:border-green-400"
              >
                <span className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon name={partner.icon as IconName} />
                </span>
                <span className="block text-[17px] font-extrabold leading-[1.25] text-ink">{partner.title}</span>
              </Link>
            ))}
          </div>
        </Shell>
      </Section>

      {/* Why Nafaqo */}
      <Section tone="greenDeep">
        <Shell className="py-24">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div>
              <Kicker tone="onDark">Why Nafaqo</Kicker>
              <h2 className="mb-6 mt-4 max-w-[22ch] text-[clamp(25px,3.2vw,38px)] font-extrabold leading-[1.1]">
                Somalia does not need another pilot that ends.
              </h2>
              <div className="mb-14 flex flex-col gap-4">
                {priorities.map((priority) => (
                  <div key={priority.num} className="grid grid-cols-[20px_1fr] items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-gold-400" />
                    <div>
                      <div className="text-[17px] font-extrabold">{priority.title}</div>
                      <p className="mt-1 text-[15px] leading-[1.55] text-white/75">{priority.success}</p>
                    </div>
                  </div>
                ))}
              </div>
              <PillLink href="/strategy">Read our strategy</PillLink>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/[0.14] lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <Link
                  key={capability.num}
                  href={"/what-we-do?c=" + (index + 1)}
                  className="flex min-h-[150px] flex-col justify-between bg-green-900 px-4 py-6 no-underline transition-colors hover:bg-green-800"
                >
                  <Icon name={capability.icon as IconName} className="text-gold-300" />
                  <span>
                    <span className="block text-[11px] font-bold tracking-[0.12em] text-white/55">{capability.num}</span>
                    <span className="mt-1.5 block text-[15px] font-extrabold leading-[1.25] text-sand-100">{capability.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 rounded-lg bg-green-800 p-12 md:grid-cols-2">
            <div>
              <Kicker tone="onDark">How the model is financed</Kicker>
              <h3 className="mb-4 mt-4 text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.14]">Co-Investment, Not Charity</h3>
              <p className="m-0 max-w-[44ch] text-[16px] leading-[1.62] text-white/[0.82]">
                A school-feeding programme funded by grants alone lasts exactly as long as the grants. The mix shifts
                deliberately from philanthropy towards public and local sources as evidence accumulates.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              {financing.map((source) => (
                <div key={source.title} className="flex items-baseline gap-3 border-b border-white/[0.14] pb-3">
                  <span className="whitespace-nowrap text-[11px] font-bold tracking-[0.1em] text-gold-300">{source.step}</span>
                  <span className="text-[16px] font-extrabold">{source.title}</span>
                </div>
              ))}
              <Link href="/strategy#financing" className="mt-3 self-start rounded-full border border-gold-300/45 px-5 py-3 text-[14.5px] font-bold text-gold-300 no-underline hover:bg-gold-300/10">
                Learn more
              </Link>
            </div>
          </div>
        </Shell>
      </Section>

      {/* Operating standard */}
      <Section>
        <Shell className="py-24 text-center">
          <Kicker tone="gold">Our operating standard</Kicker>
          <h2 className="mx-auto mb-12 mt-4 max-w-[22ch] text-[clamp(23px,2.9vw,36px)] font-extrabold leading-[1.14]">
            What counts as a delivered meal
          </h2>
          <div className="rounded-lg bg-green-800 px-9 py-16 text-sand-100">
            <blockquote className="mx-auto m-0 max-w-[26ch] text-[clamp(20px,2.6vw,32px)] font-extrabold leading-[1.18]">
              {operatingStandard}
            </blockquote>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-9 gap-y-6 text-left sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome.title} className="border-t-2 border-green-800 pt-4">
                <div className="text-[16.5px] font-extrabold text-green-800">{outcome.title}</div>
                <p className="mt-2 text-[15px] leading-[1.58] text-sand-700">{outcome.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      {/* Evidence */}
      <Section tone="surface">
        <Shell className="py-24">
          <Kicker>Evidence and accountability</Kicker>
          <Reveal>
            <h2 className="mb-4 mt-4 text-[clamp(27px,3.2vw,40px)] font-extrabold leading-[1.08]">Trust is earned with numbers.</h2>
          </Reveal>
          <p className="mb-6 max-w-[54ch] text-[16.5px] leading-[1.65] text-sand-800">
            Published on a schedule, including the ones that disappoint. Figures follow as the Mogadishu pilot generates them.
          </p>
          <Link href="/impact" className="mb-14 inline-flex rounded-full bg-green-800 px-6 py-3 text-[14.5px] font-bold text-white no-underline hover:bg-green-700">
            See what we publish
          </Link>
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div className="relative h-[min(44vh,380px)] overflow-hidden rounded-lg">
              <Image
                src="/assets/photo-dining-hall.png"
                alt="Schoolchildren eating together at long tables in a school dining hall"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="border-t border-divider">
              {metrics.map((metric) => (
                <div key={metric.num} className="flex items-baseline gap-4 border-b border-divider py-3">
                  <span className="min-w-[24px] text-xs font-bold text-gold-700">{metric.num}</span>
                  <span className="text-[15.5px] font-medium leading-[1.4]">{metric.label}</span>
                </div>
              ))}
              <div className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-green-100 px-4 py-2.5 text-[13.5px] font-semibold text-green-800">
                <span className="h-[7px] w-[7px] rounded-full bg-green-500" />
                Reports quarterly &middot; results annually &middot; independent review
              </div>
            </div>
          </div>
        </Shell>
      </Section>

      {/* Closing */}
      <Section tone="green">
        <Shell className="py-28">
          <h2 className="m-0 max-w-[18ch] text-[clamp(29px,4vw,48px)] font-extrabold leading-[1.04]">
            Nourished children. Stronger schools. A more resilient Somalia.
          </h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <PillLink href="/contact">Partner with Nafaqo</PillLink>
            <PillLink href="/partnerships" variant="outlineLight">Partnership ecosystem</PillLink>
          </div>
        </Shell>
      </Section>
    </>
  );
}
