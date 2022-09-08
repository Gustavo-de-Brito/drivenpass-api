import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserAuth } from '../types/userType';
import { users } from '@prisma/client';
import * as userRepository from '../repositories/userRepository';

dotenv.config();

async function isEmailAlreadyRegistered(email: string) {
  const userData: users | null = await userRepository.getUserByEmail(email);

  if(userData) {
    throw { code: 'conflict', message: 'email já cadastrado' };
  }
}

export async function registerUser(userData: UserAuth) {
  const BCRYPT_SALTS = 10;
  await isEmailAlreadyRegistered(userData.email);
  const encryptedPassword: string = bcrypt.hashSync(
    userData.password, BCRYPT_SALTS
  );
  userData.password = encryptedPassword

  await userRepository.insert(userData);
}

async function isUserRegistered(email: string):Promise<users> {
  const userData: users | null = await userRepository.getUserByEmail(email);

  if(!userData) {
    throw {
      code: 'unauthorized',
      message: 'os dados de login estão incorretos'
    }
  }

  return userData;
}

function checkPassword(databasePassword: string, password: string) {
  const isRightPassword = bcrypt.compareSync(password, databasePassword);

  if(!isRightPassword) {
    throw {
      code: 'unauthorized',
      message: 'os dados de login estão incorretos' 
    };
  }
}

export async function loginUser(userData: UserAuth) {
  const dbUser: users = await isUserRegistered(userData.email);
  checkPassword(dbUser.password, userData.password);

  const JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY ?? '';
  const EXPIRATION_TIME: number = 60 * 60 * 2;
  const token:string = jwt.sign(
    { userId: dbUser },
    JWT_PRIVATE_KEY,
    { expiresIn: EXPIRATION_TIME }
  );

  return { token };
}