import chalk from "chalk";

import {
  blue,
  cyan,
  green,
  magentaBright,
  yellow,
  red,
  gray,
  greenBright,
  redBright,
  yellowBright,
  blueBright,
  magenta,
} from "chalk";

function getTheme(db) {
  var defaultColor = chalk.bold.rgb(300, 100, 300);
  var theme = defaultColor;
  try {
    if (db.has("theme")) {
      let them = db.get("theme");
      if (them === "yellow") theme = yellow;
      if (them === "green") theme = green;
      if (them === "blue") theme = blue;
      if (them === "default") theme = defaultColor;
      if (them === "cyan") theme = cyan;
      if (them === "red") theme = red;
      if (them === "gray") theme = gray;
      if (them === "green bright") theme = greenBright;
      if (them === "red bright") theme = redBright;
      if (them === "yellow bright") theme = yellowBright;
      if (them === "blue bright") theme = blueBright;
      if (them === "magenta") theme = magenta;
      if (them === "blue bright") theme = blueBright;
    }
  } catch (e) {}
  return theme;
}

export { getTheme };
