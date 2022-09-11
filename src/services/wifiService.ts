import { WifiData } from "../types/wifiTypes";
import dotenv from 'dotenv';
import Cryptr from 'cryptr';
import * as wifiRepository from '../repositories/wifiRepository';
import { wifiNetworks } from "@prisma/client";

dotenv.config();

function encryptData(data: string): string {
  const CRYPTR_PRIVATE_KEY = process.env.CRYPTR_PRIVATE_KEY ?? ''; 
  const cryptr = new Cryptr(CRYPTR_PRIVATE_KEY);
  const encryptedPassword: string = cryptr.encrypt(data);

  return encryptedPassword;
}

export async function createWifi(wifi: WifiData, userId: number) {
  const encryptedPassword: string = encryptData(wifi.password);

  await wifiRepository.insert({...wifi, password: encryptedPassword}, userId);
}

function decryptCryptr(data: string) {
  const CRYPTR_PRIVATE_KEY = process.env.CRYPTR_PRIVATE_KEY ?? ''; 
  const cryptr = new Cryptr(CRYPTR_PRIVATE_KEY);
  console.log()

  const decryptedData: string = cryptr.decrypt(data);

  return decryptedData;
}

export async function getAllUserWifis(
  userId: number
): Promise<wifiNetworks[]> {
  const wifis: wifiNetworks[] = 
    await wifiRepository.getWifisByUserId(userId);

  const decryptedWifis: wifiNetworks[] = wifis.map(wifi => {
    const decryptedPassword: string = decryptCryptr(wifi.password);

    return {
      ...wifi,
      password: decryptedPassword
    };
  });

  return decryptedWifis;
}

export async function getWifiById(
  wifiId: number,
  userId: number
): Promise<wifiNetworks> {
  const wifi: wifiNetworks | null = 
    await wifiRepository.getWifiById(wifiId);

    if(!wifi) {
      throw {
        code: 'not_found',
        message: 'Você não possui uma rede wifi com esse id'
      }
    } else if(wifi.userId !== userId) {
      throw {
        code: 'not_found',
        message: 'Você não possui uma rede wifi com esse id'
      }
    }

    const decryptedPassword: string = decryptCryptr(wifi.password);

    return {
      ...wifi,
      password: decryptedPassword
    };
}

export async function deleteWifiById(
  wifiId: number,
  userId: number
) {
  const wifi: wifiNetworks | null =
    await wifiRepository.getWifiById(wifiId);

  if(!wifi) {
    throw {
      code: 'not_found',
      message: 'Você não possui uma rede wifi com esse id'
    };
  } else if(wifi.userId !== userId) {
    throw {
      code: 'not_found',
      message: 'Você não possui uma rede wifi com esse id'
    };
  }

  await wifiRepository.deleteWifi(wifiId);
}