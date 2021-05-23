"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const getTheme_1 = require("./getTheme");
const logo_1 = require("./logo");
function default_1(db) {
    return __awaiter(this, void 0, void 0, function* () {
        let mainColor = getTheme_1.getTheme(db);
        logo_1.logo(db);
        console.log(mainColor("          ╔═════════════════════╦══════════════════╦══════════════════╗"));
        console.log(mainColor("          ║ [") +
            chalk_1.white(1) +
            mainColor("] ") +
            chalk_1.white("Nuke            ") +
            mainColor("║ [") +
            chalk_1.white(2) +
            mainColor("] ") +
            chalk_1.white("Ban          ") +
            mainColor("║ [") +
            chalk_1.white("3") +
            mainColor("] ") +
            chalk_1.white("Kick         ") +
            mainColor("║"));
        console.log(mainColor("          ║ [") +
            chalk_1.white(4) +
            mainColor("] ") +
            chalk_1.white("Create channels ") +
            mainColor("║ [") +
            chalk_1.white(5) +
            mainColor("] ") +
            chalk_1.white("Del channels ") +
            mainColor("║ [") +
            chalk_1.white(6) +
            mainColor("] ") +
            chalk_1.white("Create roles ") +
            mainColor("║"));
        console.log(mainColor("          ║ [") +
            chalk_1.white(7) +
            mainColor("] ") +
            chalk_1.white("Delete roles    ") +
            mainColor("║ [") +
            chalk_1.white(8) +
            mainColor("] ") +
            chalk_1.white("Spam         ") +
            mainColor("║ [") +
            chalk_1.white(9) +
            mainColor("] ") +
            chalk_1.white("Scraper      ") +
            mainColor("║"));
        console.log(mainColor("          ╚═════════════════════╩══════════════════╩══════════════════╝"));
        console.log(" ");
        console.log(" ");
    });
}
exports.default = default_1;
