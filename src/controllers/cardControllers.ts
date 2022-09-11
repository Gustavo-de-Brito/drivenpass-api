import { cards, users } from '@prisma/client';
import { Request, Response } from 'express';
import { CardData } from '../types/cardTypes';
import * as cardService from '../services/cardService';

export async function registerNewCard(req: Request, res: Response) {
  const card:CardData = req.body;
  const userData: users = res.locals.userData;

  try {
    await cardService.createCard(card, userData.id);

    res.sendStatus(201);
  } catch(err: any) {
    if(err.code === 'conflict') return res.status(409).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getCards(req: Request, res: Response) {
  const cardId: number = Number(req.query.id);
  const userData: users = res.locals.userData;

  try {
    if(isNaN(cardId)) {
      const cards: cards[] = 
        await cardService.getAllUserCards(userData.id);

      res.status(200).send(cards);
    } else {
      const card: cards =
        await cardService.getCardById(cardId, userData.id);

      res.status(200).send(card);
    }
  } catch(err: any) {
    if(err.code === 'not_found') return res.status(404).send(err.message);

    res.sendStatus(500);
  }
}