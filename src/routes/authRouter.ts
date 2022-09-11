import { Router } from 'express';
import { signUp, signIn } from '../controllers/authControllers';
import authValidation from '../middlewares/authValidation';

const authRouter = Router();

authRouter.post('/sign-up', authValidation, signUp);
authRouter.post('/sign-in', authValidation, signIn);

export default authRouter;