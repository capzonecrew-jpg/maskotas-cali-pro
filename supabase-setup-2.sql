-- ============================================================
--  Clínica Maskotas — Paso 2: edición en vivo (textos, precios, imágenes)
--  Pega TODO esto en:  Supabase → SQL Editor → New query → Run
-- ============================================================

-- Tabla llave-valor para guardar los cambios que hagan con el lápiz.
create table if not exists public.content (
  key        text primary key,
  value      jsonb,
  updated_at timestamptz not null default now()
);

alter table public.content enable row level security;

-- Todos pueden LEER (la web pública muestra los textos guardados)
drop policy if exists "content_public_read" on public.content;
create policy "content_public_read"
  on public.content for select
  using (true);

-- Solo el admin (autenticado) puede GUARDAR cambios
drop policy if exists "content_admin_write" on public.content;
create policy "content_admin_write"
  on public.content for all
  to authenticated
  using (true)
  with check (true);

-- ¡Listo!
