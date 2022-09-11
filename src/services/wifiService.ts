import { WifiData } from "../types/wifiTypes";
import dotenv from 'dotenv';
import Cryptr from 'cryptr';
import * as wifiRepository from '../repositories/wifiRepository';

dotenv.config();

function encryptData(data: string): string {
  const CRYPTR_PRIVATE_KEY = process.env.CRYPTR_PRIVATE_KEY ?? ''; 
  const cryptr = new Cryptr(CRYPTR_PRIVATE_KEY);
  const encryptedPassword: string = cryptr.encrypt(data);

  return encryptedPassword;
}

export async function createWifi(wifi: WifiData, userId: number) {
  const encryptedPassword: string = encryptData(wifi.password);

  await wifiRepository.insert(wifi, userId);
}