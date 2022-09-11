import { cards } from '@prisma/client';

export type CardData = Omit<cards, 'id' | 'userId'>;