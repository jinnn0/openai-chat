import { Router } from 'express';
import { getAllusers, userSignup } from '../controllers/user.js';

const userRoutes = Router();

userRoutes.get('/', getAllusers);
userRoutes.post('/signup', userSignup);

export { userRoutes };
