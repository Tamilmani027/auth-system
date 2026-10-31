import express from 'express';
import { forgotPassword, login, register, resetPassword} from '../controllers/auth.controller.js';
import { verifyResetToken } from './../middleware/auth.middleware';


const route=express.Router();

route.post('/register',register);
route.post('/login',login);
route.post('/forgot-password',forgotPassword);
route.post('/reset-password/:token',verifyResetToken, resetPassword);

export default route;