import mongoose from "mongoose";

const sessionsSchema = new mongoose.Schema({

    userId: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, unique: true },
    userAgent: { type: String, default: "Unknown Device" },
    ipAddress: { type: String, default: "Unknown IP" },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
});
sessionsSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const session = mongoose.models.session || mongoose.model('session', sessionsSchema);

export default session;