import { model, Schema } from "mongoose";

export default model(
  "setting-scrape-delnuke",
  new Schema({
    Username: String,
  })
);
