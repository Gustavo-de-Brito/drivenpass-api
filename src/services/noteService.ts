import { notes } from '@prisma/client';
import { NoteData } from '../types/noteTypes';
import * as noteRepository from '../repositories/noteRepository';

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