-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_tap_amount" INTEGER DEFAULT 0,
ADD COLUMN     "last_tap_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
