"use client";

import { useState } from "react";
import { Livro } from "@/lib/tipos";

type Props = {
  livros: Livro[];
  onSalvar: (livroId: number) => void;
};

export default function FormEmprestimo(props: Props) {
  const [livroId, setLivroId] = useState("");

  function enviarFormulario(evento: React.FormEvent) {
    evento.preventDefault();

    if (livroId === "") {
      return;
    }

    props.onSalvar(Number(livroId));
    setLivroId("");
  }

  return (
    <form
      onSubmit={enviarFormulario}
      className="mb-6 flex flex-col gap-2 sm:flex-row"
    >
      <select
        value={livroId}
        onChange={(evento) => setLivroId(evento.target.value)}
        className="flex-1 rounded border p-2"
      >
        <option value="">Escolha um livro</option>
        {props.livros.map((livro) => (
          <option key={livro.id} value={livro.id}>
            {livro.titulo}
          </option>
        ))}
      </select>
      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        Pegar emprestado
      </button>
    </form>
  );
}
