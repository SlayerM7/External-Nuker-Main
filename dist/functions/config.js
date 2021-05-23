"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const configLogo_1 = require("../utils/config/configLogo");
const nukeSettingsLogo_1 = require("../utils/config/nukeSettingsLogo");
const ScrapeSettings_1 = require("../utils/config/ScrapeSettings");
const createString_1 = require("../utils/createString");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
const setting_scrape_delnuke_1 = __importDefault(require("../models/setting-scrape-delnuke"));
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function config(db, rl, client) {
    rapidTitlePromise_1.rapid("[External-Nuker] - Config", 1).then(() => {
        setTimeout(() => {
            process.title = "[External-Nuker] - Config";
        }, 40);
    });
    console.clear();
    configLogo_1.configLogo(db);
    rl.question(createString_1.createString("Enter option", db), (option) => {
        if (option === "1") {
            process.title = "[External Nuker] - Config nuke settings";
            console.clear();
            logo_1.logo(db);
            nukeSettingsLogo_1.nukeSettingsLogo(db);
            rl.question(createString_1.createString("Enter option", db), (op) => {
                if (op === "1") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        db.set(`settings.nuke.useold`, enableDisable === "enable" ? true : false);
                        db.save();
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 1000);
                    });
                }
                else if (op === "2") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        db.set(`settings.nuke.setnew`, enableDisable === "enable" ? true : false);
                        db.save();
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 1000);
                    });
                }
            });
        }
        if (option === "2") {
            process.title = "[External Nuker] - Config scrape settings";
            console.clear();
            logo_1.logo(db);
            ScrapeSettings_1.scrapeSettingsLogo(db);
            rl.question(createString_1.createString("Enter option", db), (op) => {
                if (op === "1") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        if (enableDisable === "enable") {
                            setting_scrape_delnuke_1.default
                                .findOneAndUpdate({ Username: db.get("username") }, { Username: db.get("username") }, { upsert: true })
                                .exec();
                        }
                        else {
                            setting_scrape_delnuke_1.default
                                .deleteOne({ Username: db.get("username") })
                                .exec();
                        }
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 1000);
                    });
                }
                else if (op === "2") {
                    rl.question(createString_1.createString("Would you like to *enable* or *disable* this", db), (enableDisable) => {
                        db.set(`settings.scrape.checknuke`, enableDisable === "enable" ? true : false);
                        db.save();
                        setTimeout(() => {
                            config(db, rl, client);
                        }, 1000);
                    });
                }
            });
        }
        if (option === "menu") {
            main_1.main(db, rl, client);
        }
    });
}
exports.config = config;
