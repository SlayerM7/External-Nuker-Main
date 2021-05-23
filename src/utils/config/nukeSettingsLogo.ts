import { white } from "chalk";
import { getTheme } from "../getTheme";

async function nukeSettingsLogo(db) {
  let mainColor = getTheme(db);
  console.log(
    mainColor("              [") +
      white(1) +
      mainColor("] ") +
      white("Always use old            ") +
      mainColor("[") +
      white(2) +
      mainColor("] ") +
      white("Always set new")
  );
}

export { nukeSettingsLogo };
