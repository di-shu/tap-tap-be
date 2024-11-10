/*
  Warnings:

  - You are about to drop the column `reward` on the `Farming` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Farming" DROP COLUMN "reward",
ADD COLUMN     "session_reward" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "total_reward" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "earnings_rate" SET DEFAULT 0;
