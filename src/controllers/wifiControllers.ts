import { Request, Response } from 'express';
import { WifiData } from '../types/wifiTypes';
import { users, wifiNetworks } from '@prisma/client';
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

export async function getWifis(req: Request, res: Response) {
  const wifiId: number = Number(req.query.id);
  const userData: users = res.locals.userData;

  try {
    if(isNaN(wifiId)) {
      const wifis: wifiNetworks[] = 
        await wifiService.getAllUserWifis(userData.id);

      res.status(200).send(wifis);
    } else {
      const wifi: wifiNetworks =
        await wifiService.getWifiById(wifiId, userData.id);

      res.status(200).send(wifi);
    }
  } catch(err: any) {
    if(err.code === 'not_found') return res.status(404).send(err.message);
    console.log(err)

    res.sendStatus(500);
  }
}

export async function deleteWifi(req: Request, res: Response) {
  const wifiId: number = parseInt(req.params.id);
  const userData: users = res.locals.userData;

  try {
    await wifiService.deleteWifiById(wifiId, userData.id);

    res.sendStatus(200);
  } catch(err: any) {
    if(err.code === 'not_found') return res.status(401).send(err.message);
    res.sendStatus(500);
  }
}