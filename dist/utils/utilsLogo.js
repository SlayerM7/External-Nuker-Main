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
function utilsLogo(db) {
    return __awaiter(this, void 0, void 0, function* () {
        let mainColor = getTheme_1.getTheme(db);
        logo_1.logo(db);
        console.log(mainColor("              [") +
            chalk_1.white(1) +
            mainColor("] ") +
            chalk_1.white("Ping            ") +
            mainColor("[") +
            chalk_1.white(2) +
            mainColor("] ") +
            chalk_1.white("Add scrapes  ") +
            mainColor("[") +
            chalk_1.white("3") +
            mainColor("] ") +
            chalk_1.white("Delete account      "));
        console.log(mainColor("              [") +
            chalk_1.white(4) +
            mainColor("] ") +
            chalk_1.white("Account info    ") +
            mainColor("[") +
            chalk_1.white(5) +
            mainColor("] ") +
            chalk_1.white("Data info    ") +
            mainColor("[") +
            chalk_1.white(6) +
            mainColor("] ") +
            chalk_1.white("Clear scrapes  "));
        console.log(mainColor("              [") +
            chalk_1.white(7) +
            mainColor("] ") +
            chalk_1.white("Rapid title     ") +
            mainColor("[") +
            chalk_1.white(8) +
            mainColor("] ") +
            chalk_1.white("Config       ") +
            mainColor("[") +
            chalk_1.white(9) +
            mainColor("] ") +
            chalk_1.white("Menu"));
        console.log(mainColor("              [") +
            chalk_1.white("x") +
            mainColor("] ") +
            chalk_1.white("Ban scrape      ") +
            mainColor("[") +
            chalk_1.white("z") +
            mainColor("] ") +
            chalk_1.white("Mass unban   ") +
            mainColor("[") +
            chalk_1.white("c") +
            mainColor("] ") +
            chalk_1.white("Export scrape"));
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
    });
}
exports.default = utilsLogo;
