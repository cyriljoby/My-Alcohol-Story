import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// hello
// db and authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import replyRouter from "./routes/replyRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import {UnAuthenticatedError} from "./errors/index.js";
import jwt from "jsonwebtoken";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stories", authenticateUser, storyRouter);
app.use("/api/v1/reply", replyRouter);

// only when ready to deploy
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5200;

const websocketHttpServer = createServer();

const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URL,
      process.env.user,
      process.env.password
    );
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
    websocketHttpServer.listen(3001, () => {
      console.log("Websocket server is listening on port 3001...");
    });
  } catch (error) {
    console.log(error);
  }
};

const io = new Server(websocketHttpServer,{
  path: "/",
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    next(new UnAuthenticatedError('Authentication Invalid'))
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    socket.userId = payload.userId
    next()
  } catch (error) {
    next(new UnAuthenticatedError('Authentication Invalid'))
  }
});

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("create-message", (data) => {
    socket.broadcast.emit("receive-message", {
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

await start();
