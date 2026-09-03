
import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/cadastrar', userController.cadastrarUser)

userRouter.post('/login', userController.loginUser);

export default userRouter;
