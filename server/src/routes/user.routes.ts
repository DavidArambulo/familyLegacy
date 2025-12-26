import { Router } from "express";
import { getUsers, loginUser, registerUser } from "../controllers/user.controller";

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/', getUsers)

export default router;