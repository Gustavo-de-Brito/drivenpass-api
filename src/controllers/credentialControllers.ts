import { Request, Response } from 'express';
import { CredentialData } from '../types/credentialTypes'
import { UserAuth } from '../types/userType';

export async function registerCredential(req: Request, res: Response) {
  const credential: CredentialData = req.body;
  const userData: UserAuth = res.locals.userData;

  try {
    res.sendStatus(503);
  } catch(err: any) {
    res.sendStatus(500);
  }
}