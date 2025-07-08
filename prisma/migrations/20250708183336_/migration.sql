-- CreateTable
CREATE TABLE "OtpRequest" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "beneficiaryId" TEXT NOT NULL,

    CONSTRAINT "OtpRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OtpRequest" ADD CONSTRAINT "OtpRequest_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "Beneficiary"("external_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
