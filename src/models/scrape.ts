import { model, Schema } from "mongoose";

export default model(
  "scrape",
  new Schema({
    Username: String,
    Guild: String,
    Members: Array,
    Roles: Array,
    Channels: Array,
  })
);
