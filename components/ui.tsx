import Link from "next/link";
import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={"mx-auto max-w-shell px-6 " + className}>{children}</div>;
}

export function Section({
  children,
  tone = "ground",
  className = "",
}: {
  children: ReactNode;
  tone?: "ground" | "surface" | "green" | "greenDeep";
  className?: string;
}) {
  const tones = {
    ground: "bg-ground",
    surface: "bg-surface",
    green: "bg-green-800 text-sand-100",
    greenDeep: "bg-green-900 text-sand-100",
  } as const;
  return <section className={tones[tone] + " " + className}>{children}</section>;
}

export function Kicker({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "gold" | "onDark" }) {
  const tones = { green: "text-green-700", gold: "text-gold-700", onDark: "text-gold-300" } as const;
  return (
    <div className={"text-xs font-bold uppercase tracking-[0.14em] " + tones[tone]}>{children}</div>
  );
}

export function PageHero({
  kicker,
  title,
  standfirst,
}: {
  kicker: string;
  title: string;
  standfirst?: string;
}) {
  return (
    <section className="border-b border-divider">
      <Shell className="py-14 md:py-20">
        <Kicker tone="gold">{kicker}</Kicker>
        <h1 className="mt-6 text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.0]">{title}</h1>
        {standfirst ? (
          <p className="mt-6 max-w-[58ch] text-[18px] leading-[1.6] text-sand-800">{standfirst}</p>
        ) : null}
      </Shell>
    </section>
  );
}

export function PillLink({
  href,
  children,
  variant = "gold",
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "green" | "outlineLight" | "outlineGold";
}) {
  const variants = {
    gold: "bg-gold-400 text-green-900 hover:bg-gold-300",
    green: "bg-green-800 text-white hover:bg-green-700",
    outlineLight: "border border-white/45 text-sand-100 hover:bg-white/10",
    outlineGold: "border border-gold-300/45 text-gold-300 hover:bg-gold-300/10",
  } as const;
  return (
    <Link
      href={href}
      className={
        "inline-flex items-center rounded-full px-7 py-4 text-[15px] font-bold no-underline transition-colors " +
        variants[variant]
      }
    >
      {children}
    </Link>
  );
}

export function Rule({ children }: { children: ReactNode }) {
  return <div className="border-t-2 border-green-800 pt-4">{children}</div>;
}

export function Quote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <blockquote
      className={
        "border-l-[3px] border-gold-400 pl-4 text-[clamp(18px,2vw,24px)] font-extrabold leading-[1.24] " + className
      }
    >
      {children}
    </blockquote>
  );
}
