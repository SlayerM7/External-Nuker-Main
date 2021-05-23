"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const createString_1 = require("../../utils/createString");
const getTheme_1 = require("../../utils/getTheme");
const wizz_1 = require("../wizz");
module.exports = (client, db, rl, guildID) => {
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
    rl.question(createString_1.createString("Enter role name", db), (rlName) => {
        rl.question(createString_1.createString("Enter role amount", db), (rlAmt) => {
            rlAmt = Number(rlAmt);
            if (!rlAmt) {
                console.log(createString_1.createString("Role amount is not a Number", db, "semi", "fail"));
                setTimeout(() => {
                    wizz_1.wizz(client, db, rl);
                }, 1000);
                return;
            }
            let c = 1;
            let server = client.guilds.cache.get(guildID);
            let mainColor = getTheme_1.getTheme(db);
            for (let i = 0; i < rlAmt; i++) {
                let inter = setInterval(() => {
                    if (c >= rlAmt) {
                        setTimeout(() => {
                            wizz_1.wizz(client, db, rl);
                        }, 500);
                        clearInterval(inter);
                    }
                }, 500);
                server.roles
                    .create({
                    data: {
                        name: rlName,
                        color: "RANDOM",
                    },
                    reason: "External Nuker | Made by Vxty",
                })
                    .then((x) => {
                    // process.title = `[External-Nuker] - Created role ${x.id}`;
                    c++;
                    console.log(nukeStr(`Created role ${mainColor(x.id)}`, "success"));
                })
                    .catch(() => {
                    // process.title = `[External-Nuker] - Failed to create role`;
                    c++;
                    console.log(nukeStr(`Failed to create role`, "fail"));
                });
            }
        });
    });
};
