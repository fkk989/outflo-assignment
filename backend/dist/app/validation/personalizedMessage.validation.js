"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalizedMessageSchema = void 0;
const zod_1 = require("zod");
exports.personalizedMessageSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    job_title: zod_1.z.string().min(1, "Job title is required"),
    company: zod_1.z.string().min(1, "Company name is required"),
    location: zod_1.z.string().min(1, "Location is required"),
    summary: zod_1.z.string().optional(),
});
