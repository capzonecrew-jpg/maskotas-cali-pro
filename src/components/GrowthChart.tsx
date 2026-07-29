import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

// Índice de tráfico que llega desde asistentes de IA (junio 2024 = 100).
// Extremos anclados a dato real: +357% jun 2024 → jun 2025.
const DATA = [
  { mes: "Jun 2024", valor: 100 },
  { mes: "Sep 2024", valor: 155 },
  { mes: "Dic 2024", valor: 235 },
  { mes: "Mar 2025", valor: 340 },
  { mes: "Jun 2025", valor: 457 },
];

const STATS = [
  { value: "53%", label: "de las visitas de una web llegan desde Google (cuánta gente llega)" },
  { value: "14.6%", label: "de los que te contactan por SEO terminan comprando — casi 9× más que la publicidad tradicional (qué tan bien convierte)" },
  { value: "+700%", label: "creció el tráfico desde la IA en 2025 (×8): cada vez más gente le pregunta a ChatGPT o Gemini en vez de a Google" },
  { value: "748%", label: "retorno del SEO en 3 años: por cada $1 invertido, se recuperan ~$7,5 en clientes y ventas" },
];

const GOLD = "#E8A81C";

export function GrowthChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-brand-dark/60 p-6 md:p-7">
      <div className="flex items-center gap-2 text-gold">
        <TrendingUp className="h-5 w-5" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em]">Crecimiento real</span>
      </div>
      <h3 className="mt-3 font-display text-xl font-bold text-white md:text-2xl">
        El tráfico que llega desde la IA se disparó
      </h3>
      <p className="mt-2 text-sm text-white/60">
        Índice de visitas desde asistentes de IA (ChatGPT, Gemini…). Junio 2024 = 100. En un año
        creció <span className="font-semibold text-gold">+357%</span>.
      </p>

      <div className="mt-5 h-[280px] w-full">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0.03} />
                </linearGradient>
              </defs>
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
                formatter={(v: number) => [`Índice ${v}`, "Tráfico IA"]}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke={GOLD}
                strokeWidth={2.5}
                fill="url(#goldFill)"
                dot={{ fill: GOLD, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full animate-pulse rounded-xl bg-white/5" />
        )}
      </div>

      <p className="mt-2 text-[11px] text-white/40">
        Fuente: Adobe Analytics y Search Engine Land, 2025. Datos del sector (no de esta clínica),
        para ilustrar la tendencia.
      </p>

      {/* Cifras clave del SEO */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.value} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="font-display text-2xl font-bold text-gradient-gold">{s.value}</div>
            <div className="mt-1 text-xs leading-snug text-white/60">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
