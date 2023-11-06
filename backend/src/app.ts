import express from 'express';
import morgan from 'morgan';
import { appRouter } from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
config();

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev')); // Remove for production

app.use('/api/v1', appRouter);

export default app;
