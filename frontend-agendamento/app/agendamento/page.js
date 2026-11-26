
"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Agendamento() {
  const [nome, setNome] = useState("");
  const [servico, setServico] = useState("");
  const [servicos, setServicos] = useState([]);
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  const cliente = JSON.parse(localStorage.getItem("clienteLogado"));

  if (cliente) {
    setNome(cliente.nome);
  }

  async function buscarServicos() {
    const resposta = await fetch("/api/servicos");
    const dados = await resposta.json();

    setServicos(dados);
  }

  buscarServicos();
}, []);


  async function agendar() {
    if (servico === "" || data === "" || horario === "") {
      alert("Preencha todos os campos!");
      return;
    }

    const token = localStorage.getItem("token");

    const resposta = await fetch("/api/agendamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        servicoId: servico,
        data,
        horario
      })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert("Agendamento realizado com sucesso!");

      setServico("");
      setData("");
      setHorario("");
    } else {
      alert(resultado.mensagem);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Agende seu horário</h1>
      <p>Preencha os dados abaixo para realizar seu agendamento.</p>

      <div className={styles.formulario}>
        <label>Seu nome:</label>
        <input
          type="text"
          value={nome}
          readOnly
        />

        <label>Escolha o serviço:</label>
        <select value={servico} onChange={(e) => setServico(e.target.value)}>
          <option value="">Selecione</option>

          {servicos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome} - R$ {item.preco.toFixed(2)}
            </option>
          ))}
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
