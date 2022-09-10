import { Router } from 'express';
import {
  tokenValidation,
  verifyTokenDatabase
} from '../middlewares/tokenValidation';
import noteValidation from '../middlewares/noteValidation';
import { registerNewNote } from '../controllers/noteControllers';

const noteRouter = Router();

noteRouter.post(
  '/notes',
  tokenValidation,
  verifyTokenDatabase,
  noteValidation,
  registerNewNote
);

export default noteRouter;