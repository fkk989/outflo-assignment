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
exports.getPersonalizedMessage = getPersonalizedMessage;
const helpers_1 = require("../../utils/helpers");
const ai_1 = require("../../config/ai");
function getPersonalizedMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const reqBody = req.body;
            const response = yield ai_1.ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `
        You are a sales outreach assistant. Based on the following LinkedIn profile data, craft a short and personalized cold outreach message that is professional, friendly, and encourages connection.
        Details:
        - Name: ${(reqBody === null || reqBody === void 0 ? void 0 : reqBody.name) || "Not Provided"}
        - Job Title: ${(reqBody === null || reqBody === void 0 ? void 0 : reqBody.job_title) || "Not Provided"}
        - Company: ${(reqBody === null || reqBody === void 0 ? void 0 : reqBody.company) || "Not Provided"}
        - Location: ${(reqBody === null || reqBody === void 0 ? void 0 : reqBody.location) || "Not Provided"}
        - Summary: ${(reqBody === null || reqBody === void 0 ? void 0 : reqBody.summary) || "Not provided"}
        
        Make the message concise (2–4 lines) and relevant to their background.
        please dont give subject I just need the message also no need to use my name anywhere
      `,
            });
            console.log(response.text);
            const cleanedMessage = (_a = response.text) === null || _a === void 0 ? void 0 : _a.replace(/\n/g, "");
            res.status(200).json((0, helpers_1.createResponse)(true, "Got the message from deepseek", { data: cleanedMessage }));
        }
        catch (e) {
            console.log(e);
            res.status(400).json((0, helpers_1.createResponse)(false, `${e.message}`));
        }
    });
}
