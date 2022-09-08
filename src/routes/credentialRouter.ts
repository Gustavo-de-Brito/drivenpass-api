import { Router } from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import credentialValidation from '../middlewares/credentialValidation';
import { registerCredential } from '../controllers/credentialControllers';

const credentialRouter = Router();

credentialRouter.post(
  '/credentials',
  tokenValidation,
  credentialValidation,
  registerCredential
);

export default credentialRouter;