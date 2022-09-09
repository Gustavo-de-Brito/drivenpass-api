import dotenv from 'dotenv';
import Cryptr from 'cryptr';
import { CredentialData } from '../types/credentialTypes';
import { credentials } from '@prisma/client';
import * as credentialRepository from '../repositories/credentialRepository';

dotenv.config();

async function searchTitle(title: string, userId: number) {
  const credentialData: credentials | null = 
  await credentialRepository.getCredentialByTitleAndUserid(title, userId);

  if(credentialData) {
    throw {
      code: 'conflict',
      message: 'já existe uma credencial com esse título'
    }
  }
}

function encryptPassword(password: string): string {
  const CRYPTR_PRIVATE_KEY = process.env.CRYPTR_PRIVATE_KEY ?? ''; 
  const cryptr = new Cryptr(CRYPTR_PRIVATE_KEY);
  const encryptedPassword: string = cryptr.encrypt(password);

  return encryptedPassword;
}

export async function createCredential(
  newCredential: CredentialData,
  userId: number
) {
  await searchTitle(newCredential.title, userId);

  const encryptedPassword = encryptPassword(newCredential.password);

  await credentialRepository.insert(newCredential, userId);
}