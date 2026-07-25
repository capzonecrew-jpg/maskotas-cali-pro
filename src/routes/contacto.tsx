import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Truck,
  MessageCircle,
  Instagram,
  Send,
} from "lucide-react";
import { SITE, waLink, telLink, formatPhone } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import heroBg from "@/assets/real-vet-dog.jpg";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Clínica Veterinaria Maskotas — Cali" },
      {
        name: "description",
        content:
          "Contáctanos: WhatsApp 313 789 3355, citas 313 789 3303, domicilios 602 330 2209. Calle 13b #70-73, Quintas de Don Simón, Cali. Lun–Sáb 8:00 a.m. – 5:30 p.m.",
      },
      { property: "og:title", content: "Contacto — Clínica Maskotas Cali" },
      { property: "og:description", content: "Teléfonos, WhatsApp, dirección y mapa en Cali." },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  const [name, setName] = useState("");
  const [pet, setPet] = useState("");
  const [reason, setReason] = useState("Consulta general");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola, soy ${name || "un cliente"}.
Mascota: ${pet || "no especificada"}
Motivo: ${reason}
Mensaje: ${message || "Quiero más información."}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHero
        kicker="Contacto"
        bgImage={heroBg}
        bgAlt="Veterinario atendiendo a un perro en la clínica"
        title={
          <>
            Estamos aquí para{" "}
            <span className="text-gradient-gold">ayudarte</span>
          </>
        }
        subtitle="Agenda tu cita, pide un domicilio o resuelve tus dudas. Te respondemos rápido, en horario de atención."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Info */}
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-dark sm:text-3xl">
                Datos de contacto
              </h2>
              <ul className="mt-6 space-y-5 text-sm">
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
                    <div className="flex flex-col">
                      {SITE.phonesCitas.map((p) => (
                        <a
                          key={p}
                          href={telLink(p)}
                          className="text-muted-foreground transition-colors hover:text-brand"
                        >
                          {formatPhone(p)}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <div className="font-semibold text-brand-dark">Domicilios</div>
                    <div className="flex flex-col">
                      {SITE.phonesDomicilios.map((p) => (
                        <a
                          key={p}
                          href={telLink(p)}
                          className="text-muted-foreground transition-colors hover:text-brand"
                        >
                          {formatPhone(p)}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp {SITE.whatsappDisplay}
                </a>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-5 py-3 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                  @{SITE.instagram}
                </a>
              </div>

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-lg">
                <iframe
                  title="Mapa Clínica Veterinaria Maskotas — Cali"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    SITE.address + ", " + SITE.city + ", " + SITE.country,
                  )}&output=embed`}
                  loading="lazy"
                  className="h-[300px] w-full border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold text-brand-dark sm:text-3xl">
                Escríbenos
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Completa el formulario y se abrirá WhatsApp con tu mensaje listo para enviar.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Tu nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Alexandra Cuartas"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label htmlFor="pet" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Nombre de tu mascota
                  </label>
                  <input
                    id="pet"
                    type="text"
                    value={pet}
                    onChange={(e) => setPet(e.target.value)}
                    placeholder="Ej: Rocco (perro, 3 años)"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Motivo
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  >
                    <option>Consulta general</option>
                    <option>Vacunación</option>
                    <option>Cirugía o esterilización</option>
                    <option>Peluquería y spa</option>
                    <option>Urgencia</option>
                    <option>Domicilio / Pet shop</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-dark">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Cuéntanos qué necesitas..."
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  <Send className="h-4 w-4" />
                  Enviar por WhatsApp
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
