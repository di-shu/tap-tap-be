import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(private performanceService: PerformanceService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getPerformanceStatistics(@Res() res: Response) {
    try {
      const performanceStatistics =
        await this.performanceService.getPerformanceStatistics();
      res.status(200).json(performanceStatistics);
    } catch {
      return { error: 'Internal Server Error' };
    }
  }

  @Get('ping')
  @UseGuards(AuthGuard)
  ping(@Res() res: Response) {
    res.sendStatus(200);
  }
}
