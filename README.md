# Biblioteca

Sistema web de biblioteca feito com Next.js, Tailwind CSS e Supabase.

## Integrantes

- Nome 1
- Nome 2
- Nome 3
- Nome 4

## Links

- Site no ar: _colocar o link da Vercel_
- GitHub: _colocar o link do repositório_

## Funcionalidades

- **3 CRUDs:** Livros, Autores e Empréstimos
- **Banco de dados (Supabase / PostgreSQL):** tabelas `autores`, `livros`, `emprestimos` e `perfis`
- **Autenticação:** login e cadastro com e-mail e senha (Supabase Auth)
- **Autorização:** dois perfis
  - `admin`: cria, edita e exclui livros e autores
  - `aluno`: vê livros e autores e gerencia os próprios empréstimos
- **Estilização e responsividade** com Tailwind CSS

## Tecnologias

- Next.js (App Router) e React
- TypeScript
- Tailwind CSS
- Supabase (Auth e banco de dados)
- Vercel (deploy)

## Estrutura de pastas

```
app/
  login/          página de login e cadastro
  livros/         CRUD de livros
  autores/        CRUD de autores
  emprestimos/    CRUD de empréstimos
components/       componentes (formulários, listas e menu)
lib/              cliente do Supabase, tipos e hook useUsuario
supabase/
  migrations/     SQL das tabelas e das permissões
```

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um projeto no [Supabase](https://supabase.com).

3. No **SQL Editor** do Supabase, rode os arquivos de `supabase/migrations` na ordem:
   `0001_tabelas_iniciais.sql` e depois `0002_perfis_e_permissoes.sql`.

4. Crie o arquivo `.env` na raiz com os dados de **Project Settings → API**:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
   ```

5. Rode o projeto:

   ```bash
   npm run dev
   ```

   Abra [http://localhost:3000](http://localhost:3000).

## Como virar admin

Crie sua conta pela tela de login e depois rode no SQL Editor do Supabase:

```sql
update perfis set role = 'admin' where email = 'seu@email.com';
```

## Deploy

1. Suba o código para o GitHub.
2. Na [Vercel](https://vercel.com), importe o repositório.
3. Em **Environment Variables**, cadastre `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. Clique em **Deploy**.
