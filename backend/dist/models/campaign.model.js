"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
// models/Campaign.ts
const mongoose_1 = require("mongoose");
const CampaignSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DELETED"],
        default: "ACTIVE",
    },
    leads: { type: [String], default: [] }, // array of LinkedIn URLs
    accountIDs: { type: [String], default: [] }, // reference to Account collection
}, {
    timestamps: true, // optional: adds createdAt and updatedAt
});
exports.Campaign = (0, mongoose_1.model)("Campaign", CampaignSchema);
