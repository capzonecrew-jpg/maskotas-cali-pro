import type { ReactNode } from "react";
import { PawsBackdrop } from "@/components/PawsBackdrop";

type Props = {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  bgImage?: string;
  bgAlt?: string;
};

export function PageHero({ kicker, title, subtitle, bgImage, bgAlt }: Props) {
  return (
    <section className="relative overflow-hidden gradient-brand text-white">
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt={bgAlt ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Purple overlay so text stays readable (más suave para que se vea la foto) */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/55 to-brand/45" />
          <div className="absolute inset-0 bg-brand-dark/10" />
        </>
      )}
      <div className={`hero-aurora ${bgImage ? "opacity-30" : "opacity-60"}`} />
      <PawsBackdrop />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
        <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          {kicker}
        </div>
        <h1
          className="mt-5 animate-fade-up font-display text-4xl font-bold leading-[1.05] drop-shadow-sm sm:text-5xl md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mx-auto mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-white/90 sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
