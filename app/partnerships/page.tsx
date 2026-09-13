import type { Metadata } from "next";
import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import { Kicker, PageHero, Section, Shell } from "@/components/ui";
import { partners } from "@/content/site";

export const metadata: Metadata = { title: "Our Partnerships" };

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        kicker="Shared responsibility"
        title="Our Partnerships"
        standfirst="No single institution can deliver school feeding at national scale. It takes coordinated responsibility across policy, financing, food production, delivery and oversight."
      />

      <Section>
        <Shell className="py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {partners.map((partner) => (
              <div
                key={partner.num}
                className="rounded-lg border border-divider p-9 transition-colors hover:border-green-400 hover:bg-sand-100"
              >
                <span className="mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-green-100 text-green-700">
                  <Icon name={partner.icon as IconName} size={24} />
                </span>
                <div className="text-[13px] font-extrabold text-gold-700">{partner.num}</div>
                <h2 className="mb-3 mt-4 text-[23px] font-extrabold leading-[1.16]">{partner.title}</h2>
                <p className="m-0 text-[15.5px] leading-[1.62] text-sand-700">{partner.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-lg bg-green-800 px-9 py-16 text-center text-sand-100">
            <Kicker tone="onDark">Partnership</Kicker>
            <p className="mx-auto mt-4 max-w-[30ch] text-[clamp(20px,2.4vw,29px)] font-extrabold leading-[1.18]">
              Partnership is not a funding arrangement. It is the operating principle that connects responsibility,
              expertise, resources and accountability across the whole system.
            </p>
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <Kicker>Founding support</Kicker>
            <h2 className="mb-4 mt-4 text-[clamp(23px,2.8vw,32px)] font-extrabold leading-[1.1]">
              Hosted within Hormuud Salaam Foundation.
            </h2>
            <p className="mb-3 text-[16.5px] leading-[1.65] text-sand-800">
              Nafaqo was born out of the WFP&ndash;iRise Hub IGNITE Programme, where it was shortlisted among
              Somalia&rsquo;s most promising early-stage ventures. Since then it has continued to operate and to receive
              incubation, mentorship and technical training from a range of national and international institutions.
            </p>
            <p className="m-0 text-[16.5px] leading-[1.65] text-sand-800">
              Seed capital comes from Hormuud Salaam Foundation and the Rockefeller Foundation Catalytic Capital, with
              further philanthropic and private investment being sought.
            </p>
          </div>
          <div className="relative h-[min(46vh,360px)] overflow-hidden rounded-lg">
            <Image
              src="/assets/photo-serving-queue.png"
              alt="A kitchen worker serving children waiting in line with their meal trays"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Shell>
      </Section>
    </>
  );
}
