import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowLeft, MessageCircle, Printer, Star, Repeat, Info } from "lucide-react";
import { PROPOSAL, type Plan } from "@/config/proposal";
import logo from "@/assets/logo-maskotas.jpeg";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Planes y precios · Sitio web para Clínica Maskotas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Precios,
});

const waTo = (phone: string, text: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

function PlanCard({ plan }: { plan: Plan }) {
  const hi = plan.recommended;
  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-7 ${
        hi ? "border-gold bg-white/[0.07]" : "border-white/10 bg-white/[0.03]"
      }`}
      style={hi ? { boxShadow: "0 0 45px rgba(232,168,28,0.2)" } : undefined}
    >
      {hi && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
          <Star className="h-3.5 w-3.5" /> Más pedido
        </span>
      )}
      <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
      <p className="mt-1 min-h-[42px] text-sm text-white/60">{plan.tagline}</p>

      <div className="mt-5 border-y border-white/10 py-5">
        <p className="text-xs uppercase tracking-wider text-white/50">Instalación (única vez)</p>
        <p className="font-display text-3xl font-bold text-gradient-gold">{fmt(plan.setup)}</p>
        <p className="mt-3 text-xs uppercase tracking-wider text-white/50">Mensualidad</p>
        <p className="text-xl font-semibold text-white">
          {fmt(plan.monthly)} <span className="text-sm font-normal text-white/50">/ mes</span>
        </p>
      </div>

      <ul className="mt-5 flex-1 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-white/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href={waTo(
          PROPOSAL.contact.phone,
          `Hola Samuel y Juan Sebastián, me interesa el plan "${plan.name}" para la página web.`,
        )}
        target="_blank"
        rel="noreferrer"
        className={`no-print mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-transform hover:scale-[1.02] ${
          hi ? "btn-gold" : "border border-white/25 text-white hover:border-gold hover:text-gold"
        }`}
      >
        <MessageCircle className="h-4 w-4" /> Quiero este plan
      </a>
    </div>
  );
}

function Precios() {
  const p = PROPOSAL;
  return (
    <div className="proposal-root min-h-screen bg-brand-dark text-white">
      {/* Barra de acciones */}
      <div className="no-print sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-brand-dark/90 px-5 py-3 backdrop-blur">
        <Link
          to="/propuesta"
          className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la propuesta
        </Link>
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
          <p className="mt-8 text-xs uppercase tracking-[0.35em] text-gold">Planes y precios</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Elige el plan <span className="text-gradient-gold">ideal para ti</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Tres opciones, del más sencillo al más completo. Todas incluyen alojamiento, soporte y una
            web hecha para vender. Puedes empezar por una y subir de plan cuando quieras.
          </p>
        </header>

        {/* Planes */}
        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {p.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </section>

        <div className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="text-sm leading-relaxed text-white/90">
            <span className="font-semibold text-gold">Importante: </span>
            {p.priceNote}
          </p>
        </div>

        {/* ¿Para qué sirve la mensualidad? */}
        <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="flex items-center gap-2 text-gold">
            <Repeat className="h-5 w-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">Mensualidad</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">{p.monthlyInfo.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
            {p.monthlyInfo.intro}
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {p.monthlyInfo.items.map((it, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-brand-dark/60 p-5">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-gold" />
                  <span className="font-semibold text-white">{it.title}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{it.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cierre */}
        <section className="mt-16 rounded-3xl border border-gold bg-white/[0.03] p-8 text-center md:p-12">
          <h2 className="font-display text-3xl font-bold text-gradient-gold">¿Cuál te sirve más?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            Escríbeme y te ayudo a elegir el plan según lo que necesitas. Sin compromiso.
          </p>
          <a
            href={waTo(p.contact.phone, "Hola Samuel y Juan Sebastián, quiero información sobre los planes y precios.")}
            target="_blank"
            rel="noreferrer"
            className="btn-gold no-print mt-7 inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold"
          >
            <MessageCircle className="h-5 w-5" /> Conversemos por WhatsApp
          </a>
          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/60">
            <p className="text-white">{p.contact.name}</p>
            <p>{p.contact.phone}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
