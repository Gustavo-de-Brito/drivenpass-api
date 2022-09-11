import Cryptr from 'cryptr';
import { cards } from "@prisma/client";
import { CardData, CardType } from "../types/cardTypes";
import * as cardRepository from '../repositories/cardRepository';
import dotenv from 'dotenv';

dotenv.config();

async function searchTitle(title: string, userId: number) {
  const credentialData: cards | null = 
  await cardRepository.getCardByTitleAndUserid(title, userId);

  if(credentialData) {
    throw {
      code: 'conflict',
      message: 'já existe um cartão com esse título'
    }
  }
}

function encryptData(data: string): string {
  const CRYPTR_PRIVATE_KEY = process.env.CRYPTR_PRIVATE_KEY ?? ''; 
  const cryptr = new Cryptr(CRYPTR_PRIVATE_KEY);
  const encryptedPassword: string = cryptr.encrypt(data);

  return encryptedPassword;
}

export async function createCard(
  newCard: CardData,
  userId: number
) {
  await searchTitle(newCard.title, userId);

  const cardType: CardType = newCard.cardType.toUpperCase() as CardType;

  const encryptedPassword = encryptData(newCard.password);
  const encryptedSecurityCode = encryptData(newCard.securityCode);

  await cardRepository.insert(
    {
      ...newCard,
      password: encryptedPassword,
      securityCode: encryptedSecurityCode,
      cardType: cardType
    },
    userId
  );
}