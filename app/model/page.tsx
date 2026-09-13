import type { Metadata } from "next";
import Image from "next/image";
import ModelDiagram from "@/components/ModelDiagram";
import { Kicker, PageHero, Section, Shell } from "@/components/ui";
import { operatingStandard } from "@/content/site";

export const metadata: Metadata = { title: "Our Model" };

export default function ModelPage() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title="The Nafaqo Model"
        standfirst="School feeding fails in the gaps between actors \u2014 between the supplier and the kitchen, the kitchen and the school, the report and the reality. We close those gaps by running one hub, many spokes, and a single record connecting them."
      />

      <Section tone="greenDeep">
        <Shell className="py-20">
          <ModelDiagram />
        </Shell>
      </Section>

      <Section>
        <Shell className="pt-14">
          <div className="relative h-[min(52vh,440px)] overflow-hidden rounded-lg">
            <Image
              src="/assets/photo-serving-line.png"
              alt="A kitchen worker serving a hot meal to a queue of schoolchildren"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Shell>
        <Shell className="py-20">
          <Kicker tone="gold">Our operating standard</Kicker>
          <blockquote className="m-0 mt-6 max-w-[28ch] text-[clamp(23px,2.9vw,36px)] font-extrabold leading-[1.14]">
            {operatingStandard}
          </blockquote>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="grid grid-cols-1 gap-12 py-20 md:grid-cols-2">
          <div>
            <Kicker>A public&ndash;private partnership by design</Kicker>
            <h2 className="mb-4 mt-4 text-[clamp(23px,2.8vw,32px)] font-extrabold leading-[1.1]">
              Neither side can deliver school feeding at national scale alone.
            </h2>
            <p className="mb-3 text-[16.5px] leading-[1.65] text-sand-800">
              Government sets policy, standards and oversight and progressively co-finances the meal; Somali private
              capital, businesses and philanthropy build the kitchen, carry the early risk and run the operating capacity.
            </p>
            <p className="m-0 text-[16.5px] leading-[1.65] text-sand-800">The model is structured so that neither has to.</p>
          </div>
          <div>
            <Kicker>Why cost is a child</Kicker>
            <h2 className="mb-4 mt-4 text-[clamp(23px,2.8vw,32px)] font-extrabold leading-[1.1]">
              Every shilling saved is another child fed with the same money.
            </h2>
            <p className="m-0 text-[16.5px] leading-[1.65] text-sand-800">
              We manage cost per meal with the same seriousness as nutrition and safety, because the two are the same
              question. Every efficiency &mdash; in procurement, energy, portioning, waste, routing &mdash; lowers what a
              meal costs, and is another step towards a programme Somalia can afford to run itself.
            </p>
          </div>
        </Shell>
      </Section>
    </>
  );
}
