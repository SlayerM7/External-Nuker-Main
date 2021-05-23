import { colors } from "../utils/themes";
import { createString } from "../utils/createString";
import { main } from "./main";
import { logoOptions } from "../utils/logoOptions";
import { logo } from "../utils/logo";
import { rapid } from "./rapidTitlePromise";

function changeTheme(rl, db, client) {
  rapid("[External-Nuker] - Theme changer", 1).then(() => {
    setTimeout(() => {
      process.title = "[External-Nuker] - Theme changer";
    }, 40);
  });
  console.clear();
  logo(db);
  rl.question(createString("Enter theme colour", db), (color) => {
    if (color === "exit" || color === "menu") {
      main(db, rl, client);
      return;
    }
    if (color === "themes") {
      console.log(colors.join("\n"));
      setTimeout(() => {
        console.log(" ");
        rl.question(
          createString(
            "Would you like to continue to *menu* or set *theme*\n> ",
            db
          ),
          (xx) => {
            if (xx === "menu") {
              main(db, rl, client);
              return;
            } else if (xx === "theme") {
              changeTheme(rl, db, client);
              return;
            } else {
              changeTheme(rl, db, client);
              return;
            }
          }
        );
      }, 1000);
      return;
    }
    if (!colors.includes(color)) {
      setTimeout(() => {
        changeTheme(rl, db, client);
      }, 1000);
      return console.log(createString("Unknown color", db, "semi", "fail"));
    }
    db.set("theme", color);
    db.save();
    process.title = `[External-Nuker] - Set theme to ${color}`;
    console.log(createString("Set new theme", db, "semi"));
    setTimeout(() => {
      console.log(createString("Saved data", db, "semi"));
    }, 1500);
    setTimeout(() => {
      main(db, rl, client);
    }, 2000);
  });
}

export { changeTheme };
