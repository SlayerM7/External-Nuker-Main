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
exports.scrape = void 0;
const scrape_1 = __importDefault(require("../models/scrape"));
const createString_1 = require("../utils/createString");
const getTheme_1 = require("../utils/getTheme");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function actualScrap(rl, db, client, guildID) {
    console.clear();
    logo_1.logo(db);
    let server = client.guilds.cache.get(guildID);
    let roles = [];
    let members = [];
    let channels = [];
    process.title = `[External-Nuker] - Scraping ${server.name}`;
    server.roles.cache.map((role) => {
        roles.push(role.id);
    });
    server.channels.cache.map((channel) => {
        channels.push(channel.id);
    });
    server.members.cache.map((member) => {
        members.push(member.id);
    });
    scrape_1.default
        .findOneAndUpdate({ Username: db.get("username"), Guild: guildID }, { Roles: roles, Channels: channels, Members: members }, { upsert: true })
        .exec();
    let c = getTheme_1.getTheme(db);
    console.log(`\n`);
    console.log(createString_1.createString(`Scraped ${c(members.length)} members`, db, "semi"));
    console.log(createString_1.createString(`Scraped ${c(roles.length)} roles`, db, "semi"));
    console.log(createString_1.createString(`Scraped ${c(channels.length)} channels`, db, "semi"));
    setTimeout(() => {
        main_1.main(db, rl, client);
    }, 1000);
}
function scrape(rl, db, client) {
    rapidTitlePromise_1.rapid("[External-Nuker] - Scraper", 1).then(() => {
        setTimeout(() => {
            process.title = "[External-Nuker] - Scraper";
        }, 40);
    });
    console.clear();
    logo_1.logo(db);
    rl.question(createString_1.createString("Enter guild ID", db), (guildID) => __awaiter(this, void 0, void 0, function* () {
        if (guildID === "exit" || guildID === "menu") {
            main_1.main(db, rl, client);
            return;
        }
        if (!client.guilds.cache.has(guildID)) {
            console.log(createString_1.createString("Unknown server", db, "semi", "fail"));
            setTimeout(() => {
                main_1.main(db, rl, client);
            }, 1000);
            return;
        }
        let dbHasD = yield scrape_1.default.findOne({
            Username: db.get("username"),
            Guild: guildID,
        });
        if (dbHasD) {
            rl.question(createString_1.createString("There is already scrape data for this server\nWould you like to set *new* data or use *old*", db), (o) => {
                if (o === "new") {
                    actualScrap(rl, db, client, guildID);
                }
                else
                    main_1.main(db, rl, client);
            });
        }
        else
            actualScrap(rl, db, client, guildID);
    }));
}
exports.scrape = scrape;
