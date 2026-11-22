-- Biblioteca: tabelas iniciais

create table if not exists autores (
  id bigint generated always as identity primary key,
  nome text not null
);

create table if not exists livros (
  id bigint generated always as identity primary key,
  titulo text not null,
  autor_id bigint references autores(id),
  exemplares int not null default 1
);

create table if not exists emprestimos (
  id bigint generated always as identity primary key,
  livro_id bigint references livros(id) on delete cascade,
  user_id uuid references auth.users(id) default auth.uid(),
  emprestado_em date default current_date,
  devolvido_em date
);

-- RLS: sem isso, qualquer pessoa com a chave publica leria/escreveria tudo.
-- Por enquanto, apenas usuarios logados tem acesso. Refinar depois (admin x aluno).
alter table autores enable row level security;
alter table livros enable row level security;
alter table emprestimos enable row level security;

create policy "autenticados acessam autores" on autores
  for all to authenticated using (true) with check (true);

create policy "autenticados acessam livros" on livros
  for all to authenticated using (true) with check (true);

create policy "usuario acessa seus emprestimos" on emprestimos
  for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Autorizacao: cada usuario tem um perfil com role 'admin' ou 'aluno'

create table if not exists perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'aluno'
);

-- cria o perfil automaticamente quando alguem se cadastra
create or replace function criar_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into perfis (id, email) values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists ao_criar_usuario on auth.users;
create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function criar_perfil();

-- perfis de quem ja existia
insert into perfis (id, email)
select id, email from auth.users
on conflict (id) do nothing;

create or replace function eh_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from perfis where id = auth.uid() and role = 'admin');
$$;

alter table perfis enable row level security;
create policy "ver proprio perfil" on perfis
  for select to authenticated using (id = auth.uid());

-- troca as policies da migration 0001
drop policy if exists "autenticados acessam autores" on autores;
drop policy if exists "autenticados acessam livros" on livros;
drop policy if exists "usuario acessa seus emprestimos" on emprestimos;

-- autores e livros: todo logado le, so admin altera
create policy "ler autores" on autores for select to authenticated using (true);
create policy "admin altera autores" on autores for all to authenticated
  using (eh_admin()) with check (eh_admin());

create policy "ler livros" on livros for select to authenticated using (true);
create policy "admin altera livros" on livros for all to authenticated
  using (eh_admin()) with check (eh_admin());

-- emprestimos: aluno ve e mexe nos seus, admin ve todos
create policy "ver emprestimos" on emprestimos for select to authenticated
  using (user_id = auth.uid() or eh_admin());
create policy "criar emprestimo" on emprestimos for insert to authenticated
  with check (user_id = auth.uid());
create policy "alterar emprestimo" on emprestimos for update to authenticated
  using (user_id = auth.uid() or eh_admin());
create policy "excluir emprestimo" on emprestimos for delete to authenticated
  using (user_id = auth.uid() or eh_admin());

-- Para virar admin (troque o email):
-- update perfis set role = 'admin' where email = 'seu@email.com';

update perfis set role = 'admin' where email = 'lucasfear98@gmail.com';
