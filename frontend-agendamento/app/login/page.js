
"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("token", dados.token);

        localStorage.setItem(
          "clienteLogado",
          JSON.stringify(dados.usuario)
        );

        alert("Bem-vindo, " + dados.usuario.nome + "!");

        window.location.href = "/agendamento";
      } else {
        alert(dados.mensagem);
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
      <p>Entre na sua conta</p>

      <div className={styles.formulario}>
        <label>E-mail:</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha:</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={entrar} disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <a href="/cadastro">Não tenho uma conta</a>
        <a href="/">Voltar para o início</a>
      </div>
    </div>
  );
}
