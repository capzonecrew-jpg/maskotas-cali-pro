-- ============================================================
--  Clínica Maskotas — Configuración de Supabase (v1: Promociones)
--  Pega TODO esto en:  Supabase → SQL Editor → New query → Run
-- ============================================================

-- 1) Tabla de promociones
create table if not exists public.promotions (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  image_url   text,
  badge       text,                       -- ej: "20% OFF", "Nuevo"
  active      boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- 2) Seguridad a nivel de fila (RLS)
alter table public.promotions enable row level security;

-- Cualquiera puede LEER las promociones (web pública)
drop policy if exists "promos_public_read" on public.promotions;
create policy "promos_public_read"
  on public.promotions for select
  using (true);

-- Solo usuarios autenticados (el admin) pueden crear/editar/borrar
drop policy if exists "promos_admin_write" on public.promotions;
create policy "promos_admin_write"
  on public.promotions for all
  to authenticated
  using (true)
  with check (true);

-- 3) Almacenamiento de imágenes (bucket público "media")
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Cualquiera puede VER las imágenes
drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Solo el admin (autenticado) puede subir/editar/borrar imágenes
drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- 4) Una promoción de ejemplo (para que veas cómo se ve; luego la borras)
insert into public.promotions (title, description, badge, sort_order)
values (
  'Baño + corte con 20% de descuento',
  'Este mes consiente a tu mascota: spa completo con productos hipoalergénicos.',
  '20% OFF',
  1
)
on conflict do nothing;

-- ¡Listo! Ya puedes cerrar esta ventana.
