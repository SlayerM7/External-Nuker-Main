"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = mongoose_1.model("templates", new mongoose_1.Schema({
    Username: String,
    ChannelName: String,
    RoleName: String,
    RoleAmount: Number,
    WebhookName: String,
    ChannelAmount: Number,
    Name: String,
}));
