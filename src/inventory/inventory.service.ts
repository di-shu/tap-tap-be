import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private readonly prismaService: PrismaService) {}

  //   async createItem(payload) {
  //     try {
  //       const item = await this.prismaService.item.create({
  //         data: payload,
  //       });
  //       return item;
  //     } catch (error) {
  //       throw new Error('Error creating item');
  //     }
}
