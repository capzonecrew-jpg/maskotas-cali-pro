import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Info, ShieldCheck, Award, CheckCircle2, PawPrint, Plus, Trash2 } from "lucide-react";
import { waLink } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { EditableText, EditableImage, useEdit, useEditableList } from "@/lib/editing";
import { SERVICE_GROUPS, serviceId } from "@/lib/catalog";
import { usePromos } from "@/lib/promos";
import { PromoRibbon, PromoNote } from "@/components/PromoTag";
import heroBg from "@/assets/real-vet-dog.jpg";
import rinoplastia from "@/assets/real-rinoplastia.jpeg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios veterinarios en Cali y precios | Clínica Maskotas" },
      {
        name: "description",
        content:
          "Consulta, vacunación, esterilización, cirugías, laboratorio, ecografía, urgencias, odontología, spa y pet shop en el sur de Cali. Precios de referencia y agenda por WhatsApp.",
      },
      { property: "og:title", content: "Servicios y precios — Clínica Veterinaria Maskotas" },
      { property: "og:description", content: "Servicios veterinarios integrales en Cali con precios de referencia." },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: Servicios,
});

type AddedSvc = { id: string; gi: number };

function Servicios() {
  const { getPromoFor } = usePromos();
  const { editing } = useEdit();
  const { items: added, setItems: setAdded } = useEditableList<AddedSvc>("svc-added");
  const { items: deleted, setItems: setDeleted } = useEditableList<string>("svc-deleted");

  const addService = (gi: number) =>
    setAdded([...added, { id: `svc-x-${Date.now()}`, gi }]);
  const deleteService = (id: string, isAdded: boolean) => {
    if (!confirm("¿Eliminar esta tarjeta?")) return;
    if (isAdded) setAdded(added.filter((a) => a.id !== id));
    else setDeleted([...deleted, id]);
  };

  return (
    <>
      <PageHero
        kicker="Servicios"
        bgImage={heroBg}
        bgAlt="Veterinario examinando a un perro en consulta"
        title={
          <>
            Todo para la salud de tu mascota,{" "}
            <span className="text-gradient-gold">en un solo lugar</span>
          </>
        }
        subtitle="Medicina, cirugía, diagnóstico, estética y pet shop con estándares clínicos. Estos son nuestros servicios y precios de referencia."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        {/* Navegación rápida por categorías */}
        <Reveal>
          <nav className="mb-12 flex flex-wrap justify-center gap-2">
            {SERVICE_GROUPS.map((g, gi) => (
              <a
                key={g.label}
                href={`#grupo-${gi}`}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white"
              >
                {g.label}
              </a>
            ))}
          </nav>
        </Reveal>

        {SERVICE_GROUPS.map((group, gi) => (
          <div
            key={group.label}
            id={`grupo-${gi}`}
            className={`scroll-mt-24 ${gi > 0 ? "mt-16" : ""}`}
          >
            <Reveal>
              <div className="flex items-center gap-4">
                <EditableText
                  as="h2"
                  id={`svc-g${gi}-label`}
                  className="font-display text-2xl font-bold text-brand-dark sm:text-3xl"
                >
                  {group.label}
                </EditableText>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ...group.services.map((s, i) => ({ ...s, id: serviceId(gi, i), isAdded: false })),
                ...added
                  .filter((a) => a.gi === gi)
                  .map((a) => ({
                    id: a.id,
                    isAdded: true,
                    icon: PawPrint,
                    title: "Nuevo servicio",
                    desc: "Describe este servicio aquí.",
                    price: "desde $0",
                    image: "",
                    trust: undefined as string | undefined,
                  })),
              ]
                .filter((it) => !deleted.includes(it.id))
                .map(({ icon: Icon, title, desc, price, image, id, isAdded, trust }, i) => {
                  const promo = getPromoFor(id);
                  return (
                    <Reveal key={id} delay={(i % 3) * 90}>
                      <div
                        className={`card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white ${
                          promo ? "border-gold ring-2 ring-gold/60" : "border-border"
                        }`}
                      >
                        {editing && (
                          <button
                            onClick={() => deleteService(id, isAdded)}
                            title="Eliminar tarjeta"
                            className="absolute right-2 top-2 z-30 grid h-8 w-8 place-items-center rounded-lg bg-white/95 text-foreground/70 shadow hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                        <figure className="img-hover-zoom relative aspect-[16/10]">
                          {promo && <PromoRibbon promo={promo} />}
                          <EditableImage
                            id={`${id}-img`}
                            defaultSrc={image || undefined}
                            alt={title}
                            className="h-full w-full object-cover"
                            placeholder={
                              <div className="grid h-full w-full place-items-center bg-secondary text-brand/40">
                                <PawPrint className="h-10 w-10" />
                              </div>
                            }
                          />
                          <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1.5 text-sm font-bold text-brand-dark shadow-md">
                            <EditableText id={`${id}-price`}>{price}</EditableText>
                          </span>
                        </figure>
                        <div className="flex flex-1 flex-col p-6">
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-gold group-hover:text-brand-dark">
                              <Icon className="h-5 w-5" />
                            </div>
                            <EditableText
                              as="h3"
                              id={`${id}-title`}
                              className="text-lg font-semibold text-brand-dark"
                            >
                              {title}
                            </EditableText>
                          </div>
                          <EditableText
                            as="p"
                            id={`${id}-desc`}
                            multiline
                            className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground"
                          >
                            {desc}
                          </EditableText>
                          {trust && (
                            <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-brand">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              {trust}
                            </div>
                          )}
                          {promo && <PromoNote promo={promo} />}
                          <a
                            href={waLink(`Hola, quiero información sobre: ${title}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-dark"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Consultar por WhatsApp
                          </a>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              {editing && (
                <button
                  onClick={() => addService(gi)}
                  className="flex min-h-[220px] items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand/30 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand/5"
                >
                  <Plus className="h-5 w-5" /> Agregar servicio
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Caso real */}
        <Reveal>
          <div className="card-lift mt-16 overflow-hidden rounded-3xl border border-border bg-white shadow-sm lg:grid lg:grid-cols-2">
            <figure className="img-hover-zoom relative">
              <img
                src={rinoplastia}
                alt="Caso real de rinoplastia canina (antes y después) en Clínica Maskotas Cali"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-brand-dark">
                Caso real · Antes y después
              </figcaption>
            </figure>
            <div className="p-7 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                <Award className="h-3.5 w-3.5" />
                Cirugía especializada
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-brand-dark sm:text-3xl">
                Rinoplastia canina
              </h3>
              <p className="mt-1 text-sm font-semibold text-gold">
                Especialidad poco común en la región
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Un procedimiento que corrige las vías respiratorias en razas braquicéfalas (como
                Bulldog Francés) para que respiren mejor y mejoren su calidad de vida. Es una cirugía
                que pocas clínicas de la región realizan, y aquí la hacemos con protocolo anestésico
                seguro y seguimiento completo.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-foreground/85">
                {[
                  "Mejora la respiración y la tolerancia al ejercicio",
                  "Reduce el ronquido y el riesgo de golpe de calor",
                  "Recuperación acompañada paso a paso",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={waLink("Hola, quiero información sobre cirugía de rinoplastia para mi mascota.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar este caso
              </a>
            </div>
          </div>
        </Reveal>

        {/* Disclaimer */}
        <Reveal>
          <div className="mt-14 flex items-start gap-3 rounded-2xl border border-border bg-secondary/60 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-brand-dark">Precios de referencia.</span> El valor
              final puede variar según el tamaño, la raza, la edad y el estado de salud de tu
              mascota. Escríbenos por WhatsApp y te damos el valor exacto sin compromiso.
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden gradient-brand py-16 md:py-24">
        <div className="hero-aurora" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Cuéntanos el caso de tu mascota
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Escríbenos por WhatsApp y te respondemos con el valor exacto y la orientación que
              necesitas — rápido, en horario de atención.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold animate-gold-pulse mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              Agendar cita por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
