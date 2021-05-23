import { mainMongoose } from "../main";
import { createString } from "../utils/createString";
import { logo } from "../utils/logo";
import { logoOptions } from "../utils/logoOptions";
import { rapid } from "./rapidTitlePromise";

function destroyClient(client, rl, db) {
  rapid("[External-Nuker] - Logging out", 1).then(() => {
    setTimeout(() => {
      process.title = "[External-Nuker] - Logging out";
    }, 40);
  });
  console.clear();
  logo(db);
  console.log(createString("Logging out of client...", db, "semi"));
  client.destroy();
  setTimeout(() => {
    console.log(createString("Successfully logged out of client", db, "semi"));
    setTimeout(() => {
      rl.question(
        createString("Would you like to exit External nuker", db),
        (op) => {
          op = op.toLowerCase();
          if (op === "y" || op === "yes") {
            process.title = "[External-Nuker] - Exiting";
            console.log(createString("Re-capturing data", db, "semi"));
            setTimeout(() => {
              console.log(
                createString("Successfully validated data", db, "semi")
              );
              setTimeout(() => {
                console.log(
                  createString("Attempting to exit process", db, "semi")
                );
              }, 200);
              setTimeout(() => {
                process.exit();
              }, 1000);
            }, 1000);
          } else mainMongoose();
        }
      );
    }, 1000);
  }, 1000);
}

export { destroyClient };
