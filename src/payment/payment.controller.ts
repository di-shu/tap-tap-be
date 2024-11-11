import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard, IGetUserAuthInfoRequest } from 'src/guards/auth.guard';
import { Response } from 'express';
import { fromNano } from '@ton/core';
import { WalletsService } from 'src/wallets/wallets.service';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private walletsService: WalletsService,
  ) {}

  @Post('transaction/create')
  @UseGuards(AuthGuard)
  async createPayment(
    @Body() body: { boc: string; amount: number },
    @Req() req: IGetUserAuthInfoRequest,
    @Res() res: Response,
  ) {
    try {
      const data = await this.paymentService.createPayment(
        this.paymentService.getMessageHash(body.boc),
        fromNano(body.amount),
        req.user.userId,
      );
      res.status(200).json(data);
    } catch {
      res.status(500).json({ error: 'Error when creating the payment' });
    }
    res.status(200);
  }
  @Post('transaction/check')
  @UseGuards(AuthGuard)
  async checkTransactionStatus(
    @Body() body: { boc?: string; msg_hash?: string },
    @Req() req: IGetUserAuthInfoRequest,
    @Res() res: Response,
  ) {
    try {
      const data = await this.paymentService.verifyTransaction(
        body.msg_hash || this.paymentService.getMessageHash(body.boc),
        req.user.userId,
      );
      res.status(200).json(data);
    } catch {
      res.status(500).json({ error: 'Error when verifying the transaction' });
    }
  }

  @Get('transactions')
  @UseGuards(AuthGuard)
  async getTransactions(
    @Req() req: IGetUserAuthInfoRequest,
    @Res() res: Response,
    @Query('status') status: string,
  ) {
    try {
      const transactions = await this.paymentService.getTransactions(
        req.user.userId,
        status,
      );
      res.status(200).json(transactions);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
