import { blackBright, white } from "chalk";
import { getTheme } from "./getTheme";

function logo(db) {
  let mainColor = getTheme(db);
  console.log(` `);
  console.log(
    mainColor("              ╔═╗═╗ ╦╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔╗╔╦ ╦╦╔═╔═╗╦═╗")
  );
  console.log(
    blackBright("              ║╣ ╔╩╦╝ ║ ║╣ ╠╦╝║║║╠═╣║    ║║║║ ║╠╩╗║╣ ╠╦╝")
  );
  console.log(
    white("              ╚═╝╩ ╚═ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╝╚╝╚═╝╩ ╩╚═╝╩╚═")
  );
  console.log(` `);
}

export { logo };
