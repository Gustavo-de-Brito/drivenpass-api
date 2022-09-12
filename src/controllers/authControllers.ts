import { Request, Response } from 'express';
import { UserAuth } from '../types/userType';
import * as authService from '../services/authService';

export async function signUp(req: Request, res: Response) {
  const userData:UserAuth = req.body;

  try {
    await authService.registerUser(userData);

    res.sendStatus(201);
  } catch(err: any) {
    console.log(err)
    if(err.code === 'conflict') return res.status(409).send(err.message);
    res.sendStatus(500);
  }
}

export async function signIn(req: Request, res: Response) {
  const userData: UserAuth = req.body;
  try {
    const token = await authService.loginUser(userData);
    res.status(200).send(token);
  } catch(err: any) {
    if(err.code === 'unauthorized') return res.status(401).send(err.message);
    res.sendStatus(500);
  }
}