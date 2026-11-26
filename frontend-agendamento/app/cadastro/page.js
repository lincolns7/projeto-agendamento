
"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    if (nome === "" || email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });

      const dados = await resposta.json();

      alert(dados.mensagem);

      if (resposta.ok) {
        window.location.href = "/login";
      }

    } catch (error) {
      alert("Erro ao conectar com o servidor!");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1>BarberTime</h1>
      <p>Crie sua conta</p>

      <div className={styles.formulario}>
        <label>Nome completo:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label>E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={cadastrar} disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>

        <a href="/login">Já tenho uma conta</a>
      </div>
    </div>
  );
}
