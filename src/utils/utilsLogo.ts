import { white } from "chalk";
import { getTheme } from "./getTheme";
import { logo } from "./logo";

async function utilsLogo(db) {
  let mainColor = getTheme(db);
  logo(db);
  console.log(
    mainColor("              [") +
      white(1) +
      mainColor("] ") +
      white("Ping            ") +
      mainColor("[") +
      white(2) +
      mainColor("] ") +
      white("Add scrapes  ") +
      mainColor("[") +
      white("3") +
      mainColor("] ") +
      white("Delete account      ")
  );
  console.log(
    mainColor("              [") +
      white(4) +
      mainColor("] ") +
      white("Account info    ") +
      mainColor("[") +
      white(5) +
      mainColor("] ") +
      white("Data info    ") +
      mainColor("[") +
      white(6) +
      mainColor("] ") +
      white("Clear scrapes  ")
  );
  console.log(
    mainColor("              [") +
      white(7) +
      mainColor("] ") +
      white("Rapid title     ") +
      mainColor("[") +
      white(8) +
      mainColor("] ") +
      white("Config       ") +
      mainColor("[") +
      white(9) +
      mainColor("] ") +
      white("Menu")
  );
  console.log(
    mainColor("              [") +
      white("x") +
      mainColor("] ") +
      white("Ban scrape      ") +
      mainColor("[") +
      white("z") +
      mainColor("] ") +
      white("Mass unban   ") +
      mainColor("[") +
      white("c") +
      mainColor("] ") +
      white("Export scrape")
  );
  // console.log(
  //   mainColor("              [") +
  //     white("f") +
  //     mainColor("] ") +
  //     white("Del scrape      ") +
  //     mainColor("[") +
  //     white("g") +
  //     mainColor("] ") +
  //     white("Menu         ") +
  //     mainColor("[") +
  //     white("h") +
  //     mainColor("] ") +
  //     white("Scrape info")
  // );
}

export default utilsLogo;
