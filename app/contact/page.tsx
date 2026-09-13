import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Kicker, PageHero, Section, Shell } from "@/components/ui";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: "Partner with Nafaqo" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Get in touch"
        title="Partner with Nafaqo"
        standfirst="Government and education authorities, producers and service partners, schools and communities, technical and development partners \u2014 the model is built to be operated together."
      />

      <Section>
        <Shell className="grid grid-cols-1 gap-12 py-20 md:grid-cols-3">
          <div>
            <Kicker>Office</Kicker>
            <p className="mt-3 text-[19px] font-medium leading-[1.5]">
              {contact.address[0]}
              <br />
              {contact.address[1]}
            </p>
          </div>
          <div>
            <Kicker>Email</Kicker>
            <p className="mt-3 text-[19px] font-medium">
              <a href={"mailto:" + contact.email}>{contact.email}</a>
            </p>
          </div>
          <div>
            <Kicker>Web</Kicker>
            <p className="mt-3 text-[19px] font-medium">
              <a href={contact.siteHref}>{contact.site}</a>
            </p>
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <Kicker>Enquiries</Kicker>
              <h2 className="mb-4 mt-4 max-w-[24ch] text-[clamp(23px,2.8vw,32px)] font-extrabold leading-[1.1]">
                Tell us how you would work with us.
              </h2>
              <p className="m-0 max-w-[46ch] text-[16.5px] leading-[1.65] text-sand-800">
                Messages reach the Nafaqo Kitchen team in Mogadishu directly.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </Shell>
      </Section>

      <Section tone="green">
        <Shell className="py-24">
          <h2 className="m-0 max-w-[20ch] text-[clamp(27px,3.8vw,44px)] font-extrabold leading-[1.04]">
            Nourished children. Stronger schools. A more resilient Somalia.
          </h2>
        </Shell>
      </Section>
    </>
  );
}
