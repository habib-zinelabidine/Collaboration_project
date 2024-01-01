import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from './routes/auth.router.js'

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
app.use("/api/auth",authRouter);