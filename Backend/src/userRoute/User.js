// Import necessary modules and controllers
import express from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authenticateToken.js';

const userRouter = express.Router();

// Middleware for parsing URL-encoded and JSON request bodies
userRouter.use(express.urlencoded({ extended: true }));
userRouter.use(express.json());

// Define routes
userRouter.post('/registerUser', userController.insertUser);
userRouter.post('/login', userController.LoginVerify);
userRouter.post('/forget-password', userController.forgetPassword);
userRouter.post('/reset-password/:id/:token', userController.resetPassword); // New route for resetting password
userRouter.get('/dashboard', isAuthenticated, userController.fetchUserData);
userRouter.get('/', isAuthenticated, userController.fetchUserData);

// Export the router
export { userRouter };
