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
userRouter.post('/registerAdmin', userController.insertAdmin);
userRouter.post('/login', userController.LoginVerify);
userRouter.post('/loginAdmin', userController.AdminLoginVerify);
userRouter.post('/forget-password', userController.forgetPassword);
userRouter.post('/reset-password/:id/:token', userController.resetPassword); // New route for resetting password
userRouter.post('/userMailVerify/:id', userController.resetPassword); // New route for verify email
userRouter.post('/adminMailVerify/:id', userController.resetPassword); // New route for verify email
userRouter.get('/dashboard', isAuthenticated, userController.fetchUserData);
userRouter.get('/dashboardAdmin', isAuthenticated, userController.fetchUserData);
userRouter.get('/addCategory', isAuthenticated, userController.fetchUserData);
userRouter.get('/all_courses', isAuthenticated, userController.fetchCatData);
userRouter.get('/web_development', isAuthenticated, userController.fetchUserData);
userRouter.get('/', isAuthenticated, userController.fetchUserData);

// Export the router
export { userRouter };
