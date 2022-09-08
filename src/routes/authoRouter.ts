import { Router } from 'express';
import { signUp } from '../controllers/authControllers';
import authValidation from '../middlewares/authValidation';

const authRouter = Router();

authRouter.post('/sign-up', authValidation, signUp);

export default authRouter;