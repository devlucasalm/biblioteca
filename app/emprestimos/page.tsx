"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Emprestimo, Livro } from "@/lib/tipos";
import { useUsuario } from "@/lib/useUsuario";
import Menu from "@/components/Menu";
import FormEmprestimo from "@/components/emprestimos/FormEmprestimo";
import ListaEmprestimos from "@/components/emprestimos/ListaEmprestimos";

export default function PaginaEmprestimos() {
  const usuario = useUsuario();
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);

  async function buscarEmprestimos() {
    const { data } = await supabase
      .from("emprestimos")
      .select("*, livros(titulo)")
      .order("id", { ascending: false });
    setEmprestimos((data as Emprestimo[]) ?? []);
  }

  async function buscarLivros() {
    const { data } = await supabase.from("livros").select("*").order("titulo");
    setLivros((data as Livro[]) ?? []);
  }

  useEffect(() => {
    buscarEmprestimos();
    buscarLivros();
  }, []);

  async function criar(livroId: number) {
    await supabase.from("emprestimos").insert({ livro_id: livroId });
    buscarEmprestimos();
  }

  async function devolver(id: number) {
    const hoje = new Date().toISOString().slice(0, 10);
    await supabase.from("emprestimos").update({ devolvido_em: hoje }).eq("id", id);
    buscarEmprestimos();
  }

  async function excluir(id: number) {
    await supabase.from("emprestimos").delete().eq("id", id);
    buscarEmprestimos();
  }

  if (!usuario) return <p className="p-4">Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Menu usuario={usuario} />

      <main className="mx-auto max-w-4xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Empréstimos</h1>

        <FormEmprestimo livros={livros} onSalvar={criar} />

        <ListaEmprestimos
          emprestimos={emprestimos}
          onDevolver={devolver}
          onExcluir={excluir}
        />
      </main>
    </div>
  );
}
