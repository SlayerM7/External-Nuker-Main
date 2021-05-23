import { mainMongoose } from "../main";
import { createString } from "../utils/createString";
import { logo } from "../utils/logo";
import { main } from "./main";
import { rapid } from "./rapidTitlePromise";

function credits(db, rl, where, ...extraArgs) {
  rapid("[External-Nuker] - Credits", 1).then(() => {
    setTimeout(() => {
      process.title = "[External-Nuker] - Credits";
    }, 40);
  });
  console.clear();
  logo(db);
  console.log(createString("External nuker", db, "semi"));
  setTimeout(() => {
    console.log(createString("Created by Slayer", db, "semi"));
    setTimeout(() => {
      console.log(createString("Made in TypeScript", db, "semi"));
      setTimeout(() => {
        console.log(
          createString("Github: https://github.com/SlayerM7", db, "semi")
        );
        setTimeout(() => {
          console.log(" ");
          rl.question(createString("Type anything to continue", db), () => {
            if (where === "main") {
              main(db, rl, extraArgs[0]);
            } else {
              mainMongoose();
            }
          });
        }, 1000);
      }, 1000);
    }, 1000);
  }, 500);
}

export { credits };
