"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credits = void 0;
const main_1 = require("../main");
const createString_1 = require("../utils/createString");
const logo_1 = require("../utils/logo");
const main_2 = require("./main");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function credits(db, rl, where, ...extraArgs) {
    rapidTitlePromise_1.rapid("[External-Nuker] - Credits", 1).then(() => {
        setTimeout(() => {
            process.title = "[External-Nuker] - Credits";
        }, 40);
    });
    console.clear();
    logo_1.logo(db);
    console.log(createString_1.createString("External nuker", db, "semi"));
    setTimeout(() => {
        console.log(createString_1.createString("Created by Slayer", db, "semi"));
        setTimeout(() => {
            console.log(createString_1.createString("Made in TypeScript", db, "semi"));
            setTimeout(() => {
                console.log(createString_1.createString("Github: https://github.com/SlayerM7", db, "semi"));
                setTimeout(() => {
                    console.log(" ");
                    rl.question(createString_1.createString("Type anything to continue", db), () => {
                        if (where === "main") {
                            main_2.main(db, rl, extraArgs[0]);
                        }
                        else {
                            main_1.mainMongoose();
                        }
                    });
                }, 1000);
            }, 1000);
        }, 1000);
    }, 500);
}
exports.credits = credits;
