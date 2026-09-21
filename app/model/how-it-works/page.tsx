import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import ModelDiagram from "@/components/ModelDiagram";
import { PageHero, Quote, Section, Shell } from "@/components/ui";
import { modelNodes, partners, phases, priorities } from "@/content/site";

export const metadata = { title: "How It Works" };

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="Our model"
        title="How it works"
        standfirst="One central kitchen serving a network of schools, with a single record connecting what was cooked, what was delivered and which child received it."
      />

      <Section tone="greenDeep">
        <Shell className="grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <h2 className="max-w-[22ch] text-[clamp(24px,3vw,38px)] leading-[1.1]">Hub and spoke</h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.65] text-white/[0.85]">
              Meals get lost in the gaps between people. We run one kitchen, many schools, and one record that joins them.
            </p>
          </div>
          <ModelDiagram />
        </Shell>
      </Section>

      {/* <Section>
        <Shell className="py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {modelNodes.map((node) => (
              <div key={node.num} className="border-t-2 border-green-800 pt-4">
                <h3 className="text-[20px] leading-[1.18] text-green-800">{node.title}</h3>
                <p className="mt-3 max-w-[48ch] text-[16px] leading-[1.62] text-sand-700">{node.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section> */}

      <Section tone="surface">
        <Shell className="py-20">
          <h2 className="max-w-[22ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">What we are building towards</h2>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {priorities.map((priority) => (
              <div key={priority.num} className="rounded-md bg-ground p-7">
                <h3 className="text-[19px] leading-[1.2]">{priority.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-sand-700">{priority.body}</p>
                <p className="mt-3 text-[14px] font-bold leading-[1.5] text-green-700">{priority.success}</p>
              </div>
            ))}
          </div>
          {/* <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase) => (
              <div key={phase.num} className="border-t-2 border-gold-400 pt-4">
                <h3 className="text-[18px] leading-[1.2]">{phase.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.58] text-sand-700">{phase.body}</p>
              </div>
            ))}
          </div> */}
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <h2 className="max-w-[22ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">Who we work with</h2>
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

      <Section tone="green">
        <Shell className="grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div className="relative h-[min(46vh,400px)] overflow-hidden rounded-lg">
            <Image src="/assets/photo-dining-hall.png" alt="Children eating together in the school dining hall" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <Quote className="text-sand-100">
            A meal is not delivered because it left the kitchen. It is delivered when it reaches the intended child, at
            the correct school, at the correct time — and we can prove it.
          </Quote>
        </Shell>
      </Section>
    </>
  );
}
