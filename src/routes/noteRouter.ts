import { Router } from 'express';
import {
  tokenValidation,
  verifyTokenDatabase
} from '../middlewares/tokenValidation';
import noteValidation from '../middlewares/noteValidation';
import {
  registerNewNote,
  getNotes,
  deleteNote
} from '../controllers/noteControllers';
import paramsIdValidation from '../middlewares/paramsIdValidation';

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
);

noteRouter.delete(
  '/notes/:id',
  paramsIdValidation,
  tokenValidation,
  verifyTokenDatabase,
  deleteNote
);

export default noteRouter;