import { Router } from 'express';
import authRouter from './authoRouter';
import credentialRouter from './credentialRouter';
import noteRouter from './noteRouter';

const indexRouter = Router();

indexRouter.use(authRouter);
indexRouter.use(credentialRouter);
indexRouter.use(noteRouter);

export default indexRouter;