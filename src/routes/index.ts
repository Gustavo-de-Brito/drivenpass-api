import { Router } from 'express';
import authRouter from './authoRouter';
import credentialRouter from './credentialRouter';

const indexRouter = Router();

indexRouter.use(authRouter);
indexRouter.use(credentialRouter);

export default indexRouter;