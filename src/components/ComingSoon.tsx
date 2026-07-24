import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import { PawsBackdrop } from "@/components/PawsBackdrop";

export function ComingSoon({ title }: { title: string }) {
  return (
    <section className="relative overflow-hidden gradient-brand py-24 text-white md:py-32">
      <div className="hero-aurora" />
      <PawsBackdrop />
      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
          Próximamente
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          {title} · <span className="text-gradient-gold">en construcción</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/80">
          Estamos preparando esta sección con mucho cariño. Mientras tanto, escríbenos por
          WhatsApp y con gusto te atendemos.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" />
            Escribir por WhatsApp
          </a>
          <Link
            to="/"
            className="btn-outline-white inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
          >
            Volver al inicio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
