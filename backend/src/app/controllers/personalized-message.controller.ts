import { Request, Response } from "express";
import { createResponse } from "../../utils/helpers";
import { PersonalizedMessageInput } from "../validation/personalizedMessage.validation";
import { ai } from "../../config/ai";

export async function getPersonalizedMessage(req: Request<{}, {}, PersonalizedMessageInput>, res: Response) {
  try {
    const reqBody = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
        You are a sales outreach assistant. Based on the following LinkedIn profile data, craft a short and personalized cold outreach message that is professional, friendly, and encourages connection.
        Details:
        - Name: ${reqBody?.name || "Not Provided"}
        - Job Title: ${reqBody?.job_title || "Not Provided"}
        - Company: ${reqBody?.company || "Not Provided"}
        - Location: ${reqBody?.location || "Not Provided"}
        - Summary: ${reqBody?.summary || "Not provided"}
        
        Make the message concise (2–4 lines) and relevant to their background.
        please dont give subject I just need the message also no need to use my name anywhere
      `,
    });

    console.log(response.text);

    const cleanedMessage = response.text?.replace(/\n/g, "");

    res.status(200).json(createResponse(true, "Got the message from deepseek", { data: cleanedMessage }))

  } catch (e: any) {
    console.log(e)
    res.status(400).json(createResponse(false, `${e.message}`))
  }
}