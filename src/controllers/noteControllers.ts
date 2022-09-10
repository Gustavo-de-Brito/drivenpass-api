import { Request, Response } from 'express';

export async function registerNewNote(req: Request, res: Response) {
  try {
    res.sendStatus(503);
  } catch(err: any) {
    res.sendStatus(500);
  }
}