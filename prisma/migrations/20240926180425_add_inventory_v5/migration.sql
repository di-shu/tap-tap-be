-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('CRYSTAL', 'TON');

-- AlterTable
ALTER TABLE "Carriage" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'TON';

-- AlterTable
ALTER TABLE "Footwear" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'TON';

-- AlterTable
ALTER TABLE "Helmet" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'TON';

-- AlterTable
ALTER TABLE "Pickaxe" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'TON';
