import { Router } from 'express';
import authRouter from './authoRouter';

const indexRouter = Router();

indexRouter.use(authRouter);

export default indexRouter;