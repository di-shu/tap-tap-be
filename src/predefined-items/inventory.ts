import { ItemTypes, Currency } from '@prisma/client';
import { CreateItemDTO } from 'src/item/item.dto';

export const predefinedItems: CreateItemDTO[] = [
  {
    name: 'Leather Helmet',
    type: ItemTypes.HELMET,
    estimated_income: 0.09,
    income: 0.01,
    expires_in: 32400,
    lifetime: 32400,
    price: 600,
    currency: Currency.CRYSTAL,
    level: 1,
  },
  {
    name: 'Wooden Pickaxe',
    type: ItemTypes.PICKAXE,
    estimated_income: 0.09,
    income: 0.01,
    expires_in: 32400,
    lifetime: 32400,
    price: 500,
    currency: Currency.CRYSTAL,
    level: 1,
  },
];
