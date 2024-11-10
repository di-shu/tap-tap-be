import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ITransactionPayload, ITransactionResponse } from 'src/types/Payment';
// import { Cell } from '@ton/ton';
import { Cell, fromNano } from '@ton/core';
import axios, { AxiosResponse } from 'axios';
// import { getHttpEndpoint } from '@orbs-network/ton-access';
// import TonWeb from 'tonweb';

@Injectable()
export class PaymentService {
  // private tonweb: TonWeb;
  // private wallet: any; // Define the type based on TonWeb's wallet
  constructor(private prismaService: PrismaService) {
    // const provider = new TonWeb.HttpProvider(process.env.TON_API_URL);
    // this.tonweb = new TonWeb(provider);
    // this.wallet = this.initializeWallet();
  }
  // initializeWallet() {
  //   const keyPair = TonWeb.utils.nacl.sign.keyPair();
  //   // Initialize your wallet using TonWeb
  //   return this.tonweb.wallet.create({
  //     publicKey: keyPair.publicKey,
  //     wc: 0,
  //     tonweb: this.tonweb,
  //   });
  // }
  // async createPayment(createPaymentDto: CreatePaymentDto) {
  //   // Generate a unique payment address or use your wallet's address with a smart contract
  //   // For simplicity, we'll use the wallet's address
  //   const payment = await this.prisma.payment.create({
  //     data: {
  //       user_id: createPaymentDto.user_id,
  //       amount: createPaymentDto.amount,
  //       currency: createPaymentDto.currency,
  //       status: 'pending',
  //       // transactionHash will be updated upon confirmation
  //     },
  //   });
  //   // Optionally, generate a unique identifier or memo to track the payment
  //   return payment;
  // }
  // async getPaymentById(id: number) {
  //   return this.prisma.payment.findUnique({
  //     where: { id },
  //   });
  // }
  // async handleWebhook(webhookData: any) {
  //   // Parse webhook data to verify transaction
  //   // The implementation depends on how the TON API sends webhook data
  //   const { transactionHash, status } = webhookData;
  //   // Find the payment by transactionHash or other identifiers
  //   const payment = await this.prisma.payment.findFirst({
  //     where: { transaction_hash: transactionHash },
  //   });
  //   if (payment) {
  //     // Update the payment status
  //     await this.prisma.payment.update({
  //       where: { id: payment.id },
  //       data: { status },
  //     });
  //   } else {
  //     // Handle unmatched webhook data
  //     throw new Error('Payment not found for the provided transaction hash');
  //   }
  // }
  getMessageHash(boc: string): string {
    const cells = Cell.fromBoc(Buffer.from(boc, 'base64'));
    const mainCell = cells[0];

    // Get the hash of the transaction cell
    return mainCell.hash().toString('hex');
  }

  async getTransaction(msg_hash: string): Promise<ITransactionResponse> {
    const last_transaction: AxiosResponse<{
      transactions: ITransactionResponse[];
    }> = await axios.get(`${process.env.TON_API_URL}/transactionsByMessage`, {
      params: {
        msg_hash: msg_hash,
        direction: 'in',
      },
    });
    return last_transaction.data.transactions[0];
  }

  async verifyTransaction(
    msg_hash: string,
    user_id: string,
  ): Promise<{ success: boolean; amount?: string }> {
    try {
      const payment = await this.prismaService.payment.findUnique({
        where: { msg_hash },
      });
      console.log(payment);
      if (payment && payment.status === 'pending') {
        const transaction = await this.getTransaction(msg_hash);
        console.log('tx: ', transaction);
        if (
          transaction &&
          transaction.hash &&
          transaction.description.compute_ph.success
        ) {
          const depositAmount = fromNano(transaction.out_msgs[0].value);
          await this.prismaService.payment.update({
            where: { msg_hash },
            data: {
              status: 'completed',
              user_id,
              transaction_hash: transaction.hash,
              amount: depositAmount,
            },
          });
          await this.prismaService.user.update({
            where: { user_id },
            data: {
              ton_balance: {
                increment: Number(depositAmount),
              },
            },
          });
          console.log(`Payment ${transaction.hash} completed successfully.`);
          return { success: true, amount: depositAmount };
        }
      }
      return { success: false };
    } catch (error) {
      console.error(
        `Failed to verify transaction ${msg_hash}: ${error.message}`,
      );
    }
  }

  async createPayment(msg_hash: string, amount: string, user_id: string) {
    return await this.prismaService.payment.create({
      data: {
        msg_hash,
        amount,
        user_id,
        status: 'pending',
      },
    });
  }

  async getTransactions(user_id: string, filter: string) {
    return await this.prismaService.payment.findMany({
      where: { user_id, status: filter },
    });
  }

  // async getTransactionDetails(boc: string) {
  //   const message_hash = this.getMessageHash(boc);

  //   if (message_hash) {
  //     console.log(last_transaction);
  //   }
  // }
}
