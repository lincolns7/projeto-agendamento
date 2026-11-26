
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const dados = await request.json();

    const { nome, email, senha } = dados;

    if (!nome || !email || !senha) {
      return Response.json(
        { mensagem: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    const usuarioExiste = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExiste) {
      return Response.json(
        { mensagem: "Email já cadastrado" },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash
      }
    });

    return Response.json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    }, { status: 201 });

  } catch (error) {
    return Response.json({
      mensagem: "Erro ao cadastrar usuário",
      erro: error.message
    }, { status: 500 });
  }
}
