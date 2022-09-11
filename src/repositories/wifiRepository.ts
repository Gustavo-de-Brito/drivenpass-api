import prisma from '../databases/postgres';
import { WifiData } from '../types/wifiTypes';

export async function insert(wifi: WifiData, userId: number) {
  await prisma.wifiNetworks.create({ data: { ...wifi, userId }});
}