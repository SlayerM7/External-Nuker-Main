"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = void 0;
const chalk_1 = __importDefault(require("chalk"));
const chalk_2 = require("chalk");
function getTheme(db) {
    var defaultColor = chalk_1.default.bold.rgb(300, 100, 300);
    var theme = defaultColor;
    try {
        if (db.has("theme")) {
            let them = db.get("theme");
            if (them === "yellow")
                theme = chalk_2.yellow;
            if (them === "green")
                theme = chalk_2.green;
            if (them === "blue")
                theme = chalk_2.blue;
            if (them === "default")
                theme = defaultColor;
            if (them === "cyan")
                theme = chalk_2.cyan;
            if (them === "red")
                theme = chalk_2.red;
            if (them === "gray")
                theme = chalk_2.gray;
            if (them === "green bright")
                theme = chalk_2.greenBright;
            if (them === "red bright")
                theme = chalk_2.redBright;
            if (them === "yellow bright")
                theme = chalk_2.yellowBright;
            if (them === "blue bright")
                theme = chalk_2.blueBright;
            if (them === "magenta")
                theme = chalk_2.magenta;
            if (them === "blue bright")
                theme = chalk_2.blueBright;
        }
    }
    catch (e) { }
    return theme;
}
exports.getTheme = getTheme;
