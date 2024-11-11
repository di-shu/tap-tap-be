import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import {
  mnemonicNew,
  mnemonicToWalletKey,
  keyPairFromSecretKey,
} from '@ton/crypto';
import { TonClient, WalletContractV4, Address } from '@ton/ton';
import axios from 'axios';

@Injectable()
export class WalletsService {
  private client: TonClient;

  constructor(private prismaService: PrismaService) {
    this.client = new TonClient({ endpoint: process.env.TON_API_URL }); // Replace with mainnet
  }

  private async generateWallet() {
    // Generate a new mnemonic
    const mnemonic = await mnemonicNew();

    // Convert mnemonic to wallet key
    const keyPair = await mnemonicToWalletKey(mnemonic);
    // Initialize a Wallet Contract
    const wallet = WalletContractV4.create({
      publicKey: keyPair.publicKey,
      workchain: 0,
    });

    // Get the wallet address
    const deposit_address = wallet.address.toString({ testOnly: true }); // TODO: switch to mainnet

    // Optionally store mnemonic securely and return address
    return {
      deposit_address,
      mnemonic,
    };
  }

  async getDepositAddress(user_id: string) {
    let wallet = await this.prismaService.wallet.findUnique({
      where: { user_id },
    });

    if (wallet) {
      return wallet.deposit_address;
    }
    const new_wallet = await this.generateWallet();
    wallet = await this.prismaService.wallet.create({
      data: {
        user_id,
        ...new_wallet,
      },
    });
    return wallet.deposit_address;
  }

  async getTransactionStatus(user_id: string) {
    const walletData = await this.prismaService.wallet.findUnique({
      where: { user_id },
    });
    if (walletData) {
      const address = Address.parse(walletData.deposit_address);
      const response = await axios.get(
        `${process.env.TON_API_URL}/transactions`,
        {
          params: {
            account: address.toString(),
            limit: 1, // Retrieve the latest transaction
          },
        },
      );
      const last_transaction = response.data.transactions[0];

      if (
        last_transaction &&
        !last_transaction.description.aborted &&
        last_transaction.description.action.success
      ) {
        return { amount: last_transaction.in_msg.value, success: true };
      }
    }
    return { success: false };
  }
}

// async verifyTransaction(user_id: string) {
//   const payment = await this.prismaService.payment.findUnique({
//     where: { msg_hash },
//   });
// }
