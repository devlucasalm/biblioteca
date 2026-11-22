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
