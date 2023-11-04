import { Router } from 'express';
import { getAllusers, userLogin, userSignup } from '../controllers/user.js';
import {
  loginValidator,
  signupValidator,
  validate,
} from '../utils/validators.js';

const userRoutes = Router();

userRoutes.get('/', getAllusers);
userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);

export { userRoutes };
