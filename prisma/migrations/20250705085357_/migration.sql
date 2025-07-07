-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" TEXT NOT NULL,
    "externalUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT[],
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL,
    "billingPeriod" TEXT NOT NULL,
    "features" TEXT[],
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "renewsAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "paymentMethodDetails" JSONB,
    "paymentTransactionId" TEXT,
    "paymentTransactionStatus" TEXT,
    "externalRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_externalUserId_key" ON "Beneficiary"("externalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_phone_key" ON "Beneficiary"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_email_key" ON "Beneficiary"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_cpf_key" ON "Beneficiary"("cpf");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Beneficiary"("externalUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
