import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRouter from './routes/index';

import swaggerUI from 'swagger-ui-express';
import swaggerFile from '../swagger.json';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(indexRouter)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(process.env.PORT);