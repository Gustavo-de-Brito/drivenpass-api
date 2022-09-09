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

export async function insert(credential: CredentialData, userId: number) {
  await prisma.credentials.create({ data: {...credential, userId}});
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