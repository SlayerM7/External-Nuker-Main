"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("./getTheme");
const logo_1 = require("./logo");
function mainMenu(db) {
    let mainColor = getTheme_1.getTheme(db);
    logo_1.logo(db);
    console.log(mainColor("                ╔════════════════╦═══════════════╗"));
    console.log(mainColor("                ║ [") +
        chalk_1.white(1) +
        mainColor("] ") +
        chalk_1.white("Login      ") +
        mainColor("║ [") +
        chalk_1.white(2) +
        mainColor("] ") +
        chalk_1.white("Register  ") +
        mainColor("║"));
    console.log(mainColor("                ║ [") +
        chalk_1.white(3) +
        mainColor("] ") +
        chalk_1.white("Get key    ") +
        mainColor("║ [") +
        chalk_1.white(4) +
        mainColor("] ") +
        chalk_1.white("Credits   ") +
        mainColor("║"));
    console.log(mainColor("                ╚════════════════╩═══════════════╝"));
    console.log(" ");
}
exports.mainMenu = mainMenu;
