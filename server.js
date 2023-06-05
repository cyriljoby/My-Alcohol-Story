import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
// import {Configuration, OpenAIApi} from "openai"
// const configuration = new Configuration({
//   apiKey:process.env.OPEN_AI_KEY,

// })
import morgan from "morgan";
import {Configuration, OpenAIApi} from "openai"
const configuration = new Configuration({
  apiKey:process.env.OPEN_AI_KEY,

})
const openai= new OpenAIApi(configuration);
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

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// const openai= new OpenAIApi(configuration);
const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stories", authenticateUser, storyRouter);
app.use("/api/v1/reply", replyRouter);

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
      Reccomend a single resource with no description for a user who entered this story with no sentences. Pick a resource from this list :[Suicide & Crisis Lifeline, Alateen, Trans Lifeline, Crisis Text Line, Drugabuse.gov, Rethinking Drinking, American Society on Addiction Medicine]
      `,
      n:1,
      max_tokens: 50,
      temperature: 0,

      // stop: [{}],
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
  } catch (error) {
    console.log(error);
  }
};

start();
