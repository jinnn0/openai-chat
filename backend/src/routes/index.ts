import { Router } from 'express';
import { userRoutes } from './user.js';
import { chatRoutes } from './chat.js';

const appRouter = Router();

appRouter.use('/user', userRoutes); // domain/api/v1/user
// appRouter.use('/chats', chatRoutes); // domain/api/v1/chats
appRouter.use('/chat', chatRoutes); // domain/api/v1/chats

export { appRouter };
