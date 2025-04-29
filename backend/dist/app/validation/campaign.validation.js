"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCampaignSchema = exports.campaignSchema = void 0;
// validations/campaign.schema.ts
const zod_1 = require("zod");
exports.campaignSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["ACTIVE", "INACTIVE"], { message: "Status can be ACTIVE or  INACTIVE" }).default("ACTIVE"),
    leads: zod_1.z.array(zod_1.z.string()).optional(), // Array of LinkedIn URLs
    accountIDs: zod_1.z.array(zod_1.z.string()).optional(), // MongoDB ObjectIDs as strings but right now we dont have any user
});
exports.updateCampaignSchema = exports.campaignSchema.extend({
    deletedLeads: zod_1.z.array(zod_1.z.string().url()).optional(),
    deletedAccountIDs: zod_1.z.array(zod_1.z.string()).optional()
});
