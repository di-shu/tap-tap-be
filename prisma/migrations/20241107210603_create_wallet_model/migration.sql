-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "deposit_address" TEXT NOT NULL,
    "mnemonic" TEXT[],

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_user_id_key" ON "Wallet"("user_id");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
