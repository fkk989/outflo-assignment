// validations/campaign.schema.ts
import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"], { message: "Status can be ACTIVE or  INACTIVE" }).default("ACTIVE"),
  leads: z.array(z.string()).optional(), // Array of LinkedIn URLs
  accountIDs: z.array(z.string()).optional(), // MongoDB ObjectIDs as strings but right now we dont have any user
});

export const updateCampaignSchema = campaignSchema.extend({
  deletedLeads: z.array(z.string().url()).optional(),
  deletedAccountIDs: z.array(z.string()).optional()
})

export type CampaignInput = z.infer<typeof campaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>
