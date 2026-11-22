"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setMensagem("Email ou senha inválidos");
    } else {
      router.push("/livros");
    }
  }

  async function cadastrar() {
    const { error } = await supabase.auth.signUp({ email, password: senha });

    if (error) {
      setMensagem(error.message);
    } else {
      setMensagem("Conta criada! Se pedir, confirme o email e depois entre.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={entrar}
        className="flex w-full max-w-sm flex-col gap-3 rounded bg-white p-6 shadow"
      >
        <h1 className="text-2xl font-bold">Biblioteca</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded border p-2"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha (mínimo 6 caracteres)"
          className="rounded border p-2"
        />

        <button className="rounded bg-blue-600 p-2 text-white">Entrar</button>
        <button
          type="button"
          onClick={cadastrar}
          className="rounded bg-gray-200 p-2"
        >
          Criar conta
        </button>

        {mensagem && <p className="text-sm text-red-600">{mensagem}</p>}
      </form>
    </main>
  );
}
