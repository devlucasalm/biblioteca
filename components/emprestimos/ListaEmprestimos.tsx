import { Emprestimo } from "@/lib/tipos";

type Props = {
  emprestimos: Emprestimo[];
  onDevolver: (id: number) => void;
  onExcluir: (id: number) => void;
};

export default function ListaEmprestimos(props: Props) {
  if (props.emprestimos.length === 0) {
    return <p className="text-gray-500">Nenhum empréstimo.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {props.emprestimos.map((emprestimo) => {
        let tituloLivro = "";
        if (emprestimo.livros !== null) {
          tituloLivro = emprestimo.livros.titulo;
        }

        let textoDevolucao = "Ainda não devolvido";
        if (emprestimo.devolvido_em !== null) {
          textoDevolucao = "Devolvido em: " + emprestimo.devolvido_em;
        }

        let botaoDevolver = null;
        if (emprestimo.devolvido_em === null) {
          botaoDevolver = (
            <button
              onClick={() => props.onDevolver(emprestimo.id)}
              className="rounded bg-green-600 px-3 py-1 text-white"
            >
              Devolver
            </button>
          );
        }

        return (
          <li
            key={emprestimo.id}
            className="flex flex-col gap-2 rounded border bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">{tituloLivro}</p>
              <p className="text-sm text-gray-600">
                Emprestado em: {emprestimo.emprestado_em}
              </p>
              <p className="text-sm text-gray-600">{textoDevolucao}</p>
            </div>

            <div className="flex gap-2">
              {botaoDevolver}
              <button
                onClick={() => props.onExcluir(emprestimo.id)}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                Excluir
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
