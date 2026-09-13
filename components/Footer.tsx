"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/content/site";
import SubscribeForm from "./SubscribeForm";

const groups = [
  {
    title: "Institution",
    items: [
      { href: "/about", label: "About" },
      { href: "/model", label: "Our Model" },
      { href: "/what-we-do", label: "What We Do" },
    ],
  },
  {
    title: "Approach",
    items: [
      { href: "/strategy", label: "Strategy" },
      { href: "/strategy#financing", label: "Co-Investment, Not Charity" },
      { href: "/partnerships", label: "Partnerships" },
    ],
  },
  {
    title: "Accountability",
    items: [
      { href: "/impact", label: "Impact & Accountability" },
      { href: "/impact#publish", label: "What we will publish" },
      { href: "/impact#local-value", label: "Jobs, skills and local value" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="overflow-hidden bg-green-900 text-white/[0.78]">
      {pathname !== "/" ? (
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-6 border-b border-white/[0.12] px-6 py-16">
          <h2 className="m-0 max-w-[26ch] text-[clamp(24px,3.2vw,38px)] font-extrabold leading-[1.12] text-sand-100">
            Discover how a school meal becomes better learning, local jobs and lasting public value.
          </h2>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full bg-gold-400 px-7 py-4 text-[15px] font-bold text-green-900 no-underline transition-colors hover:bg-gold-300"
          >
            Partner with Nafaqo
          </Link>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-shell grid-cols-1 items-start gap-8 px-6 pt-14 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-block rounded-md bg-sand-100 px-4 py-3">
            <Image src="/assets/nafaqo-logo.png" alt="Nafaqo Kitchen" width={190} height={42} className="h-[42px] w-auto" />
          </div>
          <p className="m-0 max-w-[32ch] text-[15.5px] leading-[1.62]">
            A Somali-led institution built for safe, reliable and accountable school feeding.
          </p>
        </div>
        <div>
          <div className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.13em] text-gold-300">Stay informed</div>
          <p className="mb-3 max-w-[34ch] text-[14.5px] leading-[1.55]">Operating reports quarterly, results annually.</p>
          <SubscribeForm />
        </div>
      </div>

      <div className="mx-auto grid max-w-shell grid-cols-2 gap-6 px-6 py-14 md:grid-cols-4">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.13em] text-gold-300">{group.title}</div>
            <div className="flex flex-col items-start gap-3">
              {group.items.map((item) => (
                <Link key={item.label} href={item.href} className="text-[15px] text-white/[0.78] no-underline hover:text-gold-300">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.13em] text-gold-300">Contact</div>
          <p className="m-0 text-[15px] leading-[1.7]">
            {contact.address[0]}
            <br />
            {contact.address[1]}
            <br />
            <a href={"mailto:" + contact.email} className="text-sand-100 no-underline hover:text-gold-300">{contact.email}</a>
            <br />
            <a href={contact.siteHref} className="text-sand-100 no-underline hover:text-gold-300">{contact.site}</a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.12]">
        <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-x-8 gap-y-4 px-6 py-4 text-[13px] tracking-[0.03em]">
          <span>{contact.host}</span>
          <span>{contact.tagline}</span>
        </div>
      </div>

      <div aria-hidden="true" className="mx-auto flex h-[clamp(78px,11.5vw,165px)] max-w-shell justify-center overflow-hidden px-6">
        <div className="whitespace-nowrap text-center text-[clamp(108px,19.5vw,290px)] font-extrabold leading-none tracking-[-0.035em] text-white/[0.08]">
          NAFAQO
        </div>
      </div>
    </footer>
  );
}
