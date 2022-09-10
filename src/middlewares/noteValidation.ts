import { Request, Response, NextFunction } from 'express';
import noteSchema from '../schemas/noteSchema';

function noteValidation(req: Request, res: Response, next: NextFunction) {
  const newNote = req.body;

  const { error } = noteSchema.validate(newNote, { abortEarly: false });

  if(error) {
    const errors: string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default noteValidation;