import { wifiNetworks } from '@prisma/client';
import prisma from '../databases/postgres';
import { WifiData } from '../types/wifiTypes';

export async function insert(wifi: WifiData, userId: number) {
  await prisma.wifiNetworks.create({ data: { ...wifi, userId }});
}

export async function getWifisByUserId(
  userId: number
): Promise<wifiNetworks[]> {
  const wifis: wifiNetworks[] = await prisma.wifiNetworks.findMany(
    {
      where: { userId }
    }
  );

  return wifis;
}

export async function getWifiById(
  wifiId: number
): Promise<wifiNetworks | null> {
  const wifi: wifiNetworks | null = await prisma.wifiNetworks.findUnique(
    {
      where: { id: wifiId }
    }
  );

  return wifi;
}

export async function deleteWifi(wifiId: number) {
  await prisma.wifiNetworks.delete({ where: { id: wifiId }});
}