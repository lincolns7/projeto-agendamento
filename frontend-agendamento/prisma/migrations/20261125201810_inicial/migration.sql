-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "duracaoMin" INTEGER NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "categoriaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
