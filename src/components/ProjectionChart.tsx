import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LineChart as LineIcon } from "lucide-react";

// Proyección ESTIMADA de clientes nuevos por internet al mes.
// La curva sigue el ritmo real del SEO: lento al inicio, despega entre el mes 3 y 6.
const DATA = [
  { mes: "Hoy", valor: 2 },
  { mes: "Mes 3", valor: 6 },
  { mes: "Mes 6", valor: 14 },
  { mes: "Mes 9", valor: 23 },
  { mes: "Mes 12", valor: 32 },
];

// Cada cuadro explica qué pasa en esa etapa.
const PHASES = [
  {
    tag: "Mes 1 – 3",
    title: "Arranque",
    text: "Aparecen en Google Maps y la web empieza a indexarse. Se sientan las bases del posicionamiento; aún llegan pocos clientes nuevos.",
  },
  {
    tag: "Mes 3 – 6",
    title: "Despegue",
    text: "Empiezan a llegar los primeros clientes nuevos que los encontraron buscando en Google o preguntándole a la IA.",
  },
  {
    tag: "Mes 6 – 12",
    title: "Consolidación",
    text: "Posicionados en las búsquedas clave de Cali, con un flujo constante de clientes y la web trabajando sola.",
  },
];

const GOLD = "#E8A81C";

export function ProjectionChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
      <div className="flex items-center gap-2 text-gold">
        <LineIcon className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-[0.35em]">Proyección</span>
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
        Lo que podría pasar con <span className="text-gradient-gold">su clínica</span>
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70">
        Así se vería el crecimiento de clientes nuevos que llegan por internet al activar el SEO +
        GEO. El SEO no es inmediato: arranca lento y despega entre el mes 3 y 6.
      </p>

      {/* Gráfica */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-brand-dark/60 p-6">
        <p className="text-sm font-semibold text-white">
          Clientes nuevos por internet al mes <span className="text-white/50">(estimado)</span>
        </p>
        <div className="mt-4 h-[280px] w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA} margin={{ top: 10, right: 15, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                />
                <Tooltip
                  cursor={{ stroke: GOLD, strokeWidth: 1, strokeDasharray: "4 4" }}
                  contentStyle={{
                    background: "#1A1526",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12,
                    color: "#fff",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                  formatter={(v: number) => [`~${v} clientes`, "Estimado"]}
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke={GOLD}
                  strokeWidth={2.5}
                  strokeDasharray="7 5"
                  dot={{ fill: GOLD, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full animate-pulse rounded-xl bg-white/5" />
          )}
        </div>
        <p className="mt-2 text-[11px] text-white/40">
          Línea punteada = proyección estimada, no es una garantía. Basada en los tiempos reales del
          SEO (resultados en 3–6 meses, fuertes en 6–12) y en el crecimiento del sector.
        </p>
      </div>

      {/* Etapas explicadas */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {PHASES.map((ph) => (
          <div key={ph.tag} className="rounded-2xl border border-white/10 bg-brand-dark/60 p-6">
            <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-wide text-brand-dark">
              {ph.tag}
            </span>
            <p className="mt-3 font-display text-xl font-bold text-white">{ph.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{ph.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
