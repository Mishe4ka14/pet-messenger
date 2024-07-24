import { createChat, getChat, getChatList, handleGetChatList } from "../controllers/chat";
import { Router } from "express";

const router = Router();

router.get('/chat-list', handleGetChatList)
router.post('/:firstID/:secondID', createChat);
router.get('/:chatID', getChat);

export default router;