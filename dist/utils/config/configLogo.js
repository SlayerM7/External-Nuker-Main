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
exports.configLogo = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("../getTheme");
const logo_1 = require("../logo");
function configLogo(db) {
    return __awaiter(this, void 0, void 0, function* () {
        let mainColor = getTheme_1.getTheme(db);
        logo_1.logo(db);
        console.log(mainColor("              [") +
            chalk_1.white(1) +
            mainColor("] ") +
            chalk_1.white("Nuke settings         ") +
            mainColor("[") +
            chalk_1.white(2) +
            mainColor("] ") +
            chalk_1.white("Scrape settings"));
        // console.log(
        //   mainColor("[") + white(3) + mainColor("] ") + white("Data saved         ")
        //   //+
        //   // mainColor("[") +
        //   // white(2) +
        //   // mainColor("] ") +
        //   // white("Scrape settings")
        // );
        //   console.log(
        //     mainColor("[") +
        //       white("x") +
        //       mainColor("] ") +
        //       white("Change theme    ") +
        //       mainColor("[") +
        //       white("c") +
        //       mainColor("] ") +
        //       white("Exit")
        //   );
        //   console.log(
        //     mainColor("[") +
        //       white("v") +
        //       mainColor("] ") +
        //       white("Config    ") +
        //       mainColor("[") +
        //       white("z") +
        //       mainColor("] ") +
        //       white("Credits")
        //   );
        console.log(" ");
        console.log(" ");
    });
}
exports.configLogo = configLogo;
