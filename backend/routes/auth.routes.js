import express from 'express';
import { forgotPassword, getProfile, login, register, resetPassword} from '../controllers/auth.controller.js';
import { verifyAuthToken, verifyResetToken, verifyToken } from './../middleware/auth.middleware.js';


const route=express.Router();

route.post('/register',register);
route.post('/login',login);
route.post('/forgot-password',forgotPassword);
route.post('/reset-password/:token',verifyResetToken, resetPassword);
route.get('/verify-token',verifyToken);
route.get('/profile',verifyAuthToken,getProfile)

export default route;