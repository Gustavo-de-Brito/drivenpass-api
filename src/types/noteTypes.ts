import { notes } from '@prisma/client';

export type NoteData = Omit<notes, 'id' | 'userId'>;