import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { WalletsService } from 'src/wallets/wallets.service';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [PaymentService, PrismaService, JwtService, WalletsService],
  controllers: [PaymentController],
})
export class PaymentModule {}
