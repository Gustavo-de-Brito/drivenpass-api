import { Router } from 'express';
import authRouter from './authRouter';
import credentialRouter from './credentialRouter';
import noteRouter from './noteRouter';
import cardRouter from './cardRouter';
import wifiRouter from './wifiRouter';

const indexRouter = Router();

indexRouter.use(authRouter);
indexRouter.use(credentialRouter);
indexRouter.use(noteRouter);
indexRouter.use(cardRouter);
indexRouter.use(wifiRouter);

export default indexRouter;