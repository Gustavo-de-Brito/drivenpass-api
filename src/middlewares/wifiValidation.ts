import { Request, Response, NextFunction } from 'express';
import wifiSchema from '../schemas/wifiSchema';

function wifiValidation(req: Request, res: Response, next: NextFunction) {
  const wifi = req.body;

  const { error } = wifiSchema.validate(wifi, { abortEarly: false });

  if(error) {
    const errors: string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default wifiValidation;