import { credentials } from '@prisma/client';

export type CredentialData = Omit<credentials, 'id' | 'userId'>;