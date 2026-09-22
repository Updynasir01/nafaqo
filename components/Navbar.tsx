"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState("");
  const shell = useRef<HTMLElement>(null);

  const overHero = pathname === "/" && !scrolled;


  useEffect(() => {
    setOpen(false);
    setDrop("");
    setOpenGroup("");
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onDown = (event: MouseEvent) => {
      if (shell.current && !shell.current.contains(event.target as Node)) setDrop("");
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDrop("");
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const tab = (active: boolean) =>
    "flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-[14.5px] transition-colors " +
    (overHero
      ? "font-medium text-white/85 hover:text-white"
      : active
        ? "bg-green-100 font-bold text-green-800"
        : "font-medium text-sand-700 hover:bg-sand-200 hover:text-green-800");

  return (
    <header
      ref={shell}
      className={
        "sticky top-0 z-50 transition-colors duration-300 " +
        (overHero ? "border-b border-transparent bg-transparent" : "border-b border-divider bg-white/[0.92] backdrop-blur-[14px]")
      }
    >
      <div className="mx-auto flex h-[74px] max-w-shell items-center gap-6 px-6">
        <Link href="/" aria-label="Nafaqo Kitchen — home" className="relative flex h-[46px] flex-none items-center">
          <Image
            src="/assets/nafaqo-logo.png"
            alt="Nafaqo Kitchen"
            width={200}
            height={46}
            priority
            className={"h-[46px] w-auto transition-opacity duration-300 " + (overHero ? "opacity-0" : "opacity-100")}
          />
          <Image
            src="/assets/nafaqo-logo-light.png"
            alt=""
            aria-hidden
            width={200}
            height={46}
            priority
            className={"absolute left-0 top-0 h-[46px] w-auto transition-opacity duration-300 " + (overHero ? "opacity-100" : "opacity-0")}
          />
        </Link>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-0.5 lg:flex">
            {nav.map((menu) => {
              const active = menu.items.some((item) => pathname === item.href);
              return (
                <div key={menu.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={drop === menu.label}
                    aria-haspopup="true"
                    onClick={() => setDrop((v) => (v === menu.label ? "" : menu.label))}
                    className={tab(active)}
                  >
                    {menu.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className={"transition-transform duration-200 " + (drop === menu.label ? "rotate-180" : "")}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {drop === menu.label ? (
                    <div className="absolute left-0 top-full pt-2">
                      <div className="flex min-w-[196px] flex-col rounded-md border border-divider bg-ground p-1.5 shadow-lg">
                        {menu.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={
                              "rounded-[11px] px-3.5 py-2.5 text-[15px] no-underline transition-colors hover:bg-surface " +
                              (pathname === item.href ? "bg-green-100 font-bold text-green-800" : "font-medium text-ink")
                            }
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
            <Link href="/contact" className={tab(pathname === "/contact")}>
              Contact
            </Link>
          </div>

          <Link
            href="/contact"
            className={
              "ml-3 whitespace-nowrap rounded-full px-5 py-3 text-[14px] font-bold text-white no-underline transition-colors " +
              (overHero ? "border border-white/45 bg-green-600 hover:bg-green-500" : "bg-green-800 hover:bg-green-700")
            }
          >
            Partner With Us
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={
              "ml-2 flex h-[42px] w-[42px] flex-col items-center justify-center gap-[5px] rounded-full border lg:hidden " +
              (overHero ? "border-white/55" : "border-divider")
            }
          >
            {open ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={overHero ? "text-white" : "text-ink"}
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <>
                <span className={"h-0.5 w-[18px] rounded " + (overHero ? "bg-white" : "bg-ink")} />
                <span className={"h-0.5 w-[18px] rounded " + (overHero ? "bg-white" : "bg-ink")} />
              </>
            )}
          </button>
        </nav>
      </div>

      {open ? (
        <div className="flex flex-col border-t border-divider bg-ground px-6 pb-6 pt-4 lg:hidden">
          {nav.map((menu) => (
            <div key={menu.label} className="border-b border-divider">
              <button
                type="button"
                aria-expanded={openGroup === menu.label}
                onClick={() => setOpenGroup((v) => (v === menu.label ? "" : menu.label))}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-head text-[19px] font-semibold text-ink"
              >
                {menu.label}
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={
                    "flex-none text-green-700 transition-transform duration-200 " +
                    (openGroup === menu.label ? "rotate-180" : "")
                  }
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openGroup === menu.label ? (
                <div className="flex flex-col pb-4 pl-4">
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        "py-2.5 text-[16.5px] no-underline " +
                        (pathname === item.href ? "font-bold text-green-800" : "font-medium text-sand-700")
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <Link
            href="/contact"
            className={
              "border-b border-divider py-4 font-head text-[19px] font-semibold no-underline " +
              (pathname === "/contact" ? "text-green-800" : "text-ink")
            }
          >
            Contact
          </Link>
        </div>
      ) : null}
    </header>
  );
}
