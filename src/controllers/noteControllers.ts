import { Request, Response } from 'express';
import * as noteService from '../services/noteService';
import { NoteData } from '../types/noteTypes';
import { users } from '@prisma/client';

export async function registerNewNote(req: Request, res: Response) {
  const note: NoteData = req.body;
  const userData: users = res.locals.userData;

  try {
    await noteService.createNote(note, userData.id);

    res.sendStatus(201);
  } catch(err: any) {
    if(err.code === 'conflict') return res.status(409).send(err.message);
    res.sendStatus(500);
  }
}