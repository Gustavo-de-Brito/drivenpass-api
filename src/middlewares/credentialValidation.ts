import { Request, Response, NextFunction } from 'express';
import { URL } from 'url';
import credentialSchema from '../schemas/credentialSchema';

async function credentialValidation(req: Request, res: Response, next: NextFunction) {
  const newCredential = req.body;
  
  const { error } = credentialSchema.validate(
    newCredential,
    { abortEarly: false}
  );

  if(error) {
    const errors: string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default credentialValidation;