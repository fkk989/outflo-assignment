"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalizedMessageRouter = void 0;
const express_1 = require("express");
const validation_1 = require("../middlewares/validation");
const personalizedMessage_validation_1 = require("../validation/personalizedMessage.validation");
const personalized_message_controller_1 = require("../controllers/personalized-message.controller");
exports.personalizedMessageRouter = (0, express_1.Router)();
exports.personalizedMessageRouter.post("/", (0, validation_1.validate)(personalizedMessage_validation_1.personalizedMessageSchema), personalized_message_controller_1.getPersonalizedMessage);
