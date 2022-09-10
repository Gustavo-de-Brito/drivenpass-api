import { Request, Response } from 'express';
import { CredentialData } from '../types/credentialTypes'
import { credentials, users } from '@prisma/client';
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

export async function getCredentials(req: Request, res: Response) {
  const credentialId: number = Number(req.query.id);
  const userData: users = res.locals.userData;

  try {
    if(isNaN(credentialId)) {
      const credentials: credentials[] = 
        await credentialService.getAllUserCredentials(userData.id);

      res.status(200).send(credentials);
    } else {
      const credential: credentials =
        await credentialService.getCredentialById(credentialId, userData.id);

      res.status(200).send(credential);
    }
  } catch(err: any) {
    if(err.code === 'not_found') return res.status(404).send(err.message);
    else if(err.code === 'unauthorized') return res.status(401).send(err.message);
    res.sendStatus(500);
  }
}

export async function deleteCredential(req: Request, res: Response) {
  const credetnialId: number = parseInt(req.params.id);
  const userData: users = res.locals.userData;

  try {
    await credentialService.deleteCredentialById(credetnialId, userData.id);

    res.sendStatus(200);
  } catch(err: any) {
    if(err.code === 'unauthorized') return res.status(401).send(err.message);
    res.sendStatus(500);
  }
}