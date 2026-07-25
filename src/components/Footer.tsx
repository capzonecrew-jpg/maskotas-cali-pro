import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { SITE, waLink, telLink, formatPhone } from "@/lib/site";
import logo from "@/assets/logo-maskotas.jpeg";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white/80">
      <div className="absolute inset-0 opacity-40">
        <div className="hero-aurora" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt="Logo Clínica Veterinaria Maskotas"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-gold/60"
            />
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
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 transition-colors hover:text-gold"
            >
              @{SITE.instagram}
            </a>
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