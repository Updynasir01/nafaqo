"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/content/site";
import SubscribeForm from "./SubscribeForm";

const groups = [
  {
    title: "About",
    items: [
      { href: "/about/who-we-are", label: "Who We Are" },
      { href: "/about/why-nafaqo", label: "Why Nafaqo" },
    ],
  },
  {
    title: "Our Model",
    items: [
      { href: "/model/how-it-works", label: "How It Works" },
      { href: "/model/what-we-do", label: "What We Do" },
    ],
  },
  {
    title: "Insights",
    items: [
      { href: "/insights/news", label: "News & Updates" },
      { href: "/insights/reports", label: "Reports & Resources" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="overflow-hidden bg-green-900 text-white/[0.78]">
      {pathname !== "/" ? (
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-6 border-b border-white/[0.12] px-6 py-16">
          <h2 className="m-0 max-w-[26ch] text-[clamp(24px,3.2vw,38px)] leading-[1.12] text-sand-100">
            A school meal is the cheapest thing we can do for a child’s education.
          </h2>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full bg-gold-400 px-7 py-4 text-[15px] font-bold text-green-900 no-underline transition-colors hover:bg-gold-300"
          >
            Partner With Us
          </Link>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-shell grid-cols-1 items-start gap-8 px-6 pt-14 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-block rounded-md bg-sand-100 px-4 py-3">
            <Image src="/assets/nafaqo-logo.png" alt="Nafaqo Kitchen" width={190} height={42} className="h-[42px] w-auto" />
          </div>
          <p className="m-0 max-w-[32ch] text-[15.5px] leading-[1.62]">
            Building hot school meals for Somali children, cooked in Mogadishu.
          </p>
        </div>
        <div>
          <div className="mb-3 text-[11.5px] font-bold uppercase tracking-[0.13em] text-gold-300">Stay informed</div>
          <p className="mb-3 max-w-[34ch] text-[14.5px] leading-[1.55]">
            We will publish operating reports quarterly and results annually.
          </p>
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
            <a href={"tel:" + contact.phone.replace(/\s/g, "")} className="text-sand-100 no-underline hover:text-gold-300">{contact.phone}</a>
            <br />
            <a href={"mailto:" + contact.email} className="text-sand-100 no-underline hover:text-gold-300">{contact.email}</a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.12]">
        <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-x-8 gap-y-4 px-6 py-4 text-[13px] tracking-[0.03em]">
          <span>© {new Date().getFullYear()} Nafaqo Kitchen</span>
          <span>{contact.tagline}</span>
        </div>
      </div>

      <div aria-hidden="true" className="mx-auto flex h-[clamp(78px,11.5vw,165px)] max-w-shell justify-center overflow-hidden px-6">
        <div className="whitespace-nowrap text-center font-head text-[clamp(108px,19.5vw,290px)] font-semibold leading-none tracking-[-0.035em] text-white/[0.08]">
          NAFAQO
        </div>
      </div>
    </footer>
  );
}
