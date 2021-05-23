"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNewToken = void 0;
const discord_js_1 = require("discord.js");
const saveToken = require("../models/saveToken");
const __1 = require("..");
const createString_1 = require("./createString");
const logo_1 = require("./logo");
let client = new discord_js_1.Client();
function saveNewToken(db, rl, username) {
    process.title = "[External-Nuker] - Add token";
    console.clear();
    logo_1.logo(db);
    rl.question(createString_1.createString("Enter token", db), (token) => {
        if (token === "main") {
            __1.mainLoad(rl, db, username);
        }
        console.log(createString_1.createString("Checking token", db, "semi"));
        client.on("ready", () => {
            console.log(createString_1.createString("Successfully logged into client", db, "semi"));
            setTimeout(() => {
                console.log(createString_1.createString("Logging out of client and saving token", db, "semi"));
                saveToken
                    .findOneAndUpdate({ Username: username }, {
                    Token: token,
                    clientUsername: client.user.username,
                }, { upsert: true })
                    .exec();
                client.destroy();
                __1.mainLoad(rl, db, username, "bypass");
            }, 2000);
        });
        client.login(token).catch(() => {
            process.title = "[External-Nuker] - Token invalid";
            console.log(createString_1.createString("The token is invalid", db, "semi"));
            setTimeout(() => {
                rl.question(createString_1.createString("Type anything to continue", db), () => {
                    __1.mainLoad(rl, db, username);
                });
            }, 500);
        });
    });
}
exports.saveNewToken = saveNewToken;
