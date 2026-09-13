"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-white/[0.88] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[74px] max-w-shell items-center gap-6 px-6">
        <Link href="/" aria-label="Nafaqo Kitchen \u2014 home" className="flex flex-none items-center">
          <Image src="/assets/nafaqo-logo.png" alt="Nafaqo Kitchen" width={200} height={46} priority className="h-[46px] w-auto" />
        </Link>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "whitespace-nowrap rounded-full px-4 py-2 text-[14.5px] no-underline transition-colors " +
                    (active
                      ? "bg-green-100 font-bold text-green-800"
                      : "font-medium text-sand-700 hover:bg-sand-200 hover:text-green-800")
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            className="ml-3 whitespace-nowrap rounded-full bg-green-800 px-5 py-3 text-[14px] font-bold text-white no-underline transition-colors hover:bg-green-700"
          >
            Partner With Us
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="ml-2 flex h-[42px] w-[42px] flex-col items-center justify-center gap-[5px] rounded-full border border-divider px-[11px] lg:hidden"
          >
            <span className="h-0.5 w-full rounded bg-ink" />
            <span className="h-0.5 w-full rounded bg-ink" />
          </button>
        </nav>
      </div>

      {open ? (
        <div className="flex flex-col border-t border-divider bg-ground px-6 pb-6 pt-4 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-divider py-4 text-[19px] font-semibold text-ink no-underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
