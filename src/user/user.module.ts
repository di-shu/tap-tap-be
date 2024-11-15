import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [PrismaService, UserService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
