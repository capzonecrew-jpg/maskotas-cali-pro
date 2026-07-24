import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog veterinario | Consejos para mascotas en Cali — Maskotas" },
      {
        name: "description",
        content:
          "Consejos veterinarios sobre cuidado de cachorros, vacunación, alimentación y bienestar animal. Blog de la Clínica Veterinaria Maskotas en Cali.",
      },
      { property: "og:title", content: "Blog — Clínica Maskotas" },
      { property: "og:description", content: "Consejos veterinarios para tu mascota." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: () => <ComingSoon title="Blog" />,
});
