import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, IGetUserAuthInfoRequest } from 'src/guards/auth.guard';
import { WalletsService } from './wallets.service';
import { Response } from 'express';

@Controller('wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}
  @Get('address')
  @UseGuards(AuthGuard)
  async generateWallet(
    @Res() res: Response,
    @Req() req: IGetUserAuthInfoRequest,
  ) {
    try {
      const wallet = await this.walletsService.getDepositAddress(
        req.user.userId,
      );
      res.status(200).json(wallet);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
