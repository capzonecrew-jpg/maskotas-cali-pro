import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { SITE, waLink, telLink, formatPhone } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white/80">
      <div className="absolute inset-0 opacity-40">
        <div className="hero-aurora" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-gold">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                <ellipse cx="7" cy="8" rx="1.8" ry="2.4" />
                <ellipse cx="12" cy="6" rx="1.8" ry="2.6" />
                <ellipse cx="17" cy="8" rx="1.8" ry="2.4" />
                <ellipse cx="4.5" cy="13" rx="1.5" ry="2" />
                <path d="M12 12c-3.2 0-5.5 2.4-5.5 5 0 2.2 2 3 5.5 3s5.5-.8 5.5-3c0-2.6-2.3-5-5.5-5z" />
              </svg>
            </span>
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-white">Maskotas</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">
                {SITE.tagline}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Clínica veterinaria especializada en Cali. Cuidado médico avanzado, cercano y humano
            para tu mascota.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Navegación</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Inicio"],
              ["/servicios", "Servicios"],
              ["/nosotros", "Nosotros"],
              ["/pet-shop", "Pet Shop"],
              ["/blog", "Blog"],
              ["/contacto", "Contacto"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {SITE.address}
                <br />
                {SITE.city}, {SITE.country}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{SITE.hours}</span>
            </li>
            <li className="flex flex-col gap-1">
              <div className="text-xs uppercase tracking-wider text-white/50">Citas</div>
              {SITE.phonesCitas.map((p) => (
                <a
                  key={p}
                  href={telLink(p)}
                  className="flex items-center gap-2 text-white/80 transition-colors hover:text-gold"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {formatPhone(p)}
                </a>
              ))}
            </li>
            <li className="flex flex-col gap-1">
              <div className="text-xs uppercase tracking-wider text-white/50">Domicilios</div>
              {SITE.phonesDomicilios.map((p) => (
                <a
                  key={p}
                  href={telLink(p)}
                  className="flex items-center gap-2 text-white/80 transition-colors hover:text-gold"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {formatPhone(p)}
                </a>
              ))}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Escríbenos</h3>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp {SITE.whatsappDisplay}
          </a>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-all hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <span className="text-sm text-white/60">@{SITE.instagram}</span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</div>
          <div>Hecho con cariño en Cali 🐾</div>
        </div>
      </div>
    </footer>
  );
}