"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const main_1 = require("../main");
const createString_1 = require("../utils/createString");
const logoOptions_1 = require("../utils/logoOptions");
const changeTheme_1 = require("./changeTheme");
const createTemplate_1 = require("./createTemplate");
const credits_1 = require("./credits");
const deleteTemplate_1 = require("./deleteTemplate");
const destroyClient_1 = require("./destroyClient");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
const scrape_1 = require("./scrape");
const wizz_1 = require("./wizz");
function main(db, rl, client) {
    rapidTitlePromise_1.rapid("[External-Nuker] - Main menu", 1).then(() => {
        setTimeout(() => {
            process.title = "[External nuker] - Main menu";
        }, 40);
    });
    console.clear();
    logoOptions_1.logoOptions(db);
    rl.question(createString_1.createString("Enter option", db), (option) => {
        option = option.toLowerCase();
        option = option.trim();
        if (![
            "x",
            "2",
            "1",
            "3",
            "c",
            "credits",
            "credit",
            "z",
            "v",
            "n",
            "m",
        ].includes(option)) {
            process.title = "[External-Nuker] - Unknown option";
            console.log(createString_1.createString("Unknown option", db, "semi", "fail"));
            setTimeout(() => {
                main(db, rl, client);
            }, 1000);
            return;
        }
        if (option === "x") {
            changeTheme_1.changeTheme(rl, db, client);
        }
        if (option === "2") {
            scrape_1.scrape(rl, db, client);
        }
        if (option === "1") {
            wizz_1.wizz(client, db, rl);
        }
        if (option === "c") {
            destroyClient_1.destroyClient(client, rl, db);
        }
        if (option === "credits" || option === "credit" || option === "z") {
            credits_1.credits(db, rl, "main", client);
        }
        if (option === "v") {
            require("./utils")(client, db, rl);
        }
        if (option === "3") {
            main_1.mainMongoose();
        }
        if (option === "n") {
            createTemplate_1.createTemplate(db, rl, client);
        }
        if (option === "m") {
            deleteTemplate_1.deleteTemplate(db, rl, client);
        }
    });
}
exports.main = main;
