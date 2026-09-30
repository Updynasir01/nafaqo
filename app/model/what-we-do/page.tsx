import CapabilityExplorer from "@/components/CapabilityExplorer";
import { PageHero, Quote, Section, Shell } from "@/components/ui";
import { getContent } from "@/lib/content";

export const metadata = { title: "What We Do" };
export const dynamic = "force-dynamic";

export default async function WhatWeDoPage() {
  const c = await getContent();

  return (
    <>
      <PageHero kicker={c.whatKicker} title={c.whatTitle} standfirst={c.whatStandfirst} />

      <Section tone="surface">
        <Shell className="py-20">
          <CapabilityExplorer items={c.capabilities} />
        </Shell>
      </Section>

      <Section>
        <Shell className="py-20 text-center">
          <Quote className="mx-auto max-w-[58ch] border-l-0 border-t-[3px] pl-0 pt-6 text-ink">{c.operatingStandard}</Quote>
        </Shell>
      </Section>
    </>
  );
}
