-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "commentsJson" TEXT,
ADD COLUMN     "historyJson" TEXT;
