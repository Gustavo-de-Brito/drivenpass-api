import bcrypt from 'bcrypt';
import IUserAuth from '../types/authUserType';
import { getUserByEmail, insert } from '../repositories/userRepository';

async function isEmailAlreadyRegistered(email: string) {
  const userData = await getUserByEmail(email);

  if(userData) {
    throw { code: 'conflict', message: 'email já cadastrado' };
  }
}

async function registerUser(userData: IUserAuth) {
  const BCRYPT_SALTS = 10;
  await isEmailAlreadyRegistered(userData.email);
  const encryptedPassword: string = bcrypt.hashSync(
    userData.password, BCRYPT_SALTS
  );
  userData.password = encryptedPassword

  await insert(userData);
}

export default registerUser;