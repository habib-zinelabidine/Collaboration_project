import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import topicRouter from "./routes/topic.router.js";
import userRouter from "./routes/user.router.js";
import discussionRouter from "./routes/discussion.router.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Topic from "./model/Topic.model.js";
import Discussion from "./model/Discussion.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    const discussion = new Discussion({
      message: data.message,
      topicId: data.topicId,
    });
    discussion.save().then(() => {
      socket.broadcast.emit("message-from-server", data.message);
    });
  });
  socket.on("start-typing", (data) => {
    socket.broadcast.emit("typing-started-from-server");
  });
  socket.on("stop-typing", (data) => {
    socket.broadcast.emit("typing-stoped-from-server");
  });
  socket.on("disconnect", (socket) => {
  });
});
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/topic", topicRouter);
app.use("/api/user", userRouter);
app.use("/api/discussion", discussionRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
