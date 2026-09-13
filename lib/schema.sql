create table if not exists subscribers (
  id            bigserial primary key,
  email         text not null unique,
  source        text not null default 'website_footer',
  created_at    timestamptz not null default now()
);

create table if not exists partner_enquiries (
  id            bigserial primary key,
  name          text not null,
  organisation  text,
  email         text not null,
  partner_type  text,
  message       text not null,
  created_at    timestamptz not null default now()
);

create index if not exists partner_enquiries_created_at_idx on partner_enquiries (created_at desc);
