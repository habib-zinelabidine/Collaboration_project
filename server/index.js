import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import topicRouter from "./routes/topic.router.js";
import userRouter from "./routes/user.router.js";
import messageRouter from "./routes/message.router.js";
import discussionRouter from "./routes/discussion.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Discussion from "./model/Discussion.js";
import MessageModel from "./model/MessageModel.js";
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
  console.log("user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("send-message", (data) => {
    const discussion = new Discussion({
      message: data.message,
      topicId: data.topicId,
      senderId: data.senderId,
    });
    discussion.save().then(() => {
      io.emit("message-from-server", discussion);
    });
  });
  socket.on("private-message", (data) => {
    const privateMessage = new MessageModel({
      senderId: data.senderId,
      receiverId: data.receiverId,
      text: data.text,
    });
    privateMessage.save().then(() => {
      io.emit("private-message-from-server", privateMessage);
    });
  });
  socket.on("start-typing", () => {
    socket.broadcast.emit("typing-started-from-server");
  });
  socket.on("stop-typing", () => {
    socket.broadcast.emit("typing-stoped-from-server");
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRouter);
app.use("/api/topic", topicRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
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
