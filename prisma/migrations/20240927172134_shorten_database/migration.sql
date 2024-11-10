/*
  Warnings:

  - You are about to drop the `Carriage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Footwear` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Helmet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pickaxe` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ItemTypes" AS ENUM ('FOOTWEAR', 'PICKAXE', 'CARRIAGE', 'HELMET');

-- DropForeignKey
ALTER TABLE "Carriage" DROP CONSTRAINT "Carriage_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Carriage" DROP CONSTRAINT "Carriage_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Footwear" DROP CONSTRAINT "Footwear_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Footwear" DROP CONSTRAINT "Footwear_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Helmet" DROP CONSTRAINT "Helmet_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Helmet" DROP CONSTRAINT "Helmet_store_id_fkey";

-- DropForeignKey
ALTER TABLE "Pickaxe" DROP CONSTRAINT "Pickaxe_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Pickaxe" DROP CONSTRAINT "Pickaxe_store_id_fkey";

-- DropTable
DROP TABLE "Carriage";

-- DropTable
DROP TABLE "Footwear";

-- DropTable
DROP TABLE "Helmet";

-- DropTable
DROP TABLE "Pickaxe";

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ItemTypes" NOT NULL,
    "description" TEXT,
    "estimated_income" DOUBLE PRECISION NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "expires_in" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'TON',
    "level" INTEGER NOT NULL,
    "inventory_id" INTEGER,
    "store_id" INTEGER,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
