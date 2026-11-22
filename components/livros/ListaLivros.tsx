import { Livro } from "@/lib/tipos";

type Props = {
  livros: Livro[];
  souAdmin: boolean;
  onEditar: (livro: Livro) => void;
  onExcluir: (id: number) => void;
};

export default function ListaLivros(props: Props) {
  if (props.livros.length === 0) {
    return <p className="text-gray-500">Nenhum livro cadastrado.</p>;
  }

  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {props.livros.map((livro) => {
        let nomeAutor = "não informado";
        if (livro.autores !== null) {
          nomeAutor = livro.autores.nome;
        }

        let botoes = null;
        if (props.souAdmin === true) {
          botoes = (
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => props.onEditar(livro)}
                className="rounded bg-yellow-400 px-3 py-1"
              >
                Editar
              </button>
              <button
                onClick={() => props.onExcluir(livro.id)}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                Excluir
              </button>
            </div>
          );
        }

        return (
          <li key={livro.id} className="rounded border bg-white p-3">
            <p className="font-semibold">{livro.titulo}</p>
            <p className="text-sm text-gray-600">Autor: {nomeAutor}</p>
            <p className="text-sm text-gray-600">
              Exemplares: {livro.exemplares}
            </p>
            {botoes}
          </li>
        );
      })}
    </ul>
  );
}
