import { Router } from 'express';
import { tokenValidation, verifyTokenDatabase } from '../middlewares/tokenValidation';
import credentialValidation from '../middlewares/credentialValidation';
import { registerCredential } from '../controllers/credentialControllers';

const credentialRouter = Router();

credentialRouter.post(
  '/credentials',
  tokenValidation,
  verifyTokenDatabase,
  credentialValidation,
  registerCredential
);

export default credentialRouter;