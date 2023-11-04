import { Router } from 'express';
import { getAllusers } from '../controllers/user.js';

const userRoutes = Router();

userRoutes.get('/', getAllusers);

export { userRoutes };
