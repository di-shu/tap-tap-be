-- CreateTable
CREATE TABLE "Farming" (
    "id" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "reward" DOUBLE PRECISION NOT NULL,
    "earnings_rate" DOUBLE PRECISION NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Farming_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Farming_user_id_key" ON "Farming"("user_id");

-- AddForeignKey
ALTER TABLE "Farming" ADD CONSTRAINT "Farming_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
