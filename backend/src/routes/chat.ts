import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js';
import { chatCompletionValidator, validate } from '../utils/validators.js';
import {
  generateChatCompletion,
  deleteChats,
  sendChatsToUser,
} from '../controllers/chat.js';

const chatRoutes = Router();

chatRoutes.post(
  '/new',
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get('/all-chats', verifyToken, sendChatsToUser);
chatRoutes.delete('/delete', verifyToken, deleteChats);

export { chatRoutes };
