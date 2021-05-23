import { Client } from "discord.js";
const saveToken = require("../models/saveToken");
import { mainLoad } from "..";
import { createString } from "./createString";
import { logo } from "./logo";
let client = new Client();

function saveNewToken(db, rl, username: String) {
  process.title = "[External-Nuker] - Add token";
  console.clear();
  logo(db);
  rl.question(createString("Enter token", db), (token) => {
    if (token === "main") {
      mainLoad(rl, db, username);
    }
    console.log(createString("Checking token", db, "semi"));
    client.on("ready", () => {
      console.log(createString("Successfully logged into client", db, "semi"));
      setTimeout(() => {
        console.log(
          createString("Logging out of client and saving token", db, "semi")
        );
        saveToken
          .findOneAndUpdate(
            { Username: username },
            {
              Token: token,
              clientUsername: client.user.username,
            },
            { upsert: true }
          )
          .exec();
        client.destroy();

        mainLoad(rl, db, username, "bypass");
      }, 2000);
    });
    client.login(token).catch(() => {
      process.title = "[External-Nuker] - Token invalid";
      console.log(createString("The token is invalid", db, "semi"));
      setTimeout(() => {
        rl.question(createString("Type anything to continue", db), () => {
          mainLoad(rl, db, username);
        });
      }, 500);
    });
  });
}

export { saveNewToken };
