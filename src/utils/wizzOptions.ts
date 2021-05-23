import { white } from "chalk";
import { createString } from "./createString";
import { getTheme } from "./getTheme";
import { logo } from "./logo";

export default async function (db) {
  let mainColor = getTheme(db);
  logo(db);
  console.log(
    mainColor(
      "          ╔═════════════════════╦══════════════════╦══════════════════╗"
    )
  );
  console.log(
    mainColor("          ║ [") +
      white(1) +
      mainColor("] ") +
      white("Nuke            ") +
      mainColor("║ [") +
      white(2) +
      mainColor("] ") +
      white("Ban          ") +
      mainColor("║ [") +
      white("3") +
      mainColor("] ") +
      white("Kick         ") +
      mainColor("║")
  );
  console.log(
    mainColor("          ║ [") +
      white(4) +
      mainColor("] ") +
      white("Create channels ") +
      mainColor("║ [") +
      white(5) +
      mainColor("] ") +
      white("Del channels ") +
      mainColor("║ [") +
      white(6) +
      mainColor("] ") +
      white("Create roles ") +
      mainColor("║")
  );
  console.log(
    mainColor("          ║ [") +
      white(7) +
      mainColor("] ") +
      white("Delete roles    ") +
      mainColor("║ [") +
      white(8) +
      mainColor("] ") +
      white("Spam         ") +
      mainColor("║ [") +
      white(9) +
      mainColor("] ") +
      white("Scraper      ") +
      mainColor("║")
  );
  console.log(
    mainColor(
      "          ╚═════════════════════╩══════════════════╩══════════════════╝"
    )
  );
  console.log(" ");
  console.log(" ");
}
