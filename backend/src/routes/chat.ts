import { createChat } from "../controllers/chat";
import { Router } from "express";

const router = Router();

router.post('/:firstID/:secondID', createChat);

export default router;