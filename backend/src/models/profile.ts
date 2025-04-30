// models/Profile.ts
import { Schema, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    name: { type: String, },
    jobTitle: { type: String },
    company: { type: String },
    location: { type: String },
    profileUrl: { type: String, },
    profileImageUrl: { type: String },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Profile = model("Profile", ProfileSchema);
