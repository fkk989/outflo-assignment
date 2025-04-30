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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("../utils/helpers");
const campaign_route_1 = require("./routers/campaign.route");
const personalized_message_route_1 = require("./routers/personalized-message.route");
const profile_1 = require("../models/profile");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)(), express_1.default.json());
exports.app.use("/campaigns", campaign_route_1.campaignRouter);
exports.app.use("/personalized-message", personalized_message_route_1.personalizedMessageRouter);
// route to get scraped data
exports.app.get("/scraped-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scrapedProfileData = yield profile_1.Profile.find();
        res.status(200).json((0, helpers_1.createResponse)(true, "Data Fetched", { data: scrapedProfileData || [] }));
    }
    catch (e) {
        res.status(400).json((0, helpers_1.createResponse)(false, `${e.message}`));
    }
}));
// health Checkup
exports.app.get("/health", (req, res) => {
    res.json((0, helpers_1.createResponse)(true, "server running fine"));
});
