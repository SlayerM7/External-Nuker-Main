import { white } from "chalk";
import { getTheme } from "./getTheme";
import { logo } from "./logo";

async function logoOptions(db) {
  let mainColor = getTheme(db);
  logo(db);
  console.log(
    mainColor("              [") +
      white(1) +
      mainColor("] ") +
      white("Wizz         ") +
      mainColor("[") +
      white(2) +
      mainColor("] ") +
      white("Scrape  ") +
      mainColor("[") +
      white("3") +
      mainColor("] ") +
      white("Start menu")
  );
  console.log(
    mainColor("              [") +
      white("x") +
      mainColor("] ") +
      white("Change theme ") +
      mainColor("[") +
      white("c") +
      mainColor("] ") +
      white("Exit    ") +
      mainColor("[") +
      white("n") +
      mainColor("] ") +
      white("Create template")
  );
  console.log(
    mainColor("              [") +
      white("v") +
      mainColor("] ") +
      white("Utils        ") +
      mainColor("[") +
      white("z") +
      mainColor("] ") +
      white("Credits ") +
      mainColor("[") +
      white("m") +
      mainColor("] ") +
      white("Delete template")
  );
  console.log(" ");
  console.log(" ");
}

export { logoOptions };
