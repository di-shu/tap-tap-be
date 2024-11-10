/*
  Warnings:

  - Changed the type of `expires_in` on the `Carriage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expires_in` on the `Footwear` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expires_in` on the `Helmet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Carriage" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Footwear" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Helmet" DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" INTEGER NOT NULL;
