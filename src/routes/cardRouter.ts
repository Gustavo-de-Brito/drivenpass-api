import { Router } from 'express';
import {
  tokenValidation,
  verifyTokenDatabase
} from '../middlewares/tokenValidation';
import cardValidation from '../middlewares/cardValidation';
import paramsIdValidation from '../middlewares/paramsIdValidation';
import {
  registerNewCard,
  getCards,
  deleteCard
} from '../controllers/cardControllers';

const cardRouter: Router = Router();

cardRouter.post(
  '/cards',
  tokenValidation,
  verifyTokenDatabase,
  cardValidation,
  registerNewCard
);

cardRouter.get(
  '/cards',
  tokenValidation,
  verifyTokenDatabase,
  getCards
);

cardRouter.delete(
  '/cards/:id',
  paramsIdValidation,
  tokenValidation,
  verifyTokenDatabase,
  deleteCard
);

export default cardRouter;