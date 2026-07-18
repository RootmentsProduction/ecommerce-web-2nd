/*
  Warnings:

  - The `imageRole` column on the `ProductImage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductImageRole" AS ENUM ('PRIMARY', 'HOVER', 'GALLERY');

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "imageRole",
ADD COLUMN     "imageRole" "ProductImageRole" NOT NULL DEFAULT 'GALLERY';
