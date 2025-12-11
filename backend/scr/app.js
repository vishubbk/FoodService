import dotenv from "dotenv";
dotenv.config(); // Load environment variables first
import express from 'express';
import morgan from "morgan";
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import foodPartnerRouter from "./routes/foodPartner.route.js";
import foodRouter from "./routes/food.route.js"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())
// ✅ CORS Setup
app.use(
  cors({
    origin: ["http://localhost:5173"], // tumhara React frontend ka URL
    credentials: true, // cookies ko allow karne ke liye
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRouter);
app.use('/api/foodPartner', foodPartnerRouter);
app.use('/api/food', foodRouter);



export default app;
