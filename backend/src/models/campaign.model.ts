// models/Campaign.ts
import { Schema, model, Types } from "mongoose";

const CampaignSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      default: "ACTIVE",
    },
    leads: { type: [String], default: [] }, // array of LinkedIn URLs
    accountIDs: { type: [String], default: [] }, // reference to Account collection
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

export const Campaign = model("Campaign", CampaignSchema);


