import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TapToEarnDTO {
  @IsNotEmpty()
  @ApiProperty()
  earnings: number;

  @ApiProperty()
  available_taps: number;
}
