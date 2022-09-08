import prisma from '../databases/postgres';
import { users } from '@prisma/client';
import { UserAuth } from '../types/userType';

export async function getUserByEmail(email: string): Promise<users | null> {
  const userData: users | null = await prisma.users.findUnique(
    { where: { email }}
  );

  return userData;
}

export async function getUserById(userId: number): Promise<users | null>{
  const userData: users | null = await prisma.users.findUnique(
    {
      where: { id: userId }
    }
  )

  return userData;
}

export async function insert(newUser: UserAuth) {
  await prisma.users.create({ data: newUser });
}