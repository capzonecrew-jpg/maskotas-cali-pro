import { createFileRoute } from "@tanstack/react-router";
import {
  HeartHandshake,
  Target,
  Eye,
  ShieldCheck,
  Sparkles,
  Users,
  Stethoscope,
  MessageCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { SITE, waLink } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { EditableText, EditableImage, useEdit, useEditableList } from "@/lib/editing";
import heroBg from "@/assets/real-surgery.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | Clínica Veterinaria Maskotas — Cali" },
      {
        name: "description",
        content:
          "Conoce al equipo médico de la Clínica Veterinaria Maskotas en Cali: Dr. Walter Gutiérrez y Dr. Tomás Pantoja. Nuestra historia, misión y valores.",
      },
      { property: "og:title", content: "Nosotros — Clínica Maskotas Cali" },
      { property: "og:description", content: "Equipo médico veterinario especializado en Cali." },
      { property: "og:url", content: "/nosotros" },
    ],
    links: [{ rel: "canonical", href: "/nosotros" }],
  }),
  component: Nosotros,
});

const VALUES = [
  { icon: HeartHandshake, title: "Trato cálido", desc: "Escuchamos, explicamos y acompañamos a cada familia sin consultas apresuradas." },
  { icon: ShieldCheck, title: "Ética y transparencia", desc: "Recomendamos solo lo que tu mascota necesita, con honestidad en cada diagnóstico." },
  { icon: Sparkles, title: "Tecnología", desc: "Invertimos en equipos de diagnóstico y quirófano para una medicina de vanguardia." },
  { icon: Stethoscope, title: "Especialización", desc: "Casos complejos que pocas clínicas de la región realizan, con criterio profesional." },
];

const TEAM = [
  { name: "Dr. Walter Gutiérrez", role: "Médico Veterinario", area: "Cirugía y medicina interna" },
  { name: "Dr. Tomás Pantoja", role: "Médico Veterinario", area: "Diagnóstico y tratamiento" },
  { name: "Equipo de peluquería", role: "Estética canina y felina", area: "Baño, corte y spa" },
  { name: "Equipo de recepción", role: "Atención al cliente", area: "Agenda, domicilios y pet shop" },
];

function Nosotros() {
  const { editing } = useEdit();
  const { items: added, setItems: setAdded } = useEditableList<{ id: string }>("team-added");
  const { items: deleted, setItems: setDeleted } = useEditableList<string>("team-deleted");

  const addMember = () => setAdded([...added, { id: `team-x-${Date.now()}` }]);
  const deleteMember = (id: string, isAdded: boolean) => {
    if (!confirm("¿Eliminar este integrante?")) return;
    if (isAdded) setAdded(added.filter((a) => a.id !== id));
    else setDeleted([...deleted, id]);
  };

  return (
    <>
      <PageHero
        kicker="Nosotros"
        bgImage={heroBg}
        bgAlt="Equipo veterinario en cirugía especializada"
        title={
          <>
            Cuidamos a tu mascota como si fuera{" "}
            <span className="text-gradient-gold">nuestra</span>
          </>
        }
        subtitle="Una clínica veterinaria especializada en Cali, donde la tecnología médica se une con un trato cercano y humano."
      />

      {/* Historia */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="text-xs font-semibold uppercase tracking-widest text-brand">
            Nuestra historia
          </div>
          <EditableText
            as="h2"
            id="nos-historia-title"
            className="mt-3 block font-display text-3xl font-bold text-brand-dark sm:text-4xl"
          >
            Medicina veterinaria con propósito
          </EditableText>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <EditableText as="p" id="nos-historia-p1" multiline>
              En la Clínica Veterinaria Especializada Maskotas nacimos con una convicción sencilla:
              las mascotas son parte de la familia y merecen la misma calidad de atención que
              cualquier miembro del hogar. Por eso combinamos veterinaria, pet shop y spa en un solo
              lugar del sur de Cali.
            </EditableText>
            <EditableText as="p" id="nos-historia-p2" multiline>
              Contamos con laboratorio propio, ecografía, quirófano equipado y un equipo médico
              dedicado a casos que requieren experiencia y precisión. Desde una consulta de rutina
              hasta cirugías especializadas, acompañamos a cada mascota con protocolos claros y
              cercanía en cada paso.
            </EditableText>
          </div>
        </Reveal>
      </section>

      {/* Misión y visión */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8">
          <Reveal>
            <div className="card-lift h-full rounded-3xl border border-border bg-white p-8">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand">
                <Target className="h-6 w-6" />
              </div>
              <EditableText
                as="h3"
                id="nos-mision-title"
                className="mt-5 block font-display text-2xl font-bold text-brand-dark"
              >
                Misión
              </EditableText>
              <EditableText
                as="p"
                id="nos-mision-text"
                multiline
                className="mt-3 block text-base leading-relaxed text-muted-foreground"
              >
                Brindar bienestar a las mascotas y sus familias a través de servicios veterinarios
                médicos, quirúrgicos y de estética, con calidad, tecnología y un trato humano que
                genere confianza.
              </EditableText>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-lift h-full rounded-3xl border border-border bg-white p-8">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/15 text-gold">
                <Eye className="h-6 w-6" />
              </div>
              <EditableText
                as="h3"
                id="nos-vision-title"
                className="mt-5 block font-display text-2xl font-bold text-brand-dark"
              >
                Visión
              </EditableText>
              <EditableText
                as="p"
                id="nos-vision-text"
                multiline
                className="mt-3 block text-base leading-relaxed text-muted-foreground"
              >
                Ser la clínica veterinaria de referencia en Cali por su atención especializada, su
                tecnología de diagnóstico y la cercanía con cada familia que confía en nosotros.
              </EditableText>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand">
            Nuestros valores
          </div>
          <EditableText
            as="h2"
            id="nos-valores-title"
            className="mt-3 block font-display text-3xl font-bold text-brand-dark sm:text-4xl"
          >
            Lo que nos guía cada día
          </EditableText>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 4) * 80}>
              <div className="card-lift h-full rounded-2xl border border-border bg-white p-6">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <EditableText
                  as="h3"
                  id={`nos-val-${i}-title`}
                  className="mt-4 block text-base font-semibold text-brand-dark"
                >
                  {title}
                </EditableText>
                <EditableText
                  as="p"
                  id={`nos-val-${i}-desc`}
                  multiline
                  className="mt-2 block text-sm leading-relaxed text-muted-foreground"
                >
                  {desc}
                </EditableText>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-brand">
              Nuestro equipo
            </div>
            <EditableText
              as="h2"
              id="nos-equipo-title"
              className="mt-3 block font-display text-3xl font-bold text-brand-dark sm:text-4xl"
            >
              Manos expertas que cuidan a tu mascota
            </EditableText>
            <EditableText as="p" id="nos-equipo-sub" multiline className="mt-4 block text-sm text-muted-foreground">
              Un equipo multidisciplinario comprometido con la salud y el bienestar animal.
            </EditableText>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ...TEAM.map((m, i) => ({ ...m, id: `team-${i}`, isAdded: false })),
              ...added.map((a) => ({
                id: a.id,
                isAdded: true,
                name: "Nuevo integrante",
                role: "Cargo",
                area: "Área o especialidad",
              })),
            ]
              .filter((it) => !deleted.includes(it.id))
              .map((m, i) => (
                <Reveal key={m.id} delay={(i % 4) * 90}>
                  <div className="card-lift relative h-full overflow-hidden rounded-2xl border border-border bg-white text-center">
                    {editing && (
                      <button
                        onClick={() => deleteMember(m.id, m.isAdded)}
                        title="Eliminar integrante"
                        className="absolute right-2 top-2 z-30 grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-foreground/70 shadow hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    <figure className="relative aspect-[4/3] w-full overflow-hidden">
                      <EditableImage
                        id={`${m.id}-photo`}
                        alt={m.name}
                        className="h-full w-full object-cover"
                        placeholder={
                          <div className="grid h-full w-full place-items-center gradient-brand">
                            <Users className="h-14 w-14 text-white/70" />
                          </div>
                        }
                      />
                    </figure>
                    <div className="p-5">
                      <EditableText as="h3" id={`${m.id}-name`} className="block font-semibold text-brand-dark">
                        {m.name}
                      </EditableText>
                      <EditableText as="div" id={`${m.id}-role`} className="mt-1 block text-sm font-medium text-brand">
                        {m.role}
                      </EditableText>
                      <EditableText as="div" id={`${m.id}-area`} className="mt-1 block text-xs text-muted-foreground">
                        {m.area}
                      </EditableText>
                    </div>
                  </div>
                </Reveal>
              ))}
            {editing && (
              <button
                onClick={addMember}
                className="flex min-h-[240px] items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/30 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/5"
              >
                <Plus className="h-5 w-5" /> Agregar integrante
              </button>
            )}
          </div>
          {editing && (
            <Reveal>
              <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-foreground">
                Sube las fotos reales del equipo con el botón "Cambiar foto".
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden gradient-brand py-16 md:py-24">
        <div className="hero-aurora" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Conócenos en {SITE.city}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Estamos en {SITE.address}. Agenda tu cita y vive la experiencia Maskotas.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              Escríbenos por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
