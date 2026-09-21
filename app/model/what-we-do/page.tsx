import CapabilityExplorer from "@/components/CapabilityExplorer";
import { PageHero, Quote, Section, Shell } from "@/components/ui";
import { operatingStandard } from "@/content/site";

export const metadata = { title: "What We Do" };

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        kicker="Our model"
        title="What we do"
        standfirst="Six capabilities that hold each other up. Pick one to read more about how it works in practice."
      />

      <Section tone="surface">
        <Shell className="py-20">
          <CapabilityExplorer />
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20 text-center">
          <Quote className="mx-auto max-w-[58ch] border-l-0 border-t-[3px] pl-0 pt-6 text-ink">{operatingStandard}</Quote>
        </Shell>
      </Section>
    </>
  );
}
