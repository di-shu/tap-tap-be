import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { predefinedItems } from 'src/predefined-items/inventory';
import { TapToEarnDTO } from './user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async initUser(initData) {
    return await this.prismaService.user.create({
      data: {
        ...initData,
        inventory: {
          create: {
            items: {
              createMany: {
                data: predefinedItems,
              },
            },
          },
        },
      },
      include: {
        inventory: true,
      },
    });
  }

  async updateCrystalsBalance(
    user_id: string,
    payload: TapToEarnDTO,
  ): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { user_id },
      data: {
        available_taps: payload.available_taps,
        last_tap_date: new Date(),
        crystals_balance: {
          increment: payload.earnings,
        },
      },
    });
    return user;
  }

  async getUsersSortedByBalance(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      orderBy: { crystals_balance: 'desc' },
      take: 10,
    });
  }
}
