import { red, white, magentaBright } from "chalk";
import { getTheme } from "./getTheme";
function createString(question: string, db, ...type: String[]) {
  let mainColor = getTheme(db);
  let r = `              ${mainColor("> ")}${white(question)}${mainColor(
    ":"
  )} `;
  if (type) {
    if (type[0] === "semi")
      r = `              ${mainColor("> ")}${white(question)} `;
    if (type[1] === "fail" && type[0] === "semi")
      r = `              ${red("> ")}${white(question)}`;
  }
  if (type[0] === "semi" && type[1] === "w") {
    r = `              ${white(question)} `;
  }

  return r;
}

export { createString };
