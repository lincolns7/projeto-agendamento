
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const autorizacao = request.headers.get("authorization");
    const token = autorizacao?.split(" ")[1];

    if (!token) {
      return Response.json({
        mensagem: "Você precisa fazer login"
      }, { status: 401 });
    }

    let usuario;

    try {
      usuario = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json({
        mensagem: "Token inválido"
      }, { status: 401 });
    }

    const dados = await request.json();

    const { servicoId, data, horario } = dados;

    if (!servicoId || !data || !horario) {
      return Response.json({
        mensagem: "Preencha todos os campos"
      }, { status: 400 });
    }

    const servico = await prisma.servico.findUnique({
      where: { id: Number(servicoId) }
    });

    if (!servico || !servico.status) {
      return Response.json({
        mensagem: "Serviço não encontrado"
      }, { status: 404 });
    }

    const agendamento = await prisma.agendamento.create({
      data: {
        usuarioId: usuario.id,
        servicoId: Number(servicoId),
        data: new Date(`${data}T00:00:00.000Z`),
        horario
      }
    });

    return Response.json({
      mensagem: "Agendamento realizado com sucesso!",
      agendamento
    }, { status: 201 });

  } catch (error) {
    return Response.json({
      mensagem: "Erro ao realizar agendamento",
      erro: error.message
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const autorizacao = request.headers.get("authorization");
    const token = autorizacao?.split(" ")[1];

    if (!token) {
      return Response.json({
        mensagem: "Você precisa fazer login"
      }, { status: 401 });
    }

    let usuario;

    try {
      usuario = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json({
        mensagem: "Token inválido"
      }, { status: 401 });
    }

    const agendamentos = await prisma.agendamento.findMany({
      where: {
        usuarioId: usuario.id
      },
      include: {
        servico: true
      },
      orderBy: {
        data: "desc"
      }
    });

    return Response.json(agendamentos);

  } catch (error) {
    return Response.json({
      mensagem: "Erro ao buscar agendamentos",
      erro: error.message
    }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const autorizacao = request.headers.get("authorization");
    const token = autorizacao?.split(" ")[1];

    if (!token) {
      return Response.json({
        mensagem: "Você precisa fazer login"
      }, { status: 401 });
    }

    let usuario;

    try {
      usuario = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json({
        mensagem: "Token inválido"
      }, { status: 401 });
    }

    const dados = await request.json();

    const agendamento = await prisma.agendamento.findFirst({
      where: {
        id: Number(dados.id),
        usuarioId: usuario.id
      }
    });

    if (!agendamento) {
      return Response.json({
        mensagem: "Agendamento não encontrado"
      }, { status: 404 });
    }

    if (agendamento.status === "CANCELADO") {
      return Response.json({
        mensagem: "Esse agendamento já foi cancelado"
      }, { status: 400 });
    }

    await prisma.agendamento.update({
      where: {
        id: agendamento.id
      },
      data: {
        status: "CANCELADO"
      }
    });

    return Response.json({
      mensagem: "Agendamento cancelado com sucesso!"
    });

  } catch (error) {
    return Response.json({
      mensagem: "Erro ao cancelar agendamento",
      erro: error.message
    }, { status: 500 });
  }
}
