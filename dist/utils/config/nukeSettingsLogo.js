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
exports.nukeSettingsLogo = void 0;
const chalk_1 = require("chalk");
const getTheme_1 = require("../getTheme");
function nukeSettingsLogo(db) {
    return __awaiter(this, void 0, void 0, function* () {
        let mainColor = getTheme_1.getTheme(db);
        console.log(mainColor("              [") +
            chalk_1.white(1) +
            mainColor("] ") +
            chalk_1.white("Always use old            ") +
            mainColor("[") +
            chalk_1.white(2) +
            mainColor("] ") +
            chalk_1.white("Always set new"));
    });
}
exports.nukeSettingsLogo = nukeSettingsLogo;
