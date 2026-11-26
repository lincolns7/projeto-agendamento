
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const dados = await request.json();

    const { email, senha } = dados;

    if (!email || !senha) {
      return Response.json(
        { mensagem: "Preencha todos os campos" },
        { status: 400 }
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return Response.json(
        { mensagem: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senhaHash
    );

    if (!senhaCorreta) {
      return Response.json(
        { mensagem: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return Response.json({
      mensagem: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    return Response.json({
      mensagem: "Erro ao realizar login",
      erro: error.message
    }, { status: 500 });
  }
}
