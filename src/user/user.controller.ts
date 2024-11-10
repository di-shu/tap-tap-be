import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, IGetUserAuthInfoRequest } from 'src/guards/auth.guard';
import { UserService } from './user.service';
import { TapToEarnDTO } from './user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/tap')
  @UseGuards(AuthGuard)
  async tapToEarn(
    @Body() body: TapToEarnDTO,
    @Res() res: Response,
    @Req() req: IGetUserAuthInfoRequest,
  ) {
    try {
      await this.userService.updateCrystalsBalance(req.user.userId, body);
      res.status(200).send();
    } catch {
      res.status(500).json({ error: 'Error when tap to earn' });
    }
  }

  @Get('/leaderboard')
  @UseGuards(AuthGuard)
  async getUsersSortedByBalance(@Res() res: Response) {
    try {
      const users = await this.userService.getUsersSortedByBalance();
      res.json(users);
    } catch {
      res.status(500).json({ error: 'Error when retrieving the leaderboard' });
    }
  }
}
