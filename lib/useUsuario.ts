"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";
import { Usuario } from "./tipos";

// Hook que descobre quem esta logado.
// Se ninguem estiver logado, manda para o /login.
export function useUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function buscar() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      const { data: perfil } = await supabase
        .from("perfis")
        .select("role")
        .eq("id", data.user.id)
        .single();

      setUsuario({
        id: data.user.id,
        email: data.user.email ?? "",
        role: perfil?.role ?? "aluno",
      });
    }

    buscar();
  }, [router]);

  return usuario;
}
