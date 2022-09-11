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

export async function getCardsByUserId(
  userId: number
): Promise<cards[]> {
  const cards: cards[] = await prisma.cards.findMany(
    {
      where: { userId }
    }
  );

  return cards;
}

export async function getCardById(
  cardId: number
): Promise<cards | null> {
  const card: cards | null = await prisma.cards.findUnique(
    {
      where: { id: cardId }
    }
  );

  return card;
}

export async function deleteCard(cardId: number) {
  await prisma.cards.delete({ where: { id: cardId }});
}