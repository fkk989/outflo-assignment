import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GEMINY_API_KEY = process.env.GEMINY_API_KEY
export const ai = new GoogleGenAI({ apiKey: GEMINY_API_KEY });