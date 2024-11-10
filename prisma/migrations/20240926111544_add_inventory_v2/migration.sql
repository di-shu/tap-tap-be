/*
  Warnings:

  - You are about to drop the column `durability` on the `Carriage` table. All the data in the column will be lost.
  - You are about to drop the column `durability` on the `Footwear` table. All the data in the column will be lost.
  - You are about to drop the column `durability` on the `Helmet` table. All the data in the column will be lost.
  - You are about to drop the column `durability` on the `Pickaxe` table. All the data in the column will be lost.
  - Added the required column `expires_in` to the `Carriage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `Carriage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Carriage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `Footwear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `Footwear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Footwear` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `Helmet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `Helmet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Helmet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_in` to the `Pickaxe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `Pickaxe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Pickaxe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carriage" DROP COLUMN "durability",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "income" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Footwear" DROP COLUMN "durability",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "income" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Helmet" DROP COLUMN "durability",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "income" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pickaxe" DROP COLUMN "durability",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "income" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
