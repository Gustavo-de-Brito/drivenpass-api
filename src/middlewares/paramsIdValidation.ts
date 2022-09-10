import { Request, Response, NextFunction } from 'express';

function paramsIdValidation(req: Request, res: Response, next: NextFunction) {
  const id: number = parseInt(req.params.id);

  if(isNaN(id)) return res.status(422).send('valor de id inválido');

  next();
}

export default paramsIdValidation;