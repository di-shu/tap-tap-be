/*
  Warnings:

  - You are about to drop the column `last_tap_amount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_tap_amount",
ADD COLUMN     "available_taps" INTEGER DEFAULT 100;
