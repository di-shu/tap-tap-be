import { Currency } from '@prisma/client';

export type ItemTypes = 'FOOTWEAR' | 'PICKAXE' | 'CARRIAGE' | 'HELMET';

export interface IItem {
  id: number;
  name: string;
  type: ItemTypes;
  description?: string;
  estimated_income: number;
  income: number;
  expires_in: number;
  lifetime: number;
  price: number;
  currency: Currency;
  level: number;
  inventory_id?: number;
  inventory?: object;
  store_id?: number;
  store?: object;
}
