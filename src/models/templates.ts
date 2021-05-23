import { model, Schema } from "mongoose";

export default model(
  "templates",
  new Schema({
    Username: String,
    ChannelName: String,
    RoleName: String,
    RoleAmount: Number,
    WebhookName: String,
    ChannelAmount: Number,
    Name: String,
  })
);
