"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Autor } from "@/lib/tipos";
import { useUsuario } from "@/lib/useUsuario";
import Menu from "@/components/Menu";
import FormAutor from "@/components/autores/FormAutor";
import ListaAutores from "@/components/autores/ListaAutores";

export default function PaginaAutores() {
  const usuario = useUsuario();
  const [autores, setAutores] = useState<Autor[]>([]);
  const [autorEditando, setAutorEditando] = useState<Autor | null>(null);

  async function buscarAutores() {
    const { data } = await supabase.from("autores").select("*").order("nome");
    setAutores(data ?? []);
  }

  useEffect(() => {
    buscarAutores();
  }, []);

  async function salvar(nome: string) {
    if (autorEditando) {
      await supabase.from("autores").update({ nome }).eq("id", autorEditando.id);
      setAutorEditando(null);
    } else {
      await supabase.from("autores").insert({ nome });
    }
    buscarAutores();
  }

  async function excluir(id: number) {
    await supabase.from("autores").delete().eq("id", id);
    buscarAutores();
  }

  if (!usuario) return <p className="p-4">Carregando...</p>;

  const souAdmin = usuario.role === "admin";

  return (
    <div className="min-h-screen bg-gray-100">
      <Menu usuario={usuario} />

      <main className="mx-auto max-w-4xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Autores</h1>

        {souAdmin && (
          <FormAutor
            key={autorEditando?.id ?? "novo"}
            autorEditando={autorEditando}
            onSalvar={salvar}
            onCancelar={() => setAutorEditando(null)}
          />
        )}

        <ListaAutores
          autores={autores}
          souAdmin={souAdmin}
          onEditar={setAutorEditando}
          onExcluir={excluir}
        />
      </main>
    </div>
  );
}
