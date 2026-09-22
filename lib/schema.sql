-- Nafaqo Kitchen — database schema (Neon / Postgres)

create table if not exists subscribers (
  id          bigserial primary key,
  email       text not null unique,
  created_at  timestamptz not null default now()
);

create table if not exists partner_enquiries (
  id            bigserial primary key,
  name          text not null,
  organisation  text,
  email         text not null,
  partner_type  text,
  message       text not null,
  status        text not null default 'new',
  created_at    timestamptz not null default now()
);

alter table partner_enquiries add column if not exists status text not null default 'new';

create table if not exists posts (
  id           bigserial primary key,
  tag          text not null default 'Update',
  title        text not null,
  excerpt      text,
  body         text,
  file_url     text,
  published    boolean not null default false,
  created_at   timestamptz not null default now()
);

create table if not exists documents (
  id          bigserial primary key,
  title       text not null,
  note        text,
  status      text not null default 'On request',
  file_url    text,
  updated_at  timestamptz not null default now()
);

insert into documents (title, note, status)
select 'Institutional profile', 'Who we are, the model and the standards we hold ourselves to.', 'On request'
where not exists (select 1 from documents);

create table if not exists app_settings (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);
