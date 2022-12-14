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

  await credentialRepository.insert(
    {
      ...newCredential,
      password: encryptedPassword
    },
    userId
  );
}

function decryptCredentialPassword(credential: credentials) {
  const CRYPTR_PRIVATE_KEY = process.env.CRYPTR_PRIVATE_KEY ?? ''; 
  const cryptr = new Cryptr(CRYPTR_PRIVATE_KEY);

  const decryptedPassword: string = cryptr.decrypt(credential.password);
  const decryptedCredential: credentials = {
    ...credential,
    password: decryptedPassword
  };

  return decryptedCredential;
}

export async function getAllUserCredentials(
  userId: number
): Promise<credentials[]> {
  const credentials: credentials[] = 
    await credentialRepository.getCredentialsByUserId(userId);

  const decryptedCredentials: credentials[] = credentials.map(credential => {
    const decryptedCredential: credentials = decryptCredentialPassword(
      credential
    );

    return decryptedCredential;
  });

  return decryptedCredentials;
}

export async function getCredentialById(
  credentialId: number,
  userId: number
): Promise<credentials> {
  const credential: credentials | null = 
    await credentialRepository.getCredentialById(credentialId);

    if(!credential) {
      throw {
        code: 'not_found',
        message: 'Os dados dessa credencial são inválidos'
      }
    }

    if(credential.userId !== userId) {
      throw {
        code: 'unauthorized',
        message: 'Você não tem acesso a essa credencial'
      }
    }

    const decryptedCredential: credentials = decryptCredentialPassword(
      credential
    );

    return decryptedCredential;
}

export async function deleteCredentialById(
  credentialId: number,
  userId: number
) {
  const credential: credentials | null =
    await credentialRepository.getCredentialById(credentialId);

  if(!credential) {
    throw {
      code: 'unauthorized',
      message: 'Você não possui uma credencial com esse id'
    };
  } else if(credential.userId !== userId) {
    throw {
      code: 'unauthorized',
      message: 'Você não possui uma credencial com esse id'
    };
  }
  await credentialRepository.deleteCredential(credentialId);
}