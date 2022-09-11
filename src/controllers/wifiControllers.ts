import { Request, Response } from 'express';
import { WifiData } from '../types/wifiTypes';
import { users } from '@prisma/client';
import * as wifiService from '../services/wifiService';

export async function registerNewWifi(req: Request, res: Response) {
  const wifi:WifiData = req.body;
  const userData: users = res.locals.userData;

  try {
    await wifiService.createWifi(wifi, userData.id);

    res.sendStatus(201);
  } catch(err: any) {
    res.sendStatus(500);
  }
}