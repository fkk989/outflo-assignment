"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
// models/Profile.ts
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    name: { type: String, },
    jobTitle: { type: String },
    company: { type: String },
    location: { type: String },
    profileUrl: { type: String, },
    profileImageUrl: { type: String },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
exports.Profile = (0, mongoose_1.model)("Profile", ProfileSchema);
