import { Request, Response } from "express";
import { createResponse } from "../../utils/helpers";
import { Campaign } from "../../models/campaign.model";
import { CampaignInput, UpdateCampaignInput } from "../validation/campaign.validation";


export async function getCampaigns(req: Request, res: Response) {
  try {
    const campaigns = await Campaign.find({ status: { $ne: "DELETED" } });

    res.status(200).json(createResponse(true, "Campaigns fetched successfully", { data: campaigns ?? [] },))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e.message}`))
  }
}

export async function getCampaignById(req: Request<{ id: string }, {}>, res: Response) {
  try {
    const campaignId = req.params.id

    if (!campaignId) {
      res.status(400).json(createResponse(false, "Please provide a campaignId in Params"))
      return;
    }
    const campaign = await Campaign.findById(campaignId);

    if (!campaign || campaign.status === "DELETED") {
      res.status(400).json(createResponse(false, "Campaign not found"))
      return
    }

    res.status(200).json(createResponse(true, "Campaign fetched successfully", { data: campaign }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e.message}`))
  }
}

export async function createCampaign(req: Request<{}, {}, CampaignInput>, res: Response) {
  try {

    const campaign = await Campaign.create(req.body);

    res.status(200).json(createResponse(true, "Campaign created successfully", { data: campaign }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e.message}`))
  }
}


export async function updateCampaign(req: Request<{ id: string }, {}, UpdateCampaignInput>, res: Response) {
  try {
    const campaignId = req.params.id

    if (!campaignId) {
      res.status(400).json(createResponse(false, "Please provide a campaignId in Params"))
      return;
    }

    const campaign = await Campaign.findByIdAndUpdate(campaignId, req.body, { new: true })

    res.status(200).json(createResponse(true, "Campaign created successfully", { data: campaign }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e.message}`))
  }
}


export async function deleteCampaign(req: Request<{ id: string }, {}, UpdateCampaignInput>, res: Response) {
  try {
    const campaignId = req.params.id

    if (!campaignId) {
      res.status(400).json(createResponse(false, "Please provide a campaignId in Params"))
      return;
    }

    const campaign = await Campaign.findByIdAndUpdate(campaignId, { status: "DELETED" }, { new: true })

    res.status(200).json(createResponse(true, "Campaign created successfully", { data: campaign }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e.message}`))
  }
}