import { createFileRoute } from "@tanstack/react-router";
import { Clock, ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import heroBg from "@/assets/real-vet-cat.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog veterinario | Consejos para mascotas en Cali — Maskotas" },
      {
        name: "description",
        content:
          "Consejos veterinarios sobre cuidado de cachorros, vacunación, alimentación, salud dental y bienestar animal. Blog de la Clínica Veterinaria Maskotas en Cali.",
      },
      { property: "og:title", content: "Blog — Clínica Maskotas" },
      { property: "og:description", content: "Consejos veterinarios para el cuidado de tu mascota." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

type Post = {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  tone: "brand" | "gold";
};

const POSTS: Post[] = [
  {
    category: "Cachorros",
    title: "Guía completa para el primer mes de tu cachorro",
    excerpt:
      "Vacunas, desparasitación, alimentación y socialización: lo esencial para que tu cachorro crezca sano y feliz desde el primer día.",
    readTime: "5 min",
    tone: "brand",
  },
  {
    category: "Prevención",
    title: "Calendario de vacunación para perros y gatos",
    excerpt:
      "Cuándo aplicar cada vacuna, por qué es importante el refuerzo anual y cómo proteger a tu mascota de enfermedades comunes en Cali.",
    readTime: "4 min",
    tone: "gold",
  },
  {
    category: "Nutrición",
    title: "¿Cómo elegir el mejor alimento para tu mascota?",
    excerpt:
      "Concentrado premium, dietas medicadas y porciones según edad y peso. Te explicamos cómo leer las etiquetas y evitar errores frecuentes.",
    readTime: "6 min",
    tone: "brand",
  },
  {
    category: "Salud dental",
    title: "Mal aliento en tu perro: cuándo preocuparse",
    excerpt:
      "El sarro no es solo estético. Descubre las señales de enfermedad dental y por qué la profilaxis puede alargar la vida de tu mascota.",
    readTime: "4 min",
    tone: "gold",
  },
  {
    category: "Bienestar",
    title: "Señales de que tu mascota necesita ir al veterinario",
    excerpt:
      "Cambios en el apetito, la energía o el comportamiento. Aprende a identificar las alertas tempranas antes de que sea una urgencia.",
    readTime: "5 min",
    tone: "brand",
  },
  {
    category: "Estética",
    title: "Cada cuánto bañar a tu perro sin dañar su piel",
    excerpt:
      "La frecuencia ideal según raza y tipo de pelaje, y por qué el shampoo humano puede ser un problema para tu mascota.",
    readTime: "3 min",
    tone: "gold",
  },
];

function Blog() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <PageHero
        kicker="Blog"
        bgImage={heroBg}
        bgAlt="Gato siendo revisado por un veterinario"
        title={
          <>
            Consejos para el cuidado de{" "}
            <span className="text-gradient-gold">tu mascota</span>
          </>
        }
        subtitle="Artículos prácticos escritos por nuestro equipo veterinario para que cuides mejor a quien más quieres."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        {/* Featured */}
        <Reveal>
          <article className="card-lift group grid overflow-hidden rounded-3xl border border-border bg-white lg:grid-cols-2">
            <div className="grid min-h-[240px] place-items-center gradient-brand p-8">
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
                Destacado
              </span>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-brand">
                {featured.category}
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-brand-dark sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Leer artículo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        </Reveal>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.title} delay={(i % 3) * 90}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white">
                <div
                  className={`grid aspect-[16/9] w-full place-items-center ${
                    post.tone === "gold" ? "bg-gold/15 text-gold" : "bg-brand/10 text-brand"
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} de lectura
                  </div>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-brand-dark">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors group-hover:text-gold">
                    Leer más
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="relative overflow-hidden gradient-brand py-16 md:py-24">
        <div className="hero-aurora" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              ¿Tienes dudas sobre la salud de tu mascota?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              No te quedes con la duda. Escríbenos por WhatsApp y nuestro equipo te orienta.
            </p>
            <a
              href={waLink("Hola, tengo una duda sobre el cuidado de mi mascota.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              Preguntar por WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
