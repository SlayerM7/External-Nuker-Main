"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("mongoose");
exports.default = mongo.model("themes", new mongo.Schema({
    Username: String,
    Theme: String,
}));
