import { Request, Response, NextFunction } from "express";
import authSchema from "../schemas/authSchema";

function authValidation(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  const { error } = authSchema.validate(body, { abortEarly: false });

  if(error) {
    const errors: string[] = error.details.map(err => err.message);

    return res.status(422).send(errors);
  }

  next();
}

export default authValidation;