import { changeUserInfo, getUserByNameOrEmail } from "../controllers/user";
import { Router } from "express";

const router = Router();

router.patch('/me', changeUserInfo)
router.get('/', getUserByNameOrEmail)

export default router;
