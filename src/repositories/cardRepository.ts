import { cards } from '@prisma/client';
import prisma from '../databases/postgres';
import { CardData } from '../types/cardTypes';

export async function getCardByTitleAndUserid(
  title: string,
  userId: number
): Promise<cards | null> {
  const cardData: cards | null = 
  await prisma.cards.findFirst(
    {
      where: { title, userId }
    }
  );

  return cardData;
}

export async function insert(card: CardData, userId: number) {
  await prisma.cards.create({ data: {...card, userId}});
}