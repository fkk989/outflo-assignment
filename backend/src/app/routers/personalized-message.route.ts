import { Router } from "express";
import { validate } from "../middlewares/validation";
import { personalizedMessageSchema } from "../validation/personalizedMessage.validation";
import { getPersonalizedMessage } from "../controllers/personalized-message.controller";

export const personalizedMessageRouter = Router()

personalizedMessageRouter.post("/", validate(personalizedMessageSchema), getPersonalizedMessage)