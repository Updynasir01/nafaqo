import Image from "next/image";
import Faq from "@/components/Faq";
import { PageHero, Section, Shell } from "@/components/ui";
import { faqs, mission, story, values, vision, whereWeStart } from "@/content/site";
import { listPartners } from "@/lib/partners";

export const metadata = { title: "Who We Are" };
export const dynamic = "force-dynamic";

export default async function WhoWeArePage() {
  const partners = await listPartners();

  return (
    <>
      <PageHero
        kicker="About us"
        title="Who we are"
        standfirst="&ldquo;NAFAQO&rdquo; means nourishment in Somali. It reflects a simple conviction: nourishing children today builds the learning, opportunity and stability of tomorrow."
      />

      <Section>
        <Shell className="grid grid-cols-1 gap-12 py-20 md:grid-cols-[1fr_1.6fr]">
          <h2 className="max-w-[16ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">Our story</h2>
          <div className="max-w-[54ch]">
            {story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mb-4 text-[17.5px] leading-[1.7] text-sand-800 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <div className="grid grid-cols-1 gap-10 rounded-lg bg-ground p-[clamp(28px,4vw,56px)] md:grid-cols-2">
            <div>
              <h3 className="text-[17px] text-green-700">Vision</h3>
              <p className="mt-3 font-head text-[22px] font-semibold leading-[1.22]">{vision}</p>
            </div>
            <div>
              <h3 className="text-[17px] text-green-700">Mission</h3>
              <p className="mt-3 text-[16.5px] leading-[1.62] text-sand-800">{mission}</p>
            </div>
          </div>
        </Shell>
      </Section>

      <Section tone="greenDeep">
        <Shell className="py-20 text-center">
          <h2 className="mx-auto mb-12 max-w-[30ch] text-[clamp(23px,2.9vw,36px)] leading-[1.16]">
            Somalia&rsquo;s first integrated, centralised school-feeding model &mdash; one accountable system rather than
            scattered, unconnected arrangements.
          </h2>
          <div className="relative h-[min(52vh,440px)] overflow-hidden rounded-lg">
            <Image src="/assets/photo-serving-line.png" alt="Children collecting a meal in the serving line at school" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="mt-16 grid grid-cols-1 items-start gap-10 rounded-lg bg-green-800 p-[clamp(28px,4vw,56px)] text-left md:grid-cols-2">
            <h3 className="text-[clamp(26px,3.4vw,42px)] leading-[1.06]">Our Values</h3>
            <div>
              {values.map((value) => (
                <div key={value} className="flex items-center gap-3 border-b border-white/[0.14] py-3.5">
                  <span className="h-[7px] w-[7px] flex-none rounded-full bg-gold-400" />
                  <span className="font-head text-[16.5px] font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </Section>

      <Section>
        <Shell className="grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <h2 className="max-w-[18ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">Where we are starting</h2>
            {whereWeStart.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 max-w-[44ch] text-[17.5px] leading-[1.68] text-sand-800">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative h-[min(46vh,380px)] overflow-hidden rounded-lg bg-surface">
            <Image src="/assets/photo-serving-queue.png" alt="Students queueing for the morning meal" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <h2 className="mb-10 max-w-[22ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">Questions people ask us</h2>
          <Faq items={faqs} />
        </Shell>
      </Section>

      {partners.length > 0 ? (
        <Section>
          <Shell className="py-20">
            <h2 className="max-w-[22ch] text-[clamp(25px,3vw,38px)] leading-[1.1]">Our partners</h2>
            <p className="mt-4 max-w-[52ch] text-[17.5px] leading-[1.68] text-sand-800">
              The organisations working with us to build the model.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {partners.map((partner) => {
                const card = (
                  <>
                    <div className="flex h-[128px] items-center justify-center rounded-md border border-divider bg-ground p-5">
                      {partner.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-center font-head text-[18px] font-semibold text-green-800">{partner.name}</span>
                      )}
                    </div>
                    <div className="mt-3 text-center text-[15px] font-bold text-ink">{partner.name}</div>
                  </>
                );
                return partner.website_url ? (
                  <a key={partner.id} href={partner.website_url} target="_blank" rel="noopener noreferrer" className="block no-underline">
                    {card}
                  </a>
                ) : (
                  <div key={partner.id}>{card}</div>
                );
              })}
            </div>
          </Shell>
        </Section>
      ) : null}
    </>
  );
}
