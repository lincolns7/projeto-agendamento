
"use client";

import { useState, useEffect } from "react";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    async function buscarAgendamentos() {
      const token = localStorage.getItem("token");

      const resposta = await fetch("/api/agendamento", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setAgendamentos(dados);
      } else {
        alert(dados.mensagem);
      }
    }

    buscarAgendamentos();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Meus Agendamentos</h1>

      <p>Confira os horários que você agendou.</p>

      {agendamentos.length === 0 ? (
        <p>Você ainda não possui agendamentos.</p>
      ) : (
        agendamentos.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginTop: "15px",
              borderRadius: "8px"
            }}
          >
            <h3>{item.servico.nome}</h3>

            <p>
              Data: {new Date(item.data).toLocaleDateString("pt-BR", {
                timeZone: "UTC"
              })}
            </p>

            <p>Horário: {item.horario}</p>

            <p>Valor: R$ {item.servico.preco.toFixed(2)}</p>

            <p>Status: {item.status}</p>
          </div>
        ))
      )}

      <a href="/agendamento">Fazer novo agendamento</a>
    </div>
  );
}
