-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "isActive" DROP DEFAULT,
ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "createdAt" DROP DEFAULT;
