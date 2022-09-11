import { Request, Response } from 'express';
import { WifiData } from '../types/wifiTypes';
import { users } from '@prisma/client';
import * as wifiService from '../services/wifiService';

export async function registerNewWifi(req: Request, res: Response) {
  const wifi:WifiData = req.body;
  const userData: users = res.locals.userData;

  try {
    await wifiService.createWifi(wifi, userData.id);

    res.sendStatus(503);
  } catch(err: any) {
    if(err.code === 'conflict') return res.status(409).send(err.message);
    console.log(err);
    res.sendStatus(500);
  }
}