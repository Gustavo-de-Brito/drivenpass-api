import { notes } from '@prisma/client';
import prisma from '../databases/postgres';
import { NoteData } from '../types/noteTypes';

export async function getNoteByTitleAndUserid(
  title: string,
  userId: number
): Promise<notes | null> {
  const noteData: notes | null = 
  await prisma.notes.findFirst(
    {
      where: { title, userId }
    }
  );

  return noteData;
}

export async function insert(note: NoteData, userId: number) {
  await prisma.notes.create({ data: {...note, userId}});
}