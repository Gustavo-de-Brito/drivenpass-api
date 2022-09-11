import { Request, Response, NextFunction } from 'express';
import cardSchema from '../schemas/cardSchema';

function cardValidation(req: Request, res: Response, next: NextFunction) {
  const card = req.body;

  const { error } = cardSchema.validate(card, { abortEarly: false });

  if(error) {
    const errors: string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default cardValidation;