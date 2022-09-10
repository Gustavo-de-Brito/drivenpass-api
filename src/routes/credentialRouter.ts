import { Router } from 'express';
import { 
  tokenValidation,
  verifyTokenDatabase
} from '../middlewares/tokenValidation';
import credentialValidation from '../middlewares/credentialValidation';
import paramsIdValidation from '../middlewares/paramsIdValidation';
import { 
  registerCredential,
  getCredentials,
  deleteCredential
} from '../controllers/credentialControllers';

const credentialRouter = Router();

credentialRouter.post(
  '/credentials',
  tokenValidation,
  verifyTokenDatabase,
  credentialValidation,
  registerCredential
);

credentialRouter.get(
  '/credentials',
  tokenValidation,
  verifyTokenDatabase,
  getCredentials
);

credentialRouter.delete(
  '/credentials/:id',
  paramsIdValidation,
  tokenValidation,
  verifyTokenDatabase,
  deleteCredential
)

export default credentialRouter;