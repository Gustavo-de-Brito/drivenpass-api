import prisma from '../databases/postgres';
import { credentials } from '@prisma/client';
import { CredentialData } from '../types/credentialTypes';

export async function getCredentialByTitleAndUserid(
  title: string,
  userId: number
): Promise<credentials | null> {
  const credentialData: credentials | null = 
  await prisma.credentials.findFirst(
    {
      where: { title, userId }
    }
  );

  return credentialData;
}

export async function getCredentialsByUserId(
  userId: number
): Promise<credentials[]> {
  const credentials: credentials[] = await prisma.credentials.findMany(
    {
      where: { userId }
    }
  );

  return credentials;
}

export async function getCredentialById(
  credentialId: number
): Promise<credentials | null> {
  const credential: credentials | null = await prisma.credentials.findUnique(
    {
      where: { id: credentialId }
    }
  );

  return credential;
}

export async function insert(credential: CredentialData, userId: number) {
  await prisma.credentials.create({ data: {...credential, userId}});
}

export async function deleteCredential(credentialId: number) {
  await prisma.credentials.delete({ where: { id: credentialId }});
}