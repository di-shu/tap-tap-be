import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { InventoryService } from './inventory/inventory.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { InventoryModule } from './inventory/inventory.module';
import { StoreModule } from './store/store.module';
import { ItemModule } from './item/item.module';
import { FarmingModule } from './farming/farming.module';
import { PerformanceModule } from './performance/performance.module';
import { PaymentModule } from './payment/payment.module';
import { WalletsService } from './wallets/wallets.service';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    ConfigModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    InventoryModule,
    StoreModule,
    ItemModule,
    FarmingModule,
    PerformanceModule,
    PaymentModule,
    WalletsModule,
  ],
  providers: [
    AppService,
    ConfigService,
    AppUpdate,
    AuthService,
    InventoryService,
    UserService,
    WalletsService,
  ],
  controllers: [AppController, AuthController],
})
export class AppModule {}
