import { Autor } from "@/lib/tipos";

type Props = {
  autores: Autor[];
  souAdmin: boolean;
  onEditar: (autor: Autor) => void;
  onExcluir: (id: number) => void;
};

export default function ListaAutores(props: Props) {
  if (props.autores.length === 0) {
    return <p className="text-gray-500">Nenhum autor cadastrado.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {props.autores.map((autor) => {
        let botoes = null;

        if (props.souAdmin === true) {
          botoes = (
            <div className="flex gap-2">
              <button
                onClick={() => props.onEditar(autor)}
                className="rounded bg-yellow-400 px-3 py-1"
              >
                Editar
              </button>
              <button
                onClick={() => props.onExcluir(autor.id)}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                Excluir
              </button>
            </div>
          );
        }

        return (
          <li
            key={autor.id}
            className="flex items-center justify-between rounded border bg-white p-3"
          >
            <span>{autor.nome}</span>
            {botoes}
          </li>
        );
      })}
    </ul>
  );
}
