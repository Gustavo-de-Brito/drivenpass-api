import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as authService from '../services/authService';
import { users } from '@prisma/client';

dotenv.config();

export function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization: string | undefined = req.headers.authorization;
  const token:string | undefined = authorization?.replace('Bearer ', '');

  if(!token) {
    return res.status(401).send('Essa rota precisa de um token de acesso');
  }
  
  try {
    const JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY ?? '';
    const indentificationData = jwt.verify(token, JWT_PRIVATE_KEY);
    
    res.locals.indentificationData = indentificationData;
    
    next();
  } catch {
    res.status(401).send('Token de acesso inválido');
  }
}

export async function verifyTokenDatabase(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const indentificationData = res.locals.indentificationData;

  try {
    const userData: users | null = await authService.getUserData(
      indentificationData.userId
    );

    if(!userData) {
      return res.status(401).send('O token passado é inválido');
    }

    res.locals.userData = userData;

    next();
  } catch(err) {
    res.status(401).send('O token passado é inválido');
  }
}