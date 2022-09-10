import { notes } from '@prisma/client';
import { NoteData } from '../types/noteTypes';
import * as noteRepository from '../repositories/noteRepository';
import Cryptr from 'cryptr';

async function searchTitle(title: string, userId: number) {
  const noteData: notes | null = 
  await noteRepository.getNoteByTitleAndUserid(title, userId);

  if(noteData) {
    throw {
      code: 'conflict',
      message: 'já existe uma nota com esse título'
    }
  }
}

export async function createNote(note: NoteData, userId: number) {
  await searchTitle(note.title, userId);

  await noteRepository.insert(note, userId);
}

export async function getAllUserNotes(
  userId: number
): Promise<notes[]> {
  const notes: notes[] = 
    await noteRepository.getNotesByUserId(userId);

  return notes;
}

export async function getNoteById(
  noteId: number,
  userId: number
): Promise<notes> {
  const note: notes | null = 
    await noteRepository.getNoteById(noteId);

  if(!note) {
    throw {
      code: 'not_found',
      message: 'Você não possui uma nota com esse id'
    }
  } else if(note.userId !== userId) {
    throw {
      code: 'not_found',
      message: 'Você não possui uma nota com esse id'
    }
  }

  return note;
}