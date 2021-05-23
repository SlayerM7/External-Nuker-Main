import { white } from "chalk";
import { configLogo } from "../utils/config/configLogo";
import { nukeSettingsLogo } from "../utils/config/nukeSettingsLogo";
import { scrapeSettingsLogo } from "../utils/config/ScrapeSettings";
import { createString } from "../utils/createString";
import { getTheme } from "../utils/getTheme";
import { logo } from "../utils/logo";
import { main } from "./main";
import settingsDelnuke from "../models/setting-scrape-delnuke";
import { rapid } from "./rapidTitlePromise";

function config(db, rl, client) {
  rapid("[External-Nuker] - Config", 1).then(() => {
    setTimeout(() => {
      process.title = "[External-Nuker] - Config";
    }, 40);
  });
  console.clear();
  configLogo(db);
  rl.question(createString("Enter option", db), (option) => {
    if (option === "1") {
      process.title = "[External Nuker] - Config nuke settings";
      console.clear();
      logo(db);
      nukeSettingsLogo(db);
      rl.question(createString("Enter option", db), (op) => {
        if (op === "1") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              db.set(
                `settings.nuke.useold`,
                enableDisable === "enable" ? true : false
              );
              db.save();
              setTimeout(() => {
                config(db, rl, client);
              }, 1000);
            }
          );
        } else if (op === "2") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              db.set(
                `settings.nuke.setnew`,
                enableDisable === "enable" ? true : false
              );
              db.save();
              setTimeout(() => {
                config(db, rl, client);
              }, 1000);
            }
          );
        }
      });
    }
    if (option === "2") {
      process.title = "[External Nuker] - Config scrape settings";
      console.clear();
      logo(db);
      scrapeSettingsLogo(db);
      rl.question(createString("Enter option", db), (op) => {
        if (op === "1") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              if (enableDisable === "enable") {
                settingsDelnuke
                  .findOneAndUpdate(
                    { Username: db.get("username") },
                    { Username: db.get("username") },
                    { upsert: true }
                  )
                  .exec();
              } else {
                settingsDelnuke
                  .deleteOne({ Username: db.get("username") })
                  .exec();
              }
              setTimeout(() => {
                config(db, rl, client);
              }, 1000);
            }
          );
        } else if (op === "2") {
          rl.question(
            createString("Would you like to *enable* or *disable* this", db),
            (enableDisable) => {
              db.set(
                `settings.scrape.checknuke`,
                enableDisable === "enable" ? true : false
              );
              db.save();
              setTimeout(() => {
                config(db, rl, client);
              }, 1000);
            }
          );
        }
      });
    }
    if (option === "menu") {
      main(db, rl, client);
    }
  });
}

export { config };
