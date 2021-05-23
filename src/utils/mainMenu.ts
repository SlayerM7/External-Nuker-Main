import { white } from "chalk";
import { getTheme } from "./getTheme";
import { logo } from "./logo";
import sleep from "./sleep";

function mainMenu(db) {
  let mainColor = getTheme(db);
  logo(db);
  console.log(mainColor("                ╔════════════════╦═══════════════╗"));
  console.log(
    mainColor("                ║ [") +
      white(1) +
      mainColor("] ") +
      white("Login      ") +
      mainColor("║ [") +
      white(2) +
      mainColor("] ") +
      white("Register  ") +
      mainColor("║")
  );
  console.log(
    mainColor("                ║ [") +
      white(3) +
      mainColor("] ") +
      white("Get key    ") +
      mainColor("║ [") +
      white(4) +
      mainColor("] ") +
      white("Credits   ") +
      mainColor("║")
  );
  console.log(mainColor("                ╚════════════════╩═══════════════╝"));
  console.log(" ");
}

export { mainMenu };
