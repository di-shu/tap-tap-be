/*
  Warnings:

  - A unique constraint covering the columns `[msg_hash]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `msg_hash` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "msg_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_msg_hash_key" ON "Payment"("msg_hash");
