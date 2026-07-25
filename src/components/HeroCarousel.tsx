import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "@/assets/real-vet-dog.jpg";
import slide2 from "@/assets/real-diagnostic.jpg";
import slide3 from "@/assets/real-grooming.jpg";

export type HeroSlide = {
  image: string;
  alt: string;
  kicker: string;
  title: ReactNode;
  subtitle: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: slide1,
    alt: "Médico veterinario examinando a un perro durante una consulta",
    kicker: "Atención médica",
    title: (
      <>
        Cuidado veterinario <span className="text-gradient-gold">especializado</span> en Cali
      </>
    ),
    subtitle:
      "Consulta, vacunación y seguimiento con la calidez de una familia.",
  },
  {
    image: slide2,
    alt: "Especialista veterinario analizando imágenes de diagnóstico y radiografías",
    kicker: "Tecnología",
    title: (
      <>
        Tecnología de <span className="text-gradient-gold">hospital</span> para tu mascota
      </>
    ),
    subtitle:
      "Laboratorio propio, ecografía y cirugías avanzadas en un solo lugar.",
  },
  {
    image: slide3,
    alt: "Perro pequeño siendo peluqueado en el spa de mascotas",
    kicker: "Peluquería y spa",
    title: (
      <>
        Peluquería y <span className="text-gradient-gold">spa</span> que consienten a tu mascota
      </>
    ),
    subtitle:
      "Baño, corte y estética con productos hipoalergénicos.",
  },
];

const AUTOPLAY_MS = 5000;

type Props = {
  index: number;
  onChange: (i: number) => void;
};

export function HeroCarousel({ index, onChange }: Props) {
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      onChange((index + 1) % HERO_SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, paused, onChange]);

  const go = (next: number) => {
    const total = HERO_SLIDES.length;
    onChange((next + total) % total);
  };

  return (
    <div
      className="relative animate-fade-up"
      style={{ animationDelay: "150ms" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-gold/30 via-transparent to-white/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl aspect-[4/3]">
        {HERO_SLIDES.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.image}
              className="absolute inset-0 transition-opacity duration-1000 ease-out"
              style={{ opacity: active ? 1 : 0 }}
              aria-hidden={!active}
            >
              <img
                src={s.image}
                alt={s.alt}
                width={1600}
                height={1200}
                loading={i === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover ${active ? "animate-ken-burns" : ""}`}
                key={active ? `active-${i}` : `idle-${i}`}
              />
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />

        {/* Arrows */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Imagen anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-brand-dark/40 text-white backdrop-blur transition hover:bg-gold hover:text-brand-dark hover:border-gold"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Imagen siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-brand-dark/40 text-white backdrop-blur transition hover:bg-gold hover:text-brand-dark hover:border-gold"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-gold" : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}