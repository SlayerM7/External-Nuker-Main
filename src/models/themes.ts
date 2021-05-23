const mongo = require("mongoose");

export default mongo.model(
  "themes",
  new mongo.Schema({
    Username: String,
    Theme: String,
  })
);
