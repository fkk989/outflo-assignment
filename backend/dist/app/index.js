"use strict";
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
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)(), express_1.default.json());
exports.app.use("/campaigns", campaign_route_1.campaignRouter);
exports.app.use("/personalized-message", personalized_message_route_1.personalizedMessageRouter);
// health Checkup
exports.app.get("/health", (req, res) => {
    res.json((0, helpers_1.createResponse)(true, "server running fine"));
});
