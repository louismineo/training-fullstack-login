import { Router } from "express";
import { Login,SignUp } from "../controllers/login.controller";


let router = Router();

// POST login

router.post('/login', Login);

router.post('/signup',SignUp)

export default router;