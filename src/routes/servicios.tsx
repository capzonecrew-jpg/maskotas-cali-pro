import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios veterinarios en Cali | Clínica Maskotas" },
      {
        name: "description",
        content:
          "Consulta, vacunación, cirugías, laboratorio, ecografía, urgencias, spa y pet shop en el sur de Cali. Clínica Veterinaria Maskotas.",
      },
      { property: "og:title", content: "Servicios — Clínica Veterinaria Maskotas" },
      { property: "og:description", content: "Servicios veterinarios integrales en Cali." },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: () => <ComingSoon title="Servicios" />,
});
