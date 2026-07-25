import { Tag, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { usePromos } from "@/lib/promos";

export function Promotions() {
  const { loaded, generalPromos } = usePromos();

  // Se oculta por completo si no hay promociones generales activas.
  if (!loaded || generalPromos.length === 0) return null;

  return (
    <section id="promociones" className="bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand">
            <Tag className="h-4 w-4" />
            Promociones
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark sm:text-4xl md:text-5xl">
            Aprovecha nuestras <span className="text-gradient-gold">ofertas</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Promociones vigentes para consentir a tu mascota. Escríbenos por WhatsApp para más
            información.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {generalPromos.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <div className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
                {p.image_url && (
                  <figure className="img-hover-zoom relative aspect-[16/10]">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-brand-dark shadow">
                        {p.badge}
                      </span>
                    )}
                  </figure>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {!p.image_url && p.badge && (
                    <span className="mb-3 inline-flex w-fit rounded-full bg-gold px-3 py-1 text-xs font-bold text-brand-dark">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-brand-dark">{p.title}</h3>
                  {p.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  )}
                  <a
                    href={waLink(`Hola, quiero aprovechar la promoción: ${p.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-gold"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Quiero esta promo
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
