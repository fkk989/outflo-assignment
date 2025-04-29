"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampaigns = getCampaigns;
exports.getCampaignById = getCampaignById;
exports.createCampaign = createCampaign;
exports.updateCampaign = updateCampaign;
exports.deleteCampaign = deleteCampaign;
const helpers_1 = require("../../utils/helpers");
const campaign_model_1 = require("../../models/campaign.model");
function getCampaigns(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaigns = yield campaign_model_1.Campaign.find({ status: { $ne: "DELETED" } });
            res.status(200).json((0, helpers_1.createResponse)(true, "Campaigns fetched successfully", { data: campaigns !== null && campaigns !== void 0 ? campaigns : [] }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e.message}`));
        }
    });
}
function getCampaignById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignId = req.params.id;
            if (!campaignId) {
                res.status(400).json((0, helpers_1.createResponse)(false, "Please provide a campaignId in Params"));
                return;
            }
            const campaign = yield campaign_model_1.Campaign.findById(campaignId);
            if (!campaign || campaign.status === "DELETED") {
                res.status(400).json((0, helpers_1.createResponse)(false, "Campaign not found"));
                return;
            }
            res.status(200).json((0, helpers_1.createResponse)(true, "Campaign fetched successfully", { data: campaign }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e.message}`));
        }
    });
}
function createCampaign(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaign = yield campaign_model_1.Campaign.create(req.body);
            res.status(200).json((0, helpers_1.createResponse)(true, "Campaign created successfully", { data: campaign }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e.message}`));
        }
    });
}
function updateCampaign(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignId = req.params.id;
            if (!campaignId) {
                res.status(400).json((0, helpers_1.createResponse)(false, "Please provide a campaignId in Params"));
                return;
            }
            const campaign = yield campaign_model_1.Campaign.findByIdAndUpdate(campaignId, req.body, { new: true });
            res.status(200).json((0, helpers_1.createResponse)(true, "Campaign created successfully", { data: campaign }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e.message}`));
        }
    });
}
function deleteCampaign(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campaignId = req.params.id;
            if (!campaignId) {
                res.status(400).json((0, helpers_1.createResponse)(false, "Please provide a campaignId in Params"));
                return;
            }
            const campaign = yield campaign_model_1.Campaign.findByIdAndUpdate(campaignId, { status: "DELETED" }, { new: true });
            res.status(200).json((0, helpers_1.createResponse)(true, "Campaign created successfully", { data: campaign }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e.message}`));
        }
    });
}
