import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase, type Promotion } from "@/lib/supabase";

type PromoCtx = {
  promos: Promotion[];
  loaded: boolean;
  reload: () => void;
  getPromoFor: (targetId: string) => Promotion | undefined;
  generalPromos: Promotion[];
};

const Ctx = createContext<PromoCtx | null>(null);

export function usePromos() {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePromos debe usarse dentro de <PromoProvider>");
  return c;
}

export function PromoProvider({ children }: { children: ReactNode }) {
  const [promos, setPromos] = useState<Promotion[]>([]);
  const [loaded, setLoaded] = useState(false);

  const reload = () => {
    supabase
      .from("promotions")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPromos((data as Promotion[]) ?? []);
        setLoaded(true);
      });
  };

  useEffect(reload, []);

  // Promo activa que apunta a un servicio/producto concreto.
  const getPromoFor = (targetId: string) =>
    promos.find((p) => p.active && p.target_id === targetId);

  // Promos activas sin destino (van en la sección del inicio).
  const generalPromos = promos.filter((p) => p.active && !p.target_id);

  return (
    <Ctx.Provider value={{ promos, loaded, reload, getPromoFor, generalPromos }}>
      {children}
    </Ctx.Provider>
  );
}
