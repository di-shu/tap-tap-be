import { Module } from '@nestjs/common';
import { FarmingController } from './farming.controller';
import { FarmingService } from './farming.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [FarmingController],
  providers: [FarmingService, PrismaService, JwtService],
})
export class FarmingModule {}
