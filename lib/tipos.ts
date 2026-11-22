export type Autor = {
  id: number;
  nome: string;
};

export type Livro = {
  id: number;
  titulo: string;
  autor_id: number | null;
  exemplares: number;
  autores: { nome: string } | null;
};

export type Emprestimo = {
  id: number;
  livro_id: number;
  emprestado_em: string;
  devolvido_em: string | null;
  livros: { titulo: string } | null;
};

export type Usuario = {
  id: string;
  email: string;
  role: string;
};
