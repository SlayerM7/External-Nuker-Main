const { Schema, model } = require("mongoose");

const shema = new Schema({
  Username: String,
  Password: String,
  createdAt: Number,
});

module.exports = model("accounts", shema);
