import { red, white } from "chalk";
import { mainMongoose } from "../main";
import { createString } from "../utils/createString";
import { logoOptions } from "../utils/logoOptions";
import { changeTheme } from "./changeTheme";
import { config } from "./config";
import { createTemplate } from "./createTemplate";
import { credits } from "./credits";
import { deleteTemplate } from "./deleteTemplate";
import { destroyClient } from "./destroyClient";
import { rapid } from "./rapidTitlePromise";
import { scrape } from "./scrape";
import { wizz } from "./wizz";

function main(db, rl, client) {
  rapid("[External-Nuker] - Main menu", 1).then(() => {
    setTimeout(() => {
      process.title = "[External nuker] - Main menu";
    }, 40);
  });
  console.clear();
  logoOptions(db);

  rl.question(createString("Enter option", db), (option) => {
    option = option.toLowerCase();
    option = option.trim();
    if (
      ![
        "x",
        "2",
        "1",
        "3",
        "c",
        "credits",
        "credit",
        "z",
        "v",
        "n",
        "m",
      ].includes(option)
    ) {
      process.title = "[External-Nuker] - Unknown option";
      console.log(createString("Unknown option", db, "semi", "fail"));
      setTimeout(() => {
        main(db, rl, client);
      }, 1000);
      return;
    }
    if (option === "x") {
      changeTheme(rl, db, client);
    }
    if (option === "2") {
      scrape(rl, db, client);
    }
    if (option === "1") {
      wizz(client, db, rl);
    }
    if (option === "c") {
      destroyClient(client, rl, db);
    }
    if (option === "credits" || option === "credit" || option === "z") {
      credits(db, rl, "main", client);
    }
    if (option === "v") {
      require("./utils")(client, db, rl);
    }
    if (option === "3") {
      mainMongoose();
    }
    if (option === "n") {
      createTemplate(db, rl, client);
    }
    if (option === "m") {
      deleteTemplate(db, rl, client);
    }
  });
}

export { main };
