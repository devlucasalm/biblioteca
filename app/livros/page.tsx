"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Autor, Livro } from "@/lib/tipos";
import { useUsuario } from "@/lib/useUsuario";
import Menu from "@/components/Menu";
import FormLivro from "@/components/livros/FormLivro";
import ListaLivros from "@/components/livros/ListaLivros";

export default function PaginaLivros() {
  const usuario = useUsuario();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [livroEditando, setLivroEditando] = useState<Livro | null>(null);

  async function buscarLivros() {
    const { data } = await supabase
      .from("livros")
      .select("*, autores(nome)")
      .order("titulo");
    setLivros((data as Livro[]) ?? []);
  }

  async function buscarAutores() {
    const { data } = await supabase.from("autores").select("*").order("nome");
    setAutores(data ?? []);
  }

  useEffect(() => {
    buscarLivros();
    buscarAutores();
  }, []);

  async function salvar(titulo: string, autorId: number | null, exemplares: number) {
    const dados = { titulo, autor_id: autorId, exemplares };

    if (livroEditando) {
      await supabase.from("livros").update(dados).eq("id", livroEditando.id);
      setLivroEditando(null);
    } else {
      await supabase.from("livros").insert(dados);
    }
    buscarLivros();
  }

  async function excluir(id: number) {
    await supabase.from("livros").delete().eq("id", id);
    buscarLivros();
  }

  if (!usuario) return <p className="p-4">Carregando...</p>;

  const souAdmin = usuario.role === "admin";

  return (
    <div className="min-h-screen bg-gray-100">
      <Menu usuario={usuario} />

      <main className="mx-auto max-w-4xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Livros</h1>

        {souAdmin && (
          <FormLivro
            key={livroEditando?.id ?? "novo"}
            autores={autores}
            livroEditando={livroEditando}
            onSalvar={salvar}
            onCancelar={() => setLivroEditando(null)}
          />
        )}

        <ListaLivros
          livros={livros}
          souAdmin={souAdmin}
          onEditar={setLivroEditando}
          onExcluir={excluir}
        />
      </main>
    </div>
  );
}
