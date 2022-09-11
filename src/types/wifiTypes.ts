import { wifiNetworks } from '@prisma/client';

export type WifiData = Omit<wifiNetworks, 'id' | 'userId'>;