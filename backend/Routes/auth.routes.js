import express from 'express';
import { forgotPassword, login, register, resetPassword} from '../controllers/auth.controller.js';


const route=express.Router();

route.post('/register',register);
route.post('/login',login);
route.post('/forgot-password',forgotPassword);
route.post('/reset-password/:token',resetPassword);

export default route;