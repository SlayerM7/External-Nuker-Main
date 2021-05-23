"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = mongoose_1.model("scrape", new mongoose_1.Schema({
    Username: String,
    Guild: String,
    Members: Array,
    Roles: Array,
    Channels: Array,
}));
