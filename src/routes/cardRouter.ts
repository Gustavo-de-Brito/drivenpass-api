import { Router } from 'express';
import {
  tokenValidation,
  verifyTokenDatabase
} from '../middlewares/tokenValidation';
import cardValidation from '../middlewares/cardValidation';
import { registerNewCard } from '../controllers/cardControllers';

const cardRouter: Router = Router();

cardRouter.post(
  '/cards',
  tokenValidation,
  verifyTokenDatabase,
  cardValidation,
  registerNewCard
);

export default cardRouter;