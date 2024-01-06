import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from './routes/auth.router.js'
import topicRouter from './routes/topic.router.js'
import userRouter from './routes/user.router.js'
import cors from 'cors'
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const app = express();
const port = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
app.use(express.json());
app.use(cors());
app.use("/api/auth",authRouter);
app.use("/api/topic",topicRouter);
app.use("/api/user",userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});