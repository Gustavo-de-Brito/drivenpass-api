import { cards } from '@prisma/client';
import { Request, Response } from 'express';

export async function registerNewCard(req: Request, res: Response) {
  const card:cards = req.body;

  try {
    res.sendStatus(503);
  } catch(err: any) {
    res.sendStatus(500);
  }
}