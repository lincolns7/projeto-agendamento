
"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar() {
    if (nome === "" || email === "" || senha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    const existe = clientes.find((cliente) => cliente.email === email);

    if (existe) {
      alert("Este e-mail já está cadastrado!");
      return;
    }

    clientes.push({
      nome: nome,
      email: email,
      senha: senha
    });

    localStorage.setItem("clientes", JSON.stringify(clientes));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "/login";
  }

  return (
    <div className={styles.container}>
      <h1>BarberTime</h1>
      <p>Crie sua conta</p>

      <div className={styles.formulario}>
        <label>Nome completo:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Senha:</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

        <button onClick={cadastrar}>Cadastrar</button>

        <a href="/login">Já tenho uma conta</a>
      </div>
    </div>
  );
}
