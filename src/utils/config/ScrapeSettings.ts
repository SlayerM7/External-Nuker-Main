import { white } from "chalk";
import { getTheme } from "../getTheme";

async function scrapeSettingsLogo(db) {
  let mainColor = getTheme(db);
  console.log(
    mainColor("              [") +
      white(1) +
      mainColor("] ") +
      white("Delete after nuke         ") +
      mainColor("[") +
      white(2) +
      mainColor("] ") +
      white("Check before nuke")
  );
}

export { scrapeSettingsLogo };
