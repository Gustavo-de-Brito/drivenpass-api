import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const authorization: string | undefined = req.headers.authorization;
  const token:string | undefined = authorization?.replace('Bearer ', '');

  if(!token) {
    return res.status(401).send('Essa rota precisa de um token de acesso');
  }

  const JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY ?? '';
  const indentificationData = jwt.verify(token, JWT_PRIVATE_KEY);

  res.locals.userId = indentificationData;

  next();
}

export default tokenValidation;