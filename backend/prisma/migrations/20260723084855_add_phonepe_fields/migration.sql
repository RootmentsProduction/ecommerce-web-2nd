-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "merchantTransactionId" TEXT,
ADD COLUMN     "paymentCompletedAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentProvider" TEXT,
ADD COLUMN     "paymentReference" TEXT,
ADD COLUMN     "paymentResponse" TEXT,
ADD COLUMN     "phonepeTransactionId" TEXT;

-- CreateTable
CREATE TABLE "SystemSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("key")
);
