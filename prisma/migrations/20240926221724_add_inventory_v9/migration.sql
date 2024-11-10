-- DropForeignKey
ALTER TABLE "Carriage" DROP CONSTRAINT "Carriage_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Footwear" DROP CONSTRAINT "Footwear_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Helmet" DROP CONSTRAINT "Helmet_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "Pickaxe" DROP CONSTRAINT "Pickaxe_inventory_id_fkey";

-- AlterTable
ALTER TABLE "Carriage" ADD COLUMN     "store_id" INTEGER,
ALTER COLUMN "inventory_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Footwear" ADD COLUMN     "store_id" INTEGER,
ALTER COLUMN "inventory_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Helmet" ADD COLUMN     "store_id" INTEGER,
ALTER COLUMN "inventory_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pickaxe" ADD COLUMN     "store_id" INTEGER,
ALTER COLUMN "inventory_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pickaxe" ADD CONSTRAINT "Pickaxe_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickaxe" ADD CONSTRAINT "Pickaxe_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footwear" ADD CONSTRAINT "Footwear_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footwear" ADD CONSTRAINT "Footwear_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carriage" ADD CONSTRAINT "Carriage_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carriage" ADD CONSTRAINT "Carriage_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Helmet" ADD CONSTRAINT "Helmet_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Helmet" ADD CONSTRAINT "Helmet_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
