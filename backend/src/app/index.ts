import express, { Express } from "express";
import cors from "cors";
import { createResponse } from "../utils/helpers";
import { campaignRouter } from "./routers/campaign.route";
import { personalizedMessageRouter } from "./routers/personalized-message.route";
export const app: Express = express();

app.use(cors(), express.json());


app.use("/campaigns", campaignRouter)
app.use("/personalized-message", personalizedMessageRouter)

// health Checkup
app.get("/health", (req, res) => {
  res.json(createResponse(true, "server running fine"));
});