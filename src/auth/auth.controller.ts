import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { TelegramValidationDTO } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import * as referralCodes from 'referral-codes';
import { log } from 'console';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}
  @Post('telegram')
  async validate(
    @Body() body: TelegramValidationDTO,
    @Res() response: Response,
  ) {
    try {
      const { initData } = body;
      const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
      const isValid: boolean = this.authService.validateTelegramAuth(
        initData,
        botToken,
      );

      if (isValid) {
        const telegramUser =
          this.authService.extractUserInfoFromInitData(initData);

        if (telegramUser?.id) {
          const { id: userId } = telegramUser;
          const userIdAsString = String(userId);

          let user: User = await this.prismaService.user.findUnique({
            where: { user_id: userIdAsString },
            include: {
              inventory: {
                include: { items: true },
              },
              farming: true,
            },
          });
          if (!user) {
            // const referral_code = referralCodes.generate({
            //   length: 8,
            //   count: 5,
            // });
            user = await this.userService.initUser({
              user_id: userIdAsString,
              username: telegramUser.username,
              name: telegramUser.first_name,
              last_name: telegramUser.last_name,
              // referral_code,
            });
          }
          const sessionToken = jwt.sign(
            { userId: userIdAsString },
            this.configService.get<string>('JWT_SECRET'),
          );

          const expiresAt = new Date(Date.now() + 3600 * 1000);

          await this.prismaService.session.create({
            data: {
              user_id: userIdAsString,
              expires_at: expiresAt,
              session_token: sessionToken,
            },
          });

          response.json({
            valid: true,
            sessionToken,
            profile: { ...user },
          });
        }
      }
    } catch (err) {
      console.log(err);
      response
        .status(500)
        .json({ message: 'Authentication failed', valid: false });
    }
  }
}
