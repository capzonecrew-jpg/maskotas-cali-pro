import { createClient } from "@supabase/supabase-js";

// Conexión con Supabase (la publishable key es segura para el navegador;
// la seguridad real la dan las políticas RLS de la base de datos).
const SUPABASE_URL = "https://qucmwaihcvnexmsvvvle.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_xFJMjJd_Q5XIA65hCd5U_A_YWhWEnlN";

// Correo del usuario admin (la contraseña la escriben ellos al entrar a /admin).
export const ADMIN_EMAIL = "admin@maskotas.com";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export type Promotion = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  badge: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
  target_id: string | null;
};
