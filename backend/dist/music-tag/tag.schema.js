"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSchema = void 0;
const mongoose = require("mongoose");
exports.TagSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
//# sourceMappingURL=tag.schema.js.map