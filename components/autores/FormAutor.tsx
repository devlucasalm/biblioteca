"use client";

import { useState } from "react";
import { Autor } from "@/lib/tipos";

type Props = {
  autorEditando: Autor | null;
  onSalvar: (nome: string) => void;
  onCancelar: () => void;
};

export default function FormAutor(props: Props) {
  let nomeInicial = "";
  if (props.autorEditando !== null) {
    nomeInicial = props.autorEditando.nome;
  }

  const [nome, setNome] = useState(nomeInicial);

  function enviarFormulario(evento: React.FormEvent) {
    evento.preventDefault();

    if (nome.trim() === "") {
      return;
    }

    props.onSalvar(nome);
    setNome("");
  }

  let textoBotao = "Adicionar";
  if (props.autorEditando !== null) {
    textoBotao = "Salvar";
  }

  let botaoCancelar = null;
  if (props.autorEditando !== null) {
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
      className="mb-6 flex flex-col gap-2 sm:flex-row"
    >
      <input
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
        placeholder="Nome do autor"
        className="flex-1 rounded border p-2"
      />
      <button className="rounded bg-blue-600 px-4 py-2 text-white">
        {textoBotao}
      </button>
      {botaoCancelar}
    </form>
  );
}
