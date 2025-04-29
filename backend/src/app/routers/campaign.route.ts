import { Router } from "express";
import { getCampaigns, getCampaignById, createCampaign, updateCampaign, deleteCampaign } from "../controllers/campaign.controller";
import { validate } from "../middlewares/validation";
import { campaignSchema, updateCampaignSchema } from "../validation/campaign.validation";

export const campaignRouter = Router();

campaignRouter.get("/", getCampaigns)

campaignRouter.get("/:id", getCampaignById)

campaignRouter.post("/", validate(campaignSchema), createCampaign)

campaignRouter.put("/:id", validate(updateCampaignSchema), updateCampaign)

campaignRouter.delete("/:id", deleteCampaign)