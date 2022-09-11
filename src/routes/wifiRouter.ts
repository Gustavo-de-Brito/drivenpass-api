import { Router } from 'express';
import {
  tokenValidation,
  verifyTokenDatabase
} from '../middlewares/tokenValidation';
import wifiValidation from '../middlewares/wifiValidation';
import paramsIdValidation from '../middlewares/paramsIdValidation';
import {
  registerNewWifi,
  getWifis
} from '../controllers/wifiControllers';

const wifiRouter: Router = Router();

wifiRouter.post(
  '/wifis',
  tokenValidation,
  verifyTokenDatabase,
  wifiValidation,
  registerNewWifi
);

wifiRouter.get(
  '/wifis',
  tokenValidation,
  verifyTokenDatabase,
  getWifis
);

export default wifiRouter;