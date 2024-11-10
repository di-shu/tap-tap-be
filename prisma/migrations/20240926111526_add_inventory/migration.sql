-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pickaxe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimated_income" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL DEFAULT 100,
    "level" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "Pickaxe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footwear" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimated_income" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL DEFAULT 100,
    "level" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "Footwear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carriage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimated_income" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL DEFAULT 100,
    "level" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "Carriage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Helmet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimated_income" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL DEFAULT 100,
    "level" INTEGER NOT NULL,
    "inventory_id" INTEGER NOT NULL,

    CONSTRAINT "Helmet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_key" ON "Inventory"("userId");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickaxe" ADD CONSTRAINT "Pickaxe_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footwear" ADD CONSTRAINT "Footwear_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carriage" ADD CONSTRAINT "Carriage_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Helmet" ADD CONSTRAINT "Helmet_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
