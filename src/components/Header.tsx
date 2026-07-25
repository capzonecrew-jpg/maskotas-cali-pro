import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE, telLink, waLink } from "@/lib/site";
import logo from "@/assets/logo-maskotas.jpeg";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/pet-shop", label: "Pet Shop" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
] as const;

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
          <img
            src={logo}
            alt="Logo Clínica Veterinaria Maskotas"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover shadow-md ring-2 ring-gold/60"
          />
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