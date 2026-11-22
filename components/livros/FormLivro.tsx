"use client";

import { useState } from "react";
import { Autor, Livro } from "@/lib/tipos";

type Props = {
  autores: Autor[];
  livroEditando: Livro | null;
  onSalvar: (titulo: string, autorId: number | null, exemplares: number) => void;
  onCancelar: () => void;
};

export default function FormLivro(props: Props) {
  let tituloInicial = "";
  let autorInicial = "";
  let exemplaresInicial = 1;

  if (props.livroEditando !== null) {
    tituloInicial = props.livroEditando.titulo;
    exemplaresInicial = props.livroEditando.exemplares;

    if (props.livroEditando.autor_id !== null) {
      autorInicial = String(props.livroEditando.autor_id);
    }
  }

  const [titulo, setTitulo] = useState(tituloInicial);
  const [autorId, setAutorId] = useState(autorInicial);
  const [exemplares, setExemplares] = useState(exemplaresInicial);

  function enviarFormulario(evento: React.FormEvent) {
    evento.preventDefault();

    if (titulo.trim() === "") {
      return;
    }

    let autorEscolhido: number | null = null;
    if (autorId !== "") {
      autorEscolhido = Number(autorId);
    }

    props.onSalvar(titulo, autorEscolhido, exemplares);

    setTitulo("");
    setAutorId("");
    setExemplares(1);
  }

  let textoBotao = "Adicionar";
  if (props.livroEditando !== null) {
    textoBotao = "Salvar";
  }

  let botaoCancelar = null;
  if (props.livroEditando !== null) {
    botaoCancelar = (
      <button
        type="button"
        onClick={props.onCancelar}
        className="rounded bg-gray-300 px-4 py-2"
      >
        Cancelar
      </button>
    );
  }

  return (
    <form
      onSubmit={enviarFormulario}
      className="mb-6 flex flex-col gap-2 md:flex-row"
    >
      <input
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        placeholder="Título"
        className="flex-1 rounded border p-2"
      />

      <select
        value={autorId}
        onChange={(evento) => setAutorId(evento.target.value)}
        className="rounded border p-2"
      >
        <option value="">Sem autor</option>
        {props.autores.map((autor) => (
          <option key={autor.id} value={autor.id}>
            {autor.nome}
          </option>
        ))}
      </select>

      <input
        type="number"
        min={0}
        value={exemplares}
        onChange={(evento) => setExemplares(Number(evento.target.value))}
        className="w-full rounded border p-2 md:w-24"
      />

      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        {textoBotao}
      </button>
      {botaoCancelar}
    </form>
  );
}
