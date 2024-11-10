import { Injectable, OnModuleInit } from '@nestjs/common';
import TonWeb from 'tonweb';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import {
  mnemonicNew,
  mnemonicToWalletKey,
  keyPairFromSecretKey,
} from '@ton/crypto';
import { TonClient, WalletContractV4 } from '@ton/ton';

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
}
