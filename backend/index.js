import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/auth.dbconfig.js';
import authRoutes from './Routes/auth.routes.js';

dotenv.config();
const app=express();
app.use(express.json());


const PORT=process.env.PORT || 5000;
connectDB();

app.use('/api/auth',authRoutes);
app.listen(PORT, () => {
  console.log(`Backend started on port ${PORT}`);
});
