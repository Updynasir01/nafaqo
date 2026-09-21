import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import { Kicker, PageHero, Section, Shell } from "@/components/ui";
import { contact } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Get in touch"
        title="Come and see the kitchen"
        standfirst="We are in Mogadishu, Somalia. Write to us, call, or drop in."
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
            <Kicker>Phone</Kicker>
            <p className="mt-3 text-[19px] font-medium">
              <a href={"tel:" + contact.phone.replace(/\s/g, "")}>{contact.phone}</a>
            </p>
          </div>
          <div>
            <Kicker>Email</Kicker>
            <p className="mt-3 text-[19px] font-medium">
              <a href={"mailto:" + contact.email}>{contact.email}</a>
            </p>
          </div>
        </Shell>
      </Section>

      <Section tone="surface">
        <Shell className="py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <Kicker>Enquiries</Kicker>
              <h2 className="mb-4 mt-4 max-w-[24ch] text-[clamp(23px,2.8vw,32px)] leading-[1.1]">
                Tell us how you would like to help.
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
          <h2 className="m-0 max-w-[20ch] text-[clamp(27px,3.8vw,44px)] leading-[1.04]">
            Nourished children. Stronger schools. A more resilient Somalia.
          </h2>
        </Shell>
      </Section>
    </>
  );
}
