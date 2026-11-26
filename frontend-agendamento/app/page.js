
"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [logado, setLogado] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const cliente = localStorage.getItem("clienteLogado");

    if (token) {
      setLogado(true);

      if (cliente) {
        setNome(JSON.parse(cliente).nome);
      }
    }
  }, []);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("clienteLogado");

    setLogado(false);
    setNome("");
    
    alert("Você saiu da sua conta!");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>BarberTime</div>

        <nav className={styles.menu}>
          <a href="/agendamento">Agendar</a>

          {logado ? (
            <>
              <a href="/meus-agendamentos">Meus Agendamentos</a>
              <span>Olá, {nome}!</span>
              <button onClick={sair}>Sair</button>
            </>
          ) : (
            <>
              <a href="/login">Entrar</a>
              <a href="/cadastro">Cadastrar</a>
            </>
          )}
        </nav>
      </header>

      <main className={styles.conteudo}>
        <h1>Seu estilo começa aqui.</h1>

        <p>Agende seu horário de forma rápida e fácil.</p>

        <a href="/agendamento" className={styles.botao}>
          Agendar horário
        </a>
      </main>
    </div>
  );
}
