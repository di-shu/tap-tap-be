import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  exports: [ItemService],
  providers: [ItemService, PrismaService, JwtService],
  controllers: [ItemController],
})
export class ItemModule {}
