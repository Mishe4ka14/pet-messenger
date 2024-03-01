import { changeUserInfo } from "../controllers/user";
import { Router } from "express";

const router = Router();

router.patch('/me', changeUserInfo)

export default router;
