import { createChat, getChat } from "../controllers/chat";
import { Router } from "express";

const router = Router();

router.post('/:firstID/:secondID', createChat);
router.get('/:chatID', getChat);

export default router;