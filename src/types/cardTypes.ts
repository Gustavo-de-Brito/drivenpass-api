import { cards, Cardtype } from '@prisma/client';

export type CardData = Omit<cards, 'id' | 'userId'>;

export type CardType = keyof typeof Cardtype;