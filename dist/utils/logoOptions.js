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
exports.logoOptions = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("./getTheme");
const logo_1 = require("./logo");
function logoOptions(db) {
    return __awaiter(this, void 0, void 0, function* () {
        let mainColor = getTheme_1.getTheme(db);
        logo_1.logo(db);
        console.log(mainColor("              [") +
            chalk_1.white(1) +
            mainColor("] ") +
            chalk_1.white("Wizz         ") +
            mainColor("[") +
            chalk_1.white(2) +
            mainColor("] ") +
            chalk_1.white("Scrape  ") +
            mainColor("[") +
            chalk_1.white("3") +
            mainColor("] ") +
            chalk_1.white("Start menu"));
        console.log(mainColor("              [") +
            chalk_1.white("x") +
            mainColor("] ") +
            chalk_1.white("Change theme ") +
            mainColor("[") +
            chalk_1.white("c") +
            mainColor("] ") +
            chalk_1.white("Exit    ") +
            mainColor("[") +
            chalk_1.white("n") +
            mainColor("] ") +
            chalk_1.white("Create template"));
        console.log(mainColor("              [") +
            chalk_1.white("v") +
            mainColor("] ") +
            chalk_1.white("Utils        ") +
            mainColor("[") +
            chalk_1.white("z") +
            mainColor("] ") +
            chalk_1.white("Credits ") +
            mainColor("[") +
            chalk_1.white("m") +
            mainColor("] ") +
            chalk_1.white("Delete template"));
        console.log(" ");
        console.log(" ");
    });
}
exports.logoOptions = logoOptions;
