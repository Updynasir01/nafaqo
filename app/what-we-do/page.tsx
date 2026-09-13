import type { Metadata } from "next";
import CapabilityExplorer from "@/components/CapabilityExplorer";
import { PageHero, Section, Shell } from "@/components/ui";

export const metadata: Metadata = { title: "What We Do" };

export default async function WhatWeDoPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const initial = Number.parseInt(c ?? "1", 10);

  return (
    <>
      <PageHero
        kicker="Our core capabilities"
        title="What We Do"
        standfirst="Six connected capabilities. Each strengthens the others, and together they form a single delivery system."
      />
      <Section>
        <Shell className="py-16">
          <CapabilityExplorer initial={(Number.isFinite(initial) ? initial : 1) - 1} />
        </Shell>
      </Section>
    </>
  );
}
