import express from 'express';
import morgan from 'morgan';
import { appRouter } from './routes/index.js';

const app = express();

// Middlewares
app.use(express.json());

// Remove for production
app.use(morgan('dev'));

app.use('/api/v1', appRouter);

export default app;
