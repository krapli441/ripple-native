"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
const mongoose = require("mongoose");
exports.NotificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    senderId: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ripple',
        required: true,
    },
    albumCoverUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});
//# sourceMappingURL=notification.schema.js.map