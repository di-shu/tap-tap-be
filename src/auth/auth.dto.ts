import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TelegramValidationDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  initData: string;
}

export class TelegramValidationResponseDTO {
  @IsNotEmpty()
  @ApiProperty()
  valid: boolean;
}
