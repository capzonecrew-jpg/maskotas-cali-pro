import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, MessageCircle, Printer, ExternalLink, Tag } from "lucide-react";
import { SITE } from "@/lib/site";
import { PROPOSAL } from "@/config/proposal";
import { GrowthChart } from "@/components/GrowthChart";
import { ProjectionChart } from "@/components/ProjectionChart";
import logo from "@/assets/logo-maskotas.jpeg";

// WhatsApp hacia TU número (el de la propuesta), no el de la clínica.
const waTo = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export const Route = createFileRoute("/propuesta")({
  head: () => ({
    meta: [
      { title: "Propuesta · Sitio web para Clínica Maskotas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Propuesta,
});

function Propuesta() {
  const p = PROPOSAL;
  return (
    <div className="proposal-root min-h-screen bg-brand-dark text-white">
      {/* Barra de acciones (no sale al imprimir) */}
      <div className="no-print sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-brand-dark/90 px-5 py-3 backdrop-blur">
        <a
          href={p.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold"
        >
          <ExternalLink className="h-4 w-4" /> Ver el demo
        </a>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
        >
          <Printer className="h-4 w-4" /> Descargar PDF
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        {/* Encabezado */}
        <header className="text-center">
          <div className="flex items-center justify-center gap-3">
            <img src={logo} alt={SITE.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/60" />
            <span className="font-display text-2xl font-bold text-white">Maskotas</span>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-gold">Propuesta de sitio web</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Lleve su clínica veterinaria <span className="text-gradient-gold">a internet</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {p.intro}
          </p>
          <p className="mt-6 text-sm text-white/60">
            Preparada para <b className="text-white">{p.preparedFor}</b> · {p.date}
          </p>

          <div className="no-print mt-8 flex justify-center">
            <a
              href={p.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-gold animate-gold-pulse group inline-flex items-center gap-3 rounded-full px-10 py-5 text-lg font-bold sm:text-xl"
            >
              <ExternalLink className="h-6 w-6" /> Ver el demo del sitio web
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </header>

        {/* Por qué */}
        <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.why.map((w, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Sparkles className="h-6 w-6 text-gold" />
              <p className="mt-3 font-semibold text-white">{w.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/60">{w.text}</p>
            </div>
          ))}
        </section>

        {/* SEO + GEO */}
        <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">{p.seoGeo.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{p.seoGeo.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70">{p.seoGeo.intro}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {p.seoGeo.items.map((it, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-brand-dark/60 p-6">
                <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-widest text-brand-dark">
                  {it.tag}
                </span>
                <p className="mt-3 font-display text-2xl font-bold text-white">{it.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{it.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-7 rounded-2xl border border-gold/60 bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-white/90">
            ✦ {p.seoGeo.closing}
          </p>

          <GrowthChart />
        </section>

        {/* Proyección para la clínica */}
        <ProjectionChart />

        {/* Cierre / contacto */}
        <section className="mt-20 rounded-3xl border border-gold bg-white/[0.03] p-8 text-center md:p-12">
          <h2 className="font-display text-3xl font-bold text-gradient-gold">¿Damos el siguiente paso?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Puedo mostrarle el demo funcionando en su celular hoy mismo. Sin compromiso.
          </p>
          <a
            href={waTo(
              p.contact.phone,
              "Hola Samuel y Juan Sebastián, me interesó la propuesta del sitio web para la clínica veterinaria.",
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-gold no-print group mt-7 inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold"
          >
            Conversemos por WhatsApp
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>

          <div className="no-print mt-5">
            <Link
              to="/precios"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-white"
            >
              <Tag className="h-4 w-4" /> Ver planes y precios
            </Link>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">
            <p className="text-white">{p.contact.name}</p>
            <p>
              {p.contact.phone}
              {p.contact.email ? ` · ${p.contact.email}` : ""}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
