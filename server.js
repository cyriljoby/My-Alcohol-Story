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
      {Partnership to End Addiction:https://drugfree.org/, Community Anti-Drug Coalitions of America: https://www.cadca.org/, NIDA: https://nida.nih.gov/research-topics/publications/drug-facts, DEA:https://www.getsmartaboutdrugs.gov/, Medicine Abuse Project: https://drugfree.org/article/medicine-abuse-project-partners/, National Association for Children of Addiction: https://nacoa.org/, NIDA Publications: https://nida.nih.gov/research-topics/publications, PEERx: https://nida.nih.gov/research-topics/parents-educators, Project ALERT:https://www.projectalert.com/, SAMHSA Underage Drinking: https://www.samhsa.gov/talk-they-hear-you, Seeking Drug Abuse Treatment: Know What To Ask:https://nida.nih.gov/research-topics/treatment, SAMHSA’s National Helpline:https://www.samhsa.gov/find-help/national-helpline, Alcoholics Anonymous:www.aa.org, Narcotics Anonymous:www.na.org, SMART Recovery:www.smartrecovery.org, Women for Sobriety:www.womenforsobriety.org, Moderation Management:www.moderation.org, Addiction Center: www.addictioncenter.com, Substance Abuse and Mental Health Services Administration (SAMHSA): www.samhsa.gov, National Institute on Drug Abuse (NIDA): www.drugabuse.gov, National Institute on Alcohol Abuse and Alcoholism (NIAAA): www.niaaa.nih.gov, Alcohol Rehab Guide: www.alcoholrehabguide.org, DrugRehab.com: www.drugrehab.com, American Addiction Centers: www.americanaddictioncenters.org, Recovery.org: www.recovery.org, InTheRooms: www.intherooms.com, Faces & Voices of Recovery: www.facesandvoicesofrecovery.org, Dual Recovery Anonymous: www.draonline.org, Alcoholism Self-Help Resources: www.alcoholism.about.com, Sober Grid: www.sobergrid.com, The Recovery Village: www.therecoveryvillage.com, National Council on Alcoholism and Drug Dependence (NCADD): www.ncadd.org, Addictions.com: www.addictions.com, Addiction Hope: www.addictionhope.com, A helpline for various social services: https://www.211.org/, Shatterproof: https://www.shatterproof.org/, Addiction Treatment Magazine :https://addictiontreatmentmagazine.com/, SoberNation:https://sobernation.com/, Recovery Dharma: https://recoverydharma.org/, Refuge Recovery: https://www.refugerecovery.org/, Hazelden Betty Ford Foundation: https://www.hazeldenbettyford.org/, Recovery Research Institute: https://www.recoveryanswers.org/,  Dual Diagnosis: www.dualdiagnosis.org }
      a user enters a story on an online website. based on this story recommend them only a single online resource from the above dictionary in an emotional and heartfelt manner from first person plural perspective. go through the entire dictionary instead of chosing the firt resource always.the name of the resource must be within the reccomendatiton. at the very end of the recommendation add the single corresponding link inside square brackets.  max 150 words

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
