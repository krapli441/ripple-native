"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeVerifierSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CodeVerifierSchema = new mongoose_1.Schema({
    code_verifier: String,
    user_agent: String,
    ip: String,
    createdAt: { type: Date, default: Date.now, expires: '10m' },
});
//# sourceMappingURL=code-verifier.schema.js.map