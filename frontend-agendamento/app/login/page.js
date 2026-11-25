
"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    const cliente = clientes.find(
      (cliente) => cliente.email === email && cliente.senha === senha
    );

    if (cliente) {
      localStorage.setItem("clienteLogado", JSON.stringify(cliente));

      alert("Bem-vindo, " + cliente.nome + "!");

      window.location.href = "/agendamento";
    } else {
      alert("E-mail ou senha incorretos!");
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

        <button onClick={entrar}>Entrar</button>

        <a href="/cadastro">Não tenho uma conta</a>
        <a href="/">Voltar para o início</a>
      </div>
    </div>
  );
}
