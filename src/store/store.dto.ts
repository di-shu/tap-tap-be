import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StoreBuyItemDTO {
  @IsNotEmpty()
  @ApiProperty()
  valid: boolean;
}
