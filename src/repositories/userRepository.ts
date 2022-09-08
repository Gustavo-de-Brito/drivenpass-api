import prisma from '../databases/postgres';
import IUserAuth from '../types/authUserType';

export async function getUserByEmail(email: string) {
  const userData = await prisma.users.findUnique({ where: { email }});

  return userData;
}

export async function insert(newUser: IUserAuth) {
  await prisma.users.create({ data: newUser });
}