import { Request, Response } from 'express';
import { CredentialData } from '../types/credentialTypes'
import { users } from '@prisma/client';
import * as credentialService from '../services/credentialService';

export async function registerCredential(req: Request, res: Response) {
  const credential: CredentialData = req.body;
  const userData: users = res.locals.userData;

  try {
    await credentialService.createCredential(credential, userData.id);
    res.sendStatus(201);
  } catch(err: any) {
    if(err.code === 'conflict') return res.status(409).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}