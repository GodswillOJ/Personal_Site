import express from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authenticateToken.js';

const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));
userRouter.use(express.json());

userRouter.post('/registerUser', userController.insertUser);
userRouter.post('/login', userController.LoginVerify);
userRouter.get('/forget-password', userController.getForgetPassword);
userRouter.post('/forget-password', userController.forgetPassword);
userRouter.post('/reset-password', userController.resetPassword);

userRouter.get('/dashboard', isAuthenticated, userController.fetchUserData); // Route to fetch user data for the dashboard

userRouter.get('/', isAuthenticated, userController.fetchUserData);


export { userRouter };
