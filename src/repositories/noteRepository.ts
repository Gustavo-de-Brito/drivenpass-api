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

export async function getNotesByUserId(
  userId: number
): Promise<notes[]> {
  const notes: notes[] = await prisma.notes.findMany(
    {
      where: { userId }
    }
  );

  return notes;
}

export async function getNoteById(
  noteId: number
): Promise<notes | null> {
  const note: notes | null = await prisma.notes.findUnique(
    {
      where: { id: noteId }
    }
  );

  return note;
}

export async function insert(note: NoteData, userId: number) {
  await prisma.notes.create({ data: {...note, userId}});
}