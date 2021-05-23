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
const chalk_1 = require("chalk");
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
    rl.question(createString_1.createString("Enter channel name", db), (chName) => {
        rl.question(createString_1.createString("Enter channel amount", db), (chAmt) => __awaiter(void 0, void 0, void 0, function* () {
            chAmt = Number(chAmt);
            if (!chAmt) {
                console.log(createString_1.createString("Channel amount is not a Number", db, "semi", "fail"));
                setTimeout(() => {
                    wizz_1.wizz(client, db, rl);
                }, 1000);
                return;
            }
            let c = 1;
            let server = client.guilds.cache.get(guildID);
            let mainColor = getTheme_1.getTheme(db);
            for (let i = 0; i < chAmt; i++) {
                let inter = setInterval(() => {
                    if (c >= chAmt) {
                        setTimeout(() => {
                            wizz_1.wizz(client, db, rl);
                        }, 500);
                        clearInterval(inter);
                    }
                }, 500);
                server.channels
                    .create(chName, {
                    topic: "Enternal Nuker | Made By Slayer",
                })
                    .then((x) => {
                    // process.title = `[External-Nuker] Created channel ${x.id}`;
                    c++;
                    console.log(nukeStr(`Created channel ${mainColor(x.id)}`, "success"));
                })
                    .catch(() => {
                    // process.title = `[External-Nuker] Failed to create channel`;
                    c++;
                    console.log(nukeStr(`Failed to create channel`, "fail"));
                });
            }
        }));
    });
});
