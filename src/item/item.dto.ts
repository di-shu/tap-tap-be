import { ApiProperty } from '@nestjs/swagger';
import { Currency, ItemTypes } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateItemDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  type: ItemTypes;

  @ApiProperty()
  description?: string;

  @IsNotEmpty()
  @ApiProperty()
  estimated_income: number;

  @IsNotEmpty()
  @ApiProperty()
  income: number;

  @IsNotEmpty()
  @ApiProperty()
  expires_in: number;

  @IsNotEmpty()
  @ApiProperty()
  lifetime: number;

  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @ApiProperty()
  currency: Currency;

  @IsNotEmpty()
  @ApiProperty()
  level: number;

  @ApiProperty()
  inventory_id?: number;

  @ApiProperty()
  inventory?: object;

  @ApiProperty()
  store_id?: number;

  store?: object;
}
