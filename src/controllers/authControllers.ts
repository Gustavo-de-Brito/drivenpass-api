import { Request, Response } from "express";

export async function signUp(req: Request, res: Response) {
  try {
    res.sendStatus(503);
  } catch(err) {
    res.sendStatus(500);
  }
}