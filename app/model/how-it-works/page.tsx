import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import ModelDiagram from "@/components/ModelDiagram";
import { PageHero, Quote, Section, Shell } from "@/components/ui";
import { getContent } from "@/lib/content";
import { isUploaded } from "@/lib/media";

export const metadata = { title: "How It Works" };
export const dynamic = "force-dynamic";

export default async function HowItWorksPage() {
  const c = await getContent();

  return (
    <>
      <PageHero kicker={c.howKicker} title={c.howTitle} standfirst={c.howStandfirst} />

      <Section tone="greenDeep">
        <Shell className="grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <h2 className="max-w-[22ch] text-[clamp(24px,3vw,38px)] leading-[1.1]">{c.howHubTitle}</h2>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.65] text-white/[0.85]">{c.howHubBody}</p>
          </div>
          <ModelDiagram nodes={c.modelNodes} />
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {c.modelNodes.map((node, index) => (
              <div key={index} className="border-t-2 border-green-800 pt-4">
                <h3 className="text-[20px] leading-[1.18] text-green-800">{node.title}</h3>
                <p className="mt-3 max-w-[48ch] text-[16px] leading-[1.62] text-sand-700">{node.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <h2 className="max-w-[22ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">{c.howBuildTitle}</h2>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {c.priorities.map((priority, index) => (
              <div key={index} className="rounded-md bg-ground p-7">
                <h3 className="text-[19px] leading-[1.2]">{priority.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-sand-700">{priority.body}</p>
                <p className="mt-3 text-[14px] font-bold leading-[1.5] text-green-700">{priority.success}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {c.phases.map((phase, index) => (
              <div key={index} className="border-t-2 border-gold-400 pt-4">
                <h3 className="text-[18px] leading-[1.2]">{phase.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.58] text-sand-700">{phase.body}</p>
              </div>
            ))}
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20">
          <h2 className="max-w-[22ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">{c.workTitle}</h2>
          <p className="mt-4 max-w-[48ch] text-[17px] leading-[1.6] text-sand-700">{c.workBody}</p>
          <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {c.workWith.map((partner, index) => (
              <div key={index} className="rounded-md bg-surface p-7">
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
          {c.howImage ? (
            <div className="relative h-[min(46vh,400px)] overflow-hidden rounded-lg">
              <Image src={c.howImage} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" unoptimized={isUploaded(c.howImage)} />
            </div>
          ) : null}
          <Quote className="text-sand-100">{c.operatingStandard}</Quote>
        </Shell>
      </Section>
    </>
  );
}
