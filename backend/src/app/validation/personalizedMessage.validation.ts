import { z } from "zod";

export const personalizedMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  job_title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  summary: z.string().optional(),
});


export type PersonalizedMessageInput = z.infer<typeof personalizedMessageSchema>;
