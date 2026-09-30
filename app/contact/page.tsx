import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Kicker, PageHero, Section, Shell } from "@/components/ui";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const c = await getContent();

  return (
    <>
      <PageHero kicker={c.contactKicker} title={c.contactTitle} standfirst={c.contactStandfirst} />

      <Section>
        <Shell className="grid grid-cols-1 gap-12 py-20 md:grid-cols-3">
          <div>
            <Kicker>Office</Kicker>
            <p className="mt-3 text-[19px] font-medium leading-[1.5]">
              {c.contactAddress1}
              <br />
              {c.contactAddress2}
            </p>
          </div>
          <div>
            <Kicker>Phone</Kicker>
            <p className="mt-3 text-[19px] font-medium">
              <a href={"tel:" + c.contactPhone.replace(/\s/g, "")}>{c.contactPhone}</a>
            </p>
          </div>
          <div>
            <Kicker>Email</Kicker>
            <p className="mt-3 text-[19px] font-medium">
              <a href={"mailto:" + c.contactEmail}>{c.contactEmail}</a>
            </p>
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <Kicker>Enquiries</Kicker>
              <h2 className="mb-4 mt-4 max-w-[24ch] text-[clamp(23px,2.8vw,32px)] leading-[1.1]">{c.contactFormTitle}</h2>
              <p className="m-0 max-w-[46ch] text-[16.5px] leading-[1.65] text-sand-800">{c.contactFormBody}</p>
            </div>
            <EnquiryForm />
          </div>
        </Shell>
      </Section>

      {c.contactClosing ? (
        <Section tone="green">
          <Shell className="py-24">
            <h2 className="m-0 max-w-[20ch] text-[clamp(27px,3.8vw,44px)] leading-[1.04]">{c.contactClosing}</h2>
          </Shell>
        </Section>
      ) : null}
    </>
  );
}
