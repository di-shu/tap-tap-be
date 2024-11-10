import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Farming, Inventory } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';

type FarmingPayload = Omit<
  Farming,
  'id' | 'user_id' | 'start_time' | 'end_time' | 'isClaimed'
>;

interface ClaimRewardResult {
  farming: Farming;
  updatedInventory: Inventory;
}

@Injectable()
export class FarmingService {
  constructor(private readonly prismaService: PrismaService) {}

  @UseGuards(AuthGuard)
  async startFarming(userId: string): Promise<Farming> {
    let farmingSession = await this.prismaService.farming.findUnique({
      where: { user_id: userId },
    });
    const inventory = await this.prismaService.inventory.findUnique({
      where: { user_id: userId },
      include: {
        items: true,
      },
    });
    const calculatedFarming: FarmingPayload = inventory.items.reduce(
      (acc, item): FarmingPayload => {
        const farming = {
          total_reward: acc.total_reward + item.estimated_income,
          earnings_rate: acc.earnings_rate + item.income,
          session_reward: acc.session_reward + item.income * 3,
        };
        return farming;
      },
      {
        total_reward: 0,
        earnings_rate: 0,
        session_reward: 0,
      },
    );
    const data = {
      start_time: new Date(),
      end_time: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
      isClaimed: false,
      ...calculatedFarming,
    };
    if (!farmingSession) {
      farmingSession = await this.prismaService.farming.create({
        data: { user_id: userId, ...data },
      });
    } else {
      farmingSession = await this.prismaService.farming.update({
        where: { user_id: userId },
        data,
      });
    }
    return farmingSession;
  }

  async claimReward(userId: string): Promise<ClaimRewardResult> {
    const farmingSession = await this.prismaService.farming.findFirst({
      where: { user_id: userId },
    });

    if (farmingSession && farmingSession.end_time > new Date()) {
      throw new Error('Farming session not found or not ended yet');
    }

    const farmingUpdateData = {
      isClaimed: true,
      end_time: null,
      start_time: null,
    };

    const farmingTime =
      farmingSession.end_time.getTime() - farmingSession.start_time.getTime();

    // Update user balance and farming session
    await this.prismaService.user.update({
      where: { user_id: userId },
      data: {
        ton_balance: { increment: farmingSession.session_reward },
        farming: {
          update: {
            data: farmingUpdateData,
          },
        },
      },
    });

    // Find user's inventory
    let inventory = await this.prismaService.inventory.findFirst({
      where: { user_id: userId },
    });

    if (!inventory) {
      throw new Error(`User's inventory not found`);
    }

    // Decrement expires_in of items related to found inventory
    await this.prismaService.item.updateMany({
      where: { inventory_id: inventory.id },
      data: {
        expires_in: {
          decrement: farmingTime / 1000, // Convert milliseconds to seconds
        },
      },
    });

    // Delete expired items after decrementing `expires_in`
    await this.prismaService.item.deleteMany({
      where: {
        AND: [{ expires_in: { lte: 0 } }, { inventory_id: inventory.id }],
      },
    });

    inventory = await this.prismaService.inventory.findFirst({
      where: { user_id: userId },
      include: {
        items: true,
      },
    });

    return {
      farming: { ...farmingSession, ...farmingUpdateData },
      updatedInventory: inventory,
    };
  }
}
