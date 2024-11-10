import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prismaService: PrismaService) {}

  async buyItem(payload, user_id: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { user_id },
        include: {
          inventory: true,
        },
      });
      if (!user) {
        throw new Error('User not found');
      }
      const available_item = await this.prismaService.item.findFirst({
        where: {
          store_id: 1,
          name: payload.name,
        },
      });
      if (!available_item) {
        throw new Error('Item not found');
      }
      if (
        (available_item.currency === 'CRYSTAL' &&
          available_item.price > user.crystals_balance) ||
        (available_item.currency === 'TON' &&
          available_item.price > user.ton_balance)
      ) {
        throw new Error('Insufficient funds');
      }
      const item = await this.prismaService.item.create({
        data: {
          ...available_item,
          id: undefined,
          store_id: null,
          inventory_id: user.inventory.id,
        },
      });
      const decrement_crystals = {
        crystals_balance: {
          decrement: available_item.price,
        },
      };
      const decrement_ton = {
        ton_balance: {
          decrement: available_item.price,
        },
      };
      await this.prismaService.user.update({
        where: { user_id },
        data: {
          ...(available_item.currency == 'CRYSTAL'
            ? decrement_crystals
            : decrement_ton),
        },
      });
      return item;
    } catch {
      throw new Error('Failed to buy item');
    }
  }
}
