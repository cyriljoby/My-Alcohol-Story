import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";

//toxicity model
import * as toxicity from '@tensorflow-models/toxicity';

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

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

app.post("/find-resource", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
      {Partnership to End Addiction:https://drugfree.org/, Community Anti-Drug Coalitions of America: https://www.cadca.org/, NIDA: https://nida.nih.gov/research-topics/publications/drug-facts, DEA:https://www.getsmartaboutdrugs.gov/, Medicine Abuse Project: https://drugfree.org/article/medicine-abuse-project-partners/, National Association for Children of Addiction: https://nacoa.org/, NIDA Publications: https://nida.nih.gov/research-topics/publications, PEERx: https://nida.nih.gov/research-topics/parents-educators, Project ALERT:https://www.projectalert.com/, SAMHSA Underage Drinking: https://www.samhsa.gov/talk-they-hear-you, Seeking Drug Abuse Treatment: Know What To Ask:https://nida.nih.gov/research-topics/treatment, SAMHSA’s National Helpline:https://www.samhsa.gov/find-help/national-helpline, Alcoholics Anonymous:https://www.aa.org, Narcotics Anonymous:www.na.org, SMART Recovery:www.smartrecovery.org, Women for Sobriety:www.womenforsobriety.org, Moderation Management:www.moderation.org, Addiction Center: www.addictioncenter.com, Substance Abuse and Mental Health Services Administration (SAMHSA): www.samhsa.gov, National Institute on Drug Abuse (NIDA): www.drugabuse.gov, National Institute on Alcohol Abuse and Alcoholism (NIAAA): www.niaaa.nih.gov, Alcohol Rehab Guide: www.alcoholrehabguide.org, DrugRehab.com: www.drugrehab.com, American Addiction Centers: www.americanaddictioncenters.org, Recovery.org: www.recovery.org, InTheRooms: www.intherooms.com, Faces & Voices of Recovery: www.facesandvoicesofrecovery.org, Dual Recovery Anonymous: www.draonline.org, Alcoholism Self-Help Resources: www.alcoholism.about.com, Sober Grid: www.sobergrid.com, The Recovery Village: www.therecoveryvillage.com, National Council on Alcoholism and Drug Dependence (NCADD): www.ncadd.org, Addictions.com: www.addictions.com, Addiction Hope: www.addictionhope.com, A helpline for various social services: https://www.211.org/, Shatterproof: https://www.shatterproof.org/, Addiction Treatment Magazine :https://addictiontreatmentmagazine.com/, SoberNation:https://sobernation.com/, Recovery Dharma: https://recoverydharma.org/, Refuge Recovery: https://www.refugerecovery.org/, Hazelden Betty Ford Foundation: https://www.hazeldenbettyford.org/, Recovery Research Institute: https://www.recoveryanswers.org/,  Dual Diagnosis: www.dualdiagnosis.org }
      A user enters a story on an online website. Based on this story recommend them only a single online resource from the above dictionary in an emotional and heartfelt manner from first person plural perspective. Go through the entire dictionary instead of choosing the first resource always. The name of the resource must be within the recommendation. At the very end of the recommendation add the single corresponding link inside square brackets. Max 150 words.

      ${prompt}
      `,
      n:1,
      max_tokens: 200,
      temperature: 1,
    });
    console.log(response.data)
    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    return res.status(400).json({
      success: 'false',
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
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
    ],
    methods: ["GET", "POST"]
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
      const existingChat = await Chat.findOne({
        users: {
          $all: [userId, recipient]
        }
      });

      if (existingChat) {
        socket.emit('error', {message: 'Chat already exists'})
        return
      }

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
            io.to(user.socketId).emit('new-chat', {chat, message, users: [sendingUser, recipientUser]})
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

  socket.on("chat-bot-query", async (data) => {
    try {
      const { queryHistory, query } = data

      if (!query || query.length < 1) {
        socket.emit('error', {message: 'Invalid request'})
      }

      const cleanedHistory = queryHistory.map((message) => {
        if (message.role !== 'system') {
          return message
        }
      })

      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {role: "system", content: "You are a chatbot tasked with providing assistane to teenagers that may be " +
              "dealing with alcohol addiction or other forms of substance abuse. Please assist this user carefully and " +
              "be sensitive. Provide accurate and reliable resources and information that may be helpful to them. " +
              "If you are unable to assist them, please refer them to a human specialist. Do not engage in any " +
              "conversation that may be harmful to the user. " +
              "Keep responses under 50 words.",},
          {role: "assistant", content: "Hey there! I'm your friendly chatbot here to lend a helping hand when " +
            "it comes to alcohol-related topics. Whether you have questions about alcohol addiction, " +
            "or just need someone to talk to, I'm here for you. Feel free to ask me anything, and " +
            "let's start the conversation!"},
          ...cleanedHistory,
          {role: "user", content: query},
        ],
        n: 1,
      });

      const botReply = chatCompletion.data.choices[0].message?.content

      if (!botReply) {
        socket.emit('error', {message: 'Unable to query chat bot'})
      }

      socket.emit('chat-bot-reply', {message: botReply, input: query})
    } catch (error) {
      console.log(error)
      socket.emit('error', {message: 'Unable to query chat bot'})
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
