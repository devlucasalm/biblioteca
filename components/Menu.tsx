"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Usuario } from "@/lib/tipos";

type Props = {
  usuario: Usuario;
};

export default function Menu(props: Props) {
  const router = useRouter();

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <nav className="bg-blue-700 text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4 font-semibold">
          <Link href="/livros">Livros</Link>
          <Link href="/autores">Autores</Link>
          <Link href="/emprestimos">Empréstimos</Link>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span>
            {props.usuario.email} ({props.usuario.role})
          </span>
          <button
            onClick={sair}
            className="rounded bg-white px-3 py-1 text-blue-700"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
