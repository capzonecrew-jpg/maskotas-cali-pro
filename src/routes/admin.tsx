import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase, ADMIN_EMAIL } from "@/lib/supabase";
import { useEdit } from "@/lib/editing";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administración · Maskotas" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { session, enterEdit } = useEdit();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Al iniciar sesión: activa modo edición y manda a la web normal.
  useEffect(() => {
    if (session) {
      enterEdit();
      navigate({ to: "/" });
    }
  }, [session]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    if (error) setError("Contraseña incorrecta. Intenta de nuevo.");
    setLoading(false);
  };

  return (
    <div className="grid min-h-[85vh] place-items-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-white p-8 shadow-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold text-brand-dark">
          Editar la página
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Ingresa la contraseña para activar el modo edición y cambiar textos, precios,
          fotos y promociones.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoFocus
              className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand"
              aria-label={show ? "Ocultar" : "Mostrar"}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
            Entrar a editar
          </button>
        </form>
      </div>
    </div>
  );
}
