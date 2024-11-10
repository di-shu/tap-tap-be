/*
  Warnings:

  - You are about to drop the column `userId` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_userId_fkey";

-- DropIndex
DROP INDEX "Inventory_userId_key";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_user_id_key" ON "Inventory"("user_id");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
