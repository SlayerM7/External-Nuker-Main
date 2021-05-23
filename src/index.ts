const saveToken = require("./models/saveToken");
import { Client } from "discord.js";
import { main } from "./functions/main";
import { createString } from "./utils/createString";
import { saveNewToken } from "./utils/saveNewToken";
import child_process from "child_process";
import { logo } from "./utils/logo";
import { mainMongoose } from "./main";
import { rapid } from "./functions/rapidTitlePromise";

async function mainLoad(rl, db, username, bypass = null) {
  process.on("exit", () => {
    db.delete("username");
    db.delete("curtoken");
    db.save();
  });
  process.title = "[External-Nuker] - Setup";
  console.clear();
  logo(db);
  const client = new Client();
  let tokenData = await saveToken.findOne({ Username: username });
  if (tokenData || bypass === "bypass") {
    rl.question(
      createString("Would you like to use a saved token", db),
      async (tokenOption) => {
        tokenData = tokenOption.toLowerCase();
        if (tokenOption === "y" || tokenOption === "yes") {
          let objSaved = await saveToken.findOne({ Username: username });
          console.log(
            createString(
              "Starting to attempt to log into " + objSaved.clientUsername,
              db,
              "semi"
            )
          );
          client.on("ready", () => {
            process.title = `[External-Nuker] -> Logged in as ${client.user.username}`;
            console.clear();
            main(db, rl, client);
            db.set("curtoken", objSaved.Token);
          });
          client.login(objSaved.Token).catch(() => {
            console.log(createString("Failed to log in", db, "semi"));
            setTimeout(() => {
              mainMongoose();
            }, 1000);
          });
        } else if (tokenOption === "n" || tokenOption === "no") {
          saveNewToken(db, rl, username);
        } else mainLoad(rl, db, username);
      }
    );
  } else saveNewToken(db, rl, username);
}
child_process.exec("mode 85,20");
console.clear();
setTimeout(() => {
  console.clear();
}, 10);
setTimeout(() => {
  console.clear();
  console.log("Loading all data");
}, 1000);
rapid(`[External-Nuker] - Loading all data`, 1).then(() => {
  mainMongoose();
});

export { mainLoad };
