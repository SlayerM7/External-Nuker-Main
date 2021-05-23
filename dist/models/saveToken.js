const mongoose = require("mongoose");
module.exports = mongoose.model("saved-tokens", new mongoose.Schema({
    Username: String,
    Token: String,
    clientUsername: String,
}));
