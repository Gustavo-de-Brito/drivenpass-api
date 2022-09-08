import { Request, Response } from 'express';
import IUserAuth from '../types/authUserType';
import authService from '../services/authServices';

export async function signUp(req: Request, res: Response) {
  const body:IUserAuth = req.body;

  try {
    await authService(body);

    res.sendStatus(201);
  } catch(err: any) {
    if(err.code === 'conflict') return res.status(409).send(err.message)
    res.sendStatus(500);
  }
}