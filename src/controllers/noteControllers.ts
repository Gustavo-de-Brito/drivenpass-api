import { Request, Response } from 'express';
import * as noteService from '../services/noteService';
import { NoteData } from '../types/noteTypes';
import { users, notes } from '@prisma/client';

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

export async function getNotes(req: Request, res: Response) {
  const noteId: number = Number(req.query.id);
  const userData: users = res.locals.userData;

  try {
    if(isNaN(noteId)) {
      const notes: notes[] = 
        await noteService.getAllUserNotes(userData.id);

      res.status(200).send(notes);
    } else {
      const note: notes =
        await noteService.getNoteById(noteId, userData.id);

      res.status(200).send(note);
    }
  } catch(err: any) {
    if(err.code === 'not_found') return res.status(404).send(err.message);
    else if(err.code === 'unauthorized') return res.status(401).send(err.message);
    res.sendStatus(500);
  }
}