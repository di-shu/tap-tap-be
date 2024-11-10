import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getStore(@Res() res: Response) {
    try {
      const store = await this.storeService.getStore();
      res.json(store);
    } catch {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
