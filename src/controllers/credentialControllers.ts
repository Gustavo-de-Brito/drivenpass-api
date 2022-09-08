import { Request, Response } from 'express';
import { CredentialData } from '../types/credentialTypes'

export async function registerCredential(req: Request, res: Response) {
  const credential: CredentialData = req.body;

  try {
    res.sendStatus(503);
  } catch(err: any) {
    res.sendStatus(500);
  }
}