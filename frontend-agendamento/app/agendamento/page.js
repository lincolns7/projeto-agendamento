
"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Agendamento() {
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  function agendar() {
    if (nome === "" || servico === "" || data === "" || horario === "") {
      alert("Preencha todos os campos!");
      return;
    }

    alert("Agendamento realizado com sucesso!");
  }

  return (
    <div className={styles.container}>
      <h1>Agende seu horário</h1>
      <p>Preencha os dados abaixo para realizar seu agendamento.</p>

      <div className={styles.formulario}>
        <label>Seu nome:</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Escolha o serviço:</label>
        <select value={servico} onChange={(e) => setServico(e.target.value)}>
          <option value="">Selecione</option>
          <option value="Corte de cabelo">Corte de cabelo</option>
          <option value="Barba">Barba</option>
          <option value="Corte e barba">Corte e barba</option>
        </select>

        <label>Escolha a data:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <label>Escolha o horário:</label>
        <select value={horario} onChange={(e) => setHorario(e.target.value)}>
          <option value="">Selecione</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
        </select>

        <button onClick={agendar}>Confirmar agendamento</button>

        <a href="/">Voltar para o início</a>
      </div>
    </div>
  );
}
