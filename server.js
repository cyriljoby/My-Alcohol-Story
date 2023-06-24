import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";

//toxicity model
import * as toxicity from '@tensorflow-models/toxicity';

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
import chatRouter from "./routes/chatRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import {BadRequestError, UnAuthenticatedError} from "./errors/index.js";
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
app.use("/api/v1/chat", chatRouter);

// only when ready to deploy
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5200;

const server = createServer(app);

// tensorflow toxicity model
let toxicityModel;
const threshold = 0.8;

const classifyToxicity = async (inputs) => {
  const results = await toxicityModel.classify(inputs);
  const labels = inputs.map((d, i) => {
    const obj = {'text': d};
    results.forEach((classification) => {
      console.log(classification)
      console.log(classification.results[0].probabilities)
      obj[classification.label] = classification.results[i].match;
    });
    return obj;
  });

  // [
  //   {
  //    text: 'message...',
  //    identity_attack: false,
  //    insult: false,
  //    obscene: false,
  //    severe_toxicity: false,
  //    sexual_explicit: false,
  //    threat: false,
  //    toxicity: false
  //   }
  // ]

  console.log(labels);

  const isToxic = !Object.keys(labels[0]).every((key) => {
    return labels[0][key] === false || labels[0][key] === null || key === 'text';
  });

  return isToxic;
};

const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URL,
      process.env.user,
      process.env.password
    );
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
    toxicityModel = await toxicity.load(threshold);
  } catch (error) {
    console.log(error);
  }
};

const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: [
      "http://localhost:3000",
      "https://myalcoholstory.com",
      "http://localhost:5200",
      "https://mas-app-6d8w8.ondigitalocean.app",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    connectSrc: ["'self'", "https://mas-app-6d8w8.ondigitalocean.app:3001"],
  },
});


//models
import User from "./models/User.js";
import Online from "./models/Online.js";
import Chat from "./models/Chat.js";
import Message from "./models/Message.js";
import {StatusCodes} from "http-status-codes";

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    socket.emit('unauthorized', {message: 'Authentication Invalid'})
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    socket.userId = payload.userId
    next()
  } catch (error) {
    socket.emit('unauthorized', {message: 'Authentication Invalid'})
  }
});

io.on("connection", async (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("create-message", async (data) => {
    console.log({data})
    const { chatRoomId, content } = data
    const userId = socket.userId

    console.log(chatRoomId, userId, content)

    if (!chatRoomId || !userId || !content) {
      socket.emit('error', {message: 'Invalid request'})
    }

    const isToxic = await classifyToxicity([content])

    if (isToxic) {
      socket.emit('message-filtered', {message: 'Message contains toxic content'})
      return
    }

    try {
      const message = await Message.create({
        chat: chatRoomId,
        sender: userId,
        content: content,
        read: false,
      })

      const chat = await Chat.findByIdAndUpdate(chatRoomId, {
        latestMessage: message.content,
      })

      if (chat) {
        try {
          const onlineUsers = await Online.find({user: {$in: chat.users}});

          const sender = await User.findOne({_id: userId})

          onlineUsers.forEach(user => {
            io.to(user.socketId).emit('new-message', {message, sender})
          })
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
      socket.emit('error', {message: 'Unable to send message'})
    }
  });

  socket.on("create-chat", async (data) => {
    const { recipient, initialMessage  } = data
    const userId = socket.userId

    const isToxic = await classifyToxicity([initialMessage])

    if (isToxic) {
      socket.emit('message-filtered', {message: 'Message contains toxic content'})
      return
    }

    let sendingUser = await User.findOne({_id:userId})
    let recipientUser = await User.findOne({_id:recipient})

    if (!sendingUser) {
      socket.emit('error', {message: 'Sending user not found'})
    }

    if (!recipientUser) {
      socket.emit('error', {message: 'Recipient user not found'})
    }

    if (!initialMessage) {
      socket.emit('error', {message: 'Please provide a message'})
    }

    try {
      const chat = await Chat.create({
        users: [userId, recipient],
      })

      const message = await Message.create({
        chat: chat._id,
        sender: userId,
        content: initialMessage,
        read: false
      })

      chat.latestMessage = message.content
      await chat.save()

      if (chat && message) {
        try {
          const onlineUsers = await Online.find({user: {$in: chat.users}})
          onlineUsers.forEach(user => {
            io.to(user.socketId).emit('new-chat', {chat, users: [sendingUser, recipientUser]})
          })
        } catch (error) {
          console.log(error)
          console.log('Unable to find online users')
        }
      }
    } catch (error) {
      console.log(error)
      socket.emit('error', {message: 'Unable to create chat room'})
    }
  });

  socket.on("read-chat", async (data) => {
    const { chatRoomId } = data
    const userId = socket.userId

    if (!chatRoomId || !userId) {
      socket.emit('error', {message: 'Invalid request'})
    }

    // set read value of all messages in chat to true sent by other user
    try {
      const chat = await Chat.findOne({_id: chatRoomId})

      if (!chat) {
        socket.emit('error', {message: 'Chat not found'})
      }

      const messages = await Message.find({chat: chatRoomId, sender: {$ne: userId}})

      await Promise.all(messages.map(async (message) => {
        message.read = true
        await message.save()
      }));
    } catch (error) {
      console.log(error)
      socket.emit('error', {message: 'Unable to read chat'})
    }
  });

  socket.on("disconnect", async () => {
    console.log(`Client disconnected: ${socket.id}`);
    await Online.findOneAndDelete({socketId: socket.id});
    console.log(socket.userId + " is offline");
  });

  const online = await Online.findOne({user: socket.userId})

  if (online) {
    try {
      await Online.findOneAndUpdate(
        { user: socket.userId },
        { socketId: socket.id }
      );
      console.log(socket.userId + " is online");
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      await Online.create({user: socket.userId, socketId: socket.id});
      console.log(socket.userId + " is online");
    } catch (err) {
      console.log(err);
    }
  }
});

await start();
