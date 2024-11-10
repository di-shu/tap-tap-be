import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FarmingService } from './farming.service';
import { AuthGuard, IGetUserAuthInfoRequest } from 'src/guards/auth.guard';
import { Response } from 'express';

@Controller('farming')
export class FarmingController {
  constructor(private readonly farmingService: FarmingService) {}
  @Post('start')
  @UseGuards(AuthGuard)
  async startFarming(
    @Res() res: Response,
    @Req() req: IGetUserAuthInfoRequest,
  ) {
    try {
      const farmingSession = await this.farmingService.startFarming(
        req.user.userId,
      );
      res.json(farmingSession);
    } catch {
      res.status(500).json({ error: 'Error when starting the farming' });
    }
  }

  @Post('claim')
  @UseGuards(AuthGuard)
  async claimReward(@Res() res: Response, @Req() req: IGetUserAuthInfoRequest) {
    try {
      const farmingSession = await this.farmingService.claimReward(
        req.user.userId,
      );
      res.json(farmingSession);
    } catch {
      res.status(500).json({ error: 'Error when claiming' });
    }
  }
}
