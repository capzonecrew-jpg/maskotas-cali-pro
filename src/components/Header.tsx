import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE, telLink, waLink } from "@/lib/site";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/pet-shop", label: "Pet Shop" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
] as const;

function PawLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <ellipse cx="7" cy="8" rx="1.8" ry="2.4" />
      <ellipse cx="12" cy="6" rx="1.8" ry="2.6" />
      <ellipse cx="17" cy="8" rx="1.8" ry="2.4" />
      <ellipse cx="4.5" cy="13" rx="1.5" ry="2" />
      <path d="M12 12c-3.2 0-5.5 2.4-5.5 5 0 2.2 2 3 5.5 3s5.5-.8 5.5-3c0-2.6-2.3-5-5.5-5z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl shadow-sm"
          : "bg-background/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-white shadow-md">
            <PawLogo className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-brand">Maskotas</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Clínica Veterinaria
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="link-underline text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telLink(SITE.phonesCitas[0])}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
          >
            <Phone className="h-4 w-4" />
            313 789 3303
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Agendar cita
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-brand"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Agendar cita por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}