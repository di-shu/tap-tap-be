import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDTO } from './item.dto';
import { Response } from 'express';
import { AuthGuard, IGetUserAuthInfoRequest } from 'src/guards/auth.guard';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('/buy')
  @UseGuards(AuthGuard)
  async buyItem(
    @Body() body: CreateItemDTO,
    @Res() response: Response,
    @Req() req: IGetUserAuthInfoRequest,
  ) {
    try {
      const item = await this.itemService.buyItem(body, req.user.userId);
      response.json(item);
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  }
}
