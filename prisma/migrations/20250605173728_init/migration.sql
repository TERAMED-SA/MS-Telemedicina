-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('RECORRENTE', 'UNICO');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('CLINICO', 'EXAME', 'OUTRO');

-- CreateTable
CREATE TABLE "Recipient" (
    "id" SERIAL NOT NULL,
    "externalUserId" INTEGER NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "holder" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_uuid_key" ON "Recipient"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_cpf_key" ON "Recipient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_email_key" ON "Recipient"("email");
