import { createFileRoute } from "@tanstack/react-router";
import {
  Stethoscope,
  Syringe,
  Scissors,
  FlaskConical,
  Activity,
  Bath,
  Truck,
  HeartPulse,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Sparkles,
  Award,
  Users,
  ArrowRight,
} from "lucide-react";
import heroVet from "@/assets/hero-vet.jpg";
import caseBefore from "@/assets/case-before.jpg";
import caseAfter from "@/assets/case-after.jpg";
import spaImg from "@/assets/spa.jpg";
import { SITE, waLink, telLink, formatPhone } from "@/lib/site";
import { PawsBackdrop } from "@/components/PawsBackdrop";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Veterinaria en Cali | Clínica Especializada Maskotas — Urgencias, Cirugías y Spa",
      },
      {
        name: "description",
        content:
          "Clínica veterinaria especializada en Cali, barrio Quintas de Don Simón. Consulta, cirugías, laboratorio, ecografía, urgencias, peluquería canina y domicilios. Agenda por WhatsApp.",
      },
      {
        property: "og:title",
        content: "Veterinaria en Cali | Clínica Especializada Maskotas — Urgencias, Cirugías y Spa",
      },
      {
        property: "og:description",
        content:
          "Clínica veterinaria especializada en Cali, barrio Quintas de Don Simón. Consulta, cirugías, laboratorio, ecografía, urgencias, peluquería canina y domicilios. Agenda por WhatsApp.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const SERVICES = [
  { icon: Stethoscope, title: "Consulta general", desc: "Chequeos, diagnóstico y seguimiento por médicos veterinarios." },
  { icon: Syringe, title: "Vacunación", desc: "Esquemas completos para cachorros, adultos y gatos." },
  { icon: Scissors, title: "Cirugías especializadas", desc: "Quirófano equipado y cirujano dedicado a casos complejos." },
  { icon: FlaskConical, title: "Laboratorio clínico", desc: "Resultados rápidos en nuestro laboratorio propio." },
  { icon: Activity, title: "Ecografía e imágenes", desc: "Diagnóstico por imagen con equipos de última generación." },
  { icon: HeartPulse, title: "Urgencias", desc: "Atención prioritaria cuando tu mascota más lo necesita." },
  { icon: Bath, title: "Peluquería y Spa", desc: "Baño, corte, estética y cuidado del pelaje." },
  { icon: Truck, title: "Domicilios", desc: "Consultas y entregas de pet shop directamente en tu hogar." },
];

const REASONS = [
  { icon: ShieldCheck, title: "Equipo médico especializado", desc: "Dr. Walter Gutiérrez y Dr. Tomás Pantoja, con formación en cirugía y medicina interna." },
  { icon: Sparkles, title: "Tecnología diagnóstica", desc: "Laboratorio propio, ecografía y quirófano equipado para procedimientos avanzados." },
  { icon: Clock, title: "Urgencias y respuesta rápida", desc: "Atendemos casos críticos con protocolos claros y personal preparado." },
  { icon: Truck, title: "Servicio a domicilio", desc: "Cobertura en Cali para consultas y pedidos del pet shop." },
];

const STATS = [
  { icon: Users, value: "+8.000", label: "mascotas atendidas" },
  { icon: Clock, value: "Lun-Sáb", label: "urgencias en horario de atención" },
  { icon: ShieldCheck, value: "100%", label: "equipo veterinario titulado" },
];

const TESTIMONIALS = [
  {
    name: "Ejemplo 1",
    pet: "reseña placeholder",
    text: "Texto de ejemplo: una vez que recibamos reseñas reales de nuestros clientes, lo reemplazaremos por su experiencia auténtica.",
  },
  {
    name: "Ejemplo 2",
    pet: "reseña placeholder",
    text: "Texto de ejemplo: esta casilla está reservada para una reseña verificada de una familia que haya confiado en nosotros.",
  },
  {
    name: "Ejemplo 3",
    pet: "reseña placeholder",
    text: "Texto de ejemplo: pronto compartiremos aquí testimonios reales de dueños de mascotas atendidas en Maskotas.",
  },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-brand text-white">
        <div className="hero-aurora" />
        <div className="hero-aurora-2" />
        <PawsBackdrop />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              {SITE.tagline}
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              Cuidado veterinario{" "}
              <span className="text-gradient-gold">especializado</span> en Cali
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Clínica con laboratorio propio, cirugías avanzadas, urgencias y peluquería.
              Atendemos a tu mascota con la tecnología de un hospital y la calidez de una familia.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" />
                Agendar cita por WhatsApp
              </a>
              <a
                href={telLink(SITE.phonesCitas[0])}
                className="btn-outline-white inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" />
                Llamar 313 789 3303
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span>4.9 · 300+ reseñas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Quintas de Don Simón, Cali</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gold" />
                <span>Lun–Sáb 8:00 a.m. – 5:30 p.m.</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-gold/30 via-transparent to-white/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl">
              <img
                src={heroVet}
                alt="Médico veterinario examinando un cachorro golden retriever en la Clínica Maskotas de Cali"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-brand-dark/80 p-4 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gold text-brand-dark">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60">Urgencias</div>
                  <div className="font-semibold text-white">Atención inmediata</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 80} className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-2xl font-bold text-brand-dark">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand">
            Servicios
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark sm:text-4xl md:text-5xl">
            Todo lo que tu mascota necesita, en un solo lugar
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Somos veterinaria, pet shop y spa. Cuidado integral con estándares clínicos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 4) * 90}>
              <div className="card-lift group h-full rounded-2xl border border-border bg-white p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-gold group-hover:text-brand-dark">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative overflow-hidden bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">
              Casos de éxito
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark sm:text-4xl md:text-5xl">
              Historias que nos enorgullecen
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Cirugías especializadas y recuperaciones que devuelven la sonrisa a las familias.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="card-lift overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                <div className="grid grid-cols-2 gap-0.5 bg-border">
                  <figure className="img-hover-zoom relative">
                    <img
                      src={caseBefore}
                      alt="Perro antes de tratamiento veterinario en Clínica Maskotas Cali"
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="absolute left-3 top-3 rounded-full bg-brand-dark/85 px-3 py-1 text-xs font-medium text-white">
                      Antes
                    </figcaption>
                  </figure>
                  <figure className="img-hover-zoom relative">
                    <img
                      src={caseAfter}
                      alt="Perro feliz después de cirugía especializada en Clínica Maskotas Cali"
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-brand-dark">
                      Después
                    </figcaption>
                  </figure>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Cirugía · Rinoplastia canina
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-brand-dark">
                    Rocco vuelve a respirar bien
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cirugía especializada de vías respiratorias con recuperación completa en 3
                    semanas. Un procedimiento que solo pocas clínicas en la región realizan.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="card-lift overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
                <figure className="img-hover-zoom relative">
                  <img
                    src={spaImg}
                    alt="Perro pequeño siendo peluqueado en el spa de la Clínica Maskotas Cali"
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </figure>
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                    Spa · Peluquería canina
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-brand-dark">
                    Transformaciones que enamoran
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Baño, corte y estética con productos hipoalergénicos. Un espacio pensado
                    para que tu mascota se sienta segura y feliz.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">
              Por qué elegirnos
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark sm:text-4xl md:text-5xl">
              Una clínica pensada para la salud <span className="text-gradient-gold">real</span> de tu mascota
            </h2>
            <p className="mt-5 text-base text-muted-foreground">
              Combinamos diagnóstico avanzado, cirugía especializada y un trato cálido. Nada de
              consultas apresuradas: aquí escuchamos, explicamos y acompañamos.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Hablemos por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="card-lift h-full rounded-2xl border border-border bg-white p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-brand-dark">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">
              Testimonios
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark sm:text-4xl md:text-5xl">
              Familias que ya confían en nosotros
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="card-lift h-full rounded-2xl border border-border bg-white p-6">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-border pt-4 text-sm">
                    <div className="font-semibold text-brand-dark">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.pet}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="ubicacion" className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">
              Visítanos
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark sm:text-4xl">
              En el sur de Cali, cerca de ti
            </h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <div className="font-semibold text-brand-dark">Dirección</div>
                  <div className="text-muted-foreground">
                    {SITE.address}, {SITE.city}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <div className="font-semibold text-brand-dark">Horario</div>
                  <div className="text-muted-foreground">{SITE.hours}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <div className="font-semibold text-brand-dark">Citas</div>
                  <div className="text-muted-foreground">
                    {SITE.phonesCitas.map(formatPhone).join(" · ")}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <div>
                  <div className="font-semibold text-brand-dark">Domicilios</div>
                  <div className="text-muted-foreground">
                    {SITE.phonesDomicilios.map(formatPhone).join(" · ")}
                  </div>
                </div>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" />
                Agendar por WhatsApp
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address + ", " + SITE.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-5 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
              >
                <MapPin className="h-4 w-4" />
                Ver en Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
              <iframe
                title="Mapa Clínica Veterinaria Maskotas — Cali"
                src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.address + ", " + SITE.city + ", " + SITE.country)}&output=embed`}
                loading="lazy"
                className="h-[420px] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden gradient-brand py-20 md:py-28">
        <div className="hero-aurora" />
        <PawsBackdrop />
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Tu mascota merece atención{" "}
              <span className="text-gradient-gold">especializada</span>. Hoy.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-white/85">
              Escríbenos por WhatsApp y agenda una cita con nuestro equipo médico. Respondemos
              rápido, en horario de atención.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold animate-gold-pulse inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
              >
                <MessageCircle className="h-5 w-5" />
                Agendar cita por WhatsApp
              </a>
              <a
                href={telLink(SITE.phonesCitas[0])}
                className="btn-outline-white inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
              >
                <Phone className="h-5 w-5" />
                Llamar ahora
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
