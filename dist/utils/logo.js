"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logo = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("./getTheme");
function logo(db) {
    let mainColor = getTheme_1.getTheme(db);
    console.log(` `);
    console.log(mainColor("              ╔═╗═╗ ╦╔╦╗╔═╗╦═╗╔╗╔╔═╗╦    ╔╗╔╦ ╦╦╔═╔═╗╦═╗"));
    console.log(chalk_1.blackBright("              ║╣ ╔╩╦╝ ║ ║╣ ╠╦╝║║║╠═╣║    ║║║║ ║╠╩╗║╣ ╠╦╝"));
    console.log(chalk_1.white("              ╚═╝╩ ╚═ ╩ ╚═╝╩╚═╝╚╝╩ ╩╩═╝  ╝╚╝╚═╝╩ ╩╚═╝╩╚═"));
    console.log(` `);
}
exports.logo = logo;
