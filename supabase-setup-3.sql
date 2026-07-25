-- ============================================================
--  Clínica Maskotas — Paso 3: promociones dirigidas a un servicio/producto
--  Pega TODO esto en:  Supabase → SQL Editor → New query → Run
-- ============================================================

-- Añade a qué servicio/producto apunta la promoción (vacío = promo general).
alter table public.promotions
  add column if not exists target_id text;

-- ¡Listo!
