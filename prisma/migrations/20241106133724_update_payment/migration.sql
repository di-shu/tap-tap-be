/*
  Warnings:

  - A unique constraint covering the columns `[transaction_hash]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_hash_key" ON "Payment"("transaction_hash");
