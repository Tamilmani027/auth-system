import express from 'express';
import { forgotPassword, login, register} from '../controllers/auth.controller.js';


const route=express.Router();

route.post('/register',register);
route.post('/login',login);
route.post('/forgot-password',forgotPassword);

export default route;