import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStore() {
    try {
      const store = await this.prismaService.store.findFirst({
        include: {
          items: true,
        },
      });
      return store;
    } catch {
      return { error: 'Store not found' };
    }
  }
}
