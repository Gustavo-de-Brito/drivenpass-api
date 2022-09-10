import { Router } from 'express';
import {
  tokenValidation,
  verifyTokenDatabase
} from '../middlewares/tokenValidation';
import noteValidation from '../middlewares/noteValidation';
import { registerNewNote, getNotes } from '../controllers/noteControllers';

const noteRouter = Router();

noteRouter.post(
  '/notes',
  tokenValidation,
  verifyTokenDatabase,
  noteValidation,
  registerNewNote
);

noteRouter.get(
  '/notes',
  tokenValidation,
  verifyTokenDatabase,
  getNotes
)

export default noteRouter;