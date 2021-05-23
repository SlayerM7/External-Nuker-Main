"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeTheme = void 0;
const themes_1 = require("../utils/themes");
const createString_1 = require("../utils/createString");
const main_1 = require("./main");
const logo_1 = require("../utils/logo");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function changeTheme(rl, db, client) {
    rapidTitlePromise_1.rapid("[External-Nuker] - Theme changer", 1).then(() => {
        setTimeout(() => {
            process.title = "[External-Nuker] - Theme changer";
        }, 40);
    });
    console.clear();
    logo_1.logo(db);
    rl.question(createString_1.createString("Enter theme colour", db), (color) => {
        if (color === "exit" || color === "menu") {
            main_1.main(db, rl, client);
            return;
        }
        if (color === "themes") {
            console.log(themes_1.colors.join("\n"));
            setTimeout(() => {
                console.log(" ");
                rl.question(createString_1.createString("Would you like to continue to *menu* or set *theme*\n> ", db), (xx) => {
                    if (xx === "menu") {
                        main_1.main(db, rl, client);
                        return;
                    }
                    else if (xx === "theme") {
                        changeTheme(rl, db, client);
                        return;
                    }
                    else {
                        changeTheme(rl, db, client);
                        return;
                    }
                });
            }, 1000);
            return;
        }
        if (!themes_1.colors.includes(color)) {
            setTimeout(() => {
                changeTheme(rl, db, client);
            }, 1000);
            return console.log(createString_1.createString("Unknown color", db, "semi", "fail"));
        }
        db.set("theme", color);
        db.save();
        process.title = `[External-Nuker] - Set theme to ${color}`;
        console.log(createString_1.createString("Set new theme", db, "semi"));
        setTimeout(() => {
            console.log(createString_1.createString("Saved data", db, "semi"));
        }, 1500);
        setTimeout(() => {
            main_1.main(db, rl, client);
        }, 2000);
    });
}
exports.changeTheme = changeTheme;
