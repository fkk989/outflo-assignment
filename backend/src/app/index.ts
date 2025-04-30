import express, { Express } from "express";
import cors from "cors";
import { createResponse } from "../utils/helpers";
import { campaignRouter } from "./routers/campaign.route";
import { personalizedMessageRouter } from "./routers/personalized-message.route";
import { Profile } from "../models/profile";
export const app: Express = express();

app.use(cors(), express.json());


app.use("/campaigns", campaignRouter)
app.use("/personalized-message", personalizedMessageRouter)

// route to get scraped data
app.get("/scraped-data", async (req, res) => {
  try {
    const scrapedProfileData = await Profile.find();

    res.status(200).json(createResponse(true, "Data Fetched", { data: scrapedProfileData || [] }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e.message}`))
  }
})

// health Checkup
app.get("/health", (req, res) => {
  res.json(createResponse(true, "server running fine"));
});