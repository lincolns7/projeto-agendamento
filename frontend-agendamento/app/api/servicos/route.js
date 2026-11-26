
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const servicos = await prisma.servico.findMany({
      where: {
        status: true
      }
    });

    return Response.json(servicos);

  } catch (error) {
    return Response.json({
      mensagem: "Erro ao buscar serviços"
    }, { status: 500 });
  }
}
