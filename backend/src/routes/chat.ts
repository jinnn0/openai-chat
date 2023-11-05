import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';
import { generateChatCompletion } from '../controllers/chat.js';

const chatRoutes = Router();

chatRoutes.post(
  '/new',
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

export { chatRoutes };
