import { Module } from '@nestjs/common';
import { PerformanceController } from './performance.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PerformanceService } from './performance.service';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [PrismaService, JwtService, PerformanceService],
  controllers: [PerformanceController],
})
export class PerformanceModule {}
