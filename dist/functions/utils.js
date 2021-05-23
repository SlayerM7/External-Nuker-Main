"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const account = require("../models/accounts");
const savedTokens = require("../models/saveToken");
const createString_1 = require("../utils/createString");
const getTheme_1 = require("../utils/getTheme");
const logo_1 = require("../utils/logo");
const utilsLogo_1 = __importDefault(require("../utils/utilsLogo"));
const main_1 = require("./main");
const moment_1 = __importDefault(require("moment"));
const templates_1 = __importDefault(require("../models/templates"));
const scrape_1 = __importDefault(require("../models/scrape"));
const fs = __importStar(require("fs"));
const config_1 = require("./config");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
const main_2 = require("../main");
const main_3 = require("./main");
module.exports = (client, db, rl) => {
    console.clear();
    function mainFunc(client, db, rl) {
        return __awaiter(this, void 0, void 0, function* () {
            rapidTitlePromise_1.rapid("[External-Nuker] - Utility", 1).then(() => {
                setTimeout(() => {
                    process.title = "[External-Nuker] - Utility";
                }, 40);
            });
            console.clear();
            let mainColor = getTheme_1.getTheme(db);
            utilsLogo_1.default(db);
            console.log(" ");
            console.log(" ");
            rl.question(createString_1.createString("Enter option", db), (option) => __awaiter(this, void 0, void 0, function* () {
                if (![
                    "menu",
                    "1",
                    "2",
                    "3",
                    "c",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "x",
                    "z",
                    "f",
                    "h",
                    "g",
                ].includes(option)) {
                    console.log(createString_1.createString("Invalid option", db, "semi", "fail"));
                    setTimeout(() => {
                        mainFunc(client, db, rl);
                    }, 1000);
                    return;
                }
                if (option === "g") {
                    main_1.main(db, rl, client);
                    return;
                }
                if (option === "2") {
                    rl.question(createString_1.createString("Enter server ID to save scrapes to", db), (serverID) => {
                        if (!client.guilds.cache.has(serverID)) {
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            console.log(createString_1.createString("Unknown server", db, "semi", "fail"));
                            return;
                        }
                        if (!fs.existsSync("./scrapes.txt")) {
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            console.log(createString_1.createString("Create a scrapes file and add IDS serated with a new line", db, "semi", "fail"));
                            return;
                        }
                        let content = fs.readFileSync("./scrapes.txt");
                        let splitedContent = content.toString().split("\n");
                        let newContent = [];
                        // splitedContent.map((element: string) => {
                        //   newContent.push(element.toString());
                        // });
                        splitedContent.map((element) => {
                            if (element.includes("\r")) {
                                element = element.replace("\r", "");
                                newContent.push(element);
                            }
                            else {
                                newContent.push(element);
                            }
                        });
                        let IDS = newContent;
                        // content = content.toString().split("\n");
                        // let newContent = [];
                        // content.map((element: number) => {
                        //   newContent.push(element.toString());
                        // });
                        // content = newContent;
                        // let newNew = [];
                        // content.map((element) => {
                        //   if (element.includes("\r")) {
                        //     element = element.replace("\r", "");
                        //     newNew.push(element);
                        //   } else newNew.push(element);
                        // });
                        // content = newNew;
                        scrape_1.default
                            .findOneAndUpdate({ Guild: serverID, Username: db.get("username") }, { Members: [...IDS] }, { upsert: true })
                            .exec()
                            .then(() => {
                            let g = client.guilds.cache.get(serverID);
                            console.log(createString_1.createString(`Added ${IDS.length} scrapes to ${g.name} server`, db, "semi"));
                            setTimeout(() => {
                                main_1.main(db, rl, client);
                            }, 1000);
                        });
                    });
                }
                if (option === "h") {
                    rl.question(createString_1.createString("Enter guild ID", db), (gID) => __awaiter(this, void 0, void 0, function* () {
                        if (!client.guilds.cache.has(gID)) {
                            console.log(createString_1.createString("Unknown server", db, "semi", "fail"));
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            return;
                        }
                        let scrapeFind = yield scrape_1.default.findOne({
                            Username: db.get("username"),
                        });
                        if (!scrapeFind) {
                            console.log(createString_1.createString("No scrape data for that server", db, "semi", "fail"));
                            return;
                        }
                        let scrapeData = scrapeFind;
                        console.log(" ");
                        console.log(createString_1.createString(`Members: ${scrapeData.Members.length}`, db, "semi"));
                        console.log(createString_1.createString(`Roles: ${scrapeData.Roles.length}`, db, "semi"));
                        console.log(createString_1.createString(`Channels: ${scrapeData.Channels.length}`, db, "semi"));
                        console.log(" ");
                        rl.question(createString_1.createString("Type anything to continue", db), () => {
                            main_1.main(db, rl, client);
                        });
                    }));
                }
                if (option === "5") {
                    let templateData = yield templates_1.default.find();
                    let accountData = yield account.find();
                    let scrapeData = yield scrape_1.default.find();
                    let accountSize = accountData.length;
                    let templateSize = templateData.length;
                    let savedScrapes = scrapeData.length;
                    console.clear();
                    logo_1.logo(db);
                    console.log(createString_1.createString(`Total accounts: ${accountSize}`, db, "semi"));
                    console.log(createString_1.createString(`Total templates: ${templateSize}`, db, "semi"));
                    console.log(createString_1.createString(`Total scrapes: ${savedScrapes}`, db, "semi"));
                    setTimeout(() => {
                        console.log(" ");
                        rl.question(createString_1.createString("Type anything to continue", db), () => {
                            mainFunc(client, db, rl);
                        });
                    }, 500);
                }
                if (option === "6") {
                    let totalScrapes = yield scrape_1.default.find({
                        Username: db.get("username"),
                    });
                    if (!totalScrapes) {
                        console.log(createString_1.createString("No scraped were found", db, "semi", "fail"));
                        setTimeout(() => {
                            mainFunc(client, db, rl);
                        }, 500);
                        return;
                    }
                    scrape_1.default.deleteMany({ Username: db.get("username") }).exec();
                    console.log(" ");
                    console.log(createString_1.createString(`Deleted ${mainColor(totalScrapes.length)} scraped`, db, "semi"));
                    setTimeout(() => {
                        main_1.main(db, rl, client);
                    }, 1000);
                }
                if (option === "z") {
                    rl.question(createString_1.createString("Enter guild ID", db), (GuildID) => {
                        if (!client.guilds.cache.has(GuildID)) {
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            console.log(createString_1.createString("Invalid server", db, "semi", "fail"));
                            return;
                        }
                        let server = client.guilds.cache.get(GuildID);
                        server.fetchBans().then((bans) => {
                            let c = 1;
                            bans.map((ban) => {
                                let inter = setInterval(() => {
                                    if (c >= bans.size) {
                                        setTimeout(() => {
                                            main_3.main(db, rl, client);
                                        }, 500);
                                        clearInterval(inter);
                                    }
                                }, 500);
                                server.members
                                    .unban(ban.user.id)
                                    .then(() => {
                                    c++;
                                    console.log(createString_1.createString(`Unbanned ${mainColor(ban.user.id)}`, db, "semi"));
                                })
                                    .catch(() => {
                                    c++;
                                    console.log(createString_1.createString(`Failed to unban ${mainColor(ban.user.id)}`, db, "semi"));
                                });
                            });
                        });
                    });
                }
                if (option === "x") {
                    rl.question(createString_1.createString("Enter guild ID", db), (GuildID) => {
                        rl.question(createString_1.createString("Enter guild ID to save scrapes to", db), (saveG) => {
                            if (!client.guilds.cache.has(GuildID)) {
                                setTimeout(() => {
                                    mainFunc(client, db, rl);
                                }, 1000);
                                console.log(createString_1.createString("Invalid server", db, "semi", "fail"));
                                return;
                            }
                            let server = client.guilds.cache.get(GuildID);
                            server.fetchBans().then((bans) => {
                                let members = [];
                                bans.map((b) => {
                                    members.push(b.user.id);
                                });
                                scrape_1.default
                                    .findOneAndUpdate({ Username: db.get("username"), Guild: saveG }, { Members: members }, { upsert: true })
                                    .exec()
                                    .then(() => {
                                    console.log(createString_1.createString(`Scraped ${mainColor(bans.size)} users`, db, "semi"));
                                    setTimeout(() => {
                                        main_1.main(db, rl, client);
                                    }, 1000);
                                });
                            });
                        });
                    });
                }
                if (option === "7") {
                    rl.question(createString_1.createString("Enter title to spam", db), (titleName) => {
                        rl.question(createString_1.createString("Enter amount to spam", db), (amt) => {
                            amt = Number(amt);
                            if (!amt) {
                                console.log(" ");
                                console.log(createString_1.createString("Amount is not a Number", db, "semi", "fail"));
                                setTimeout(() => {
                                    mainFunc(client, db, rl);
                                }, 1000);
                                return;
                            }
                            rapidTitlePromise_1.rapid(titleName, amt).then(() => {
                                main_1.main(db, rl, client);
                            });
                        });
                    });
                }
                if (option === "1") {
                    console.log(createString_1.createString("Pinging API..", db, "semi", "w"));
                    setTimeout(() => {
                        console.clear();
                        logo_1.logo(db);
                        console.log(createString_1.createString(`Ping to discord API is: ${mainColor(client.ws.ping)}ms`, db, "semi", "w"));
                        setTimeout(() => {
                            console.log(" ");
                            rl.question(createString_1.createString("Type anything to continue", db), () => {
                                main_1.main(db, rl, client);
                            });
                        }, 800);
                    }, 500);
                }
                if (option === "4") {
                    console.clear();
                    logo_1.logo(db);
                    let accData = yield account.findOne({ Username: db.get("username") });
                    if (!accData) {
                        console.log(createString_1.createString("Failed to fetch account data", db, "semi", "fail"));
                        setTimeout(() => {
                            mainFunc(client, db, rl);
                        }, 1000);
                        return;
                    }
                    let passwordForInfo = "";
                    for (let passwordChar of accData.Password) {
                        passwordForInfo += `*`;
                    }
                    console.log(createString_1.createString(`Username: ${db.get("username")}`, db, "semi"));
                    console.log(createString_1.createString(`Password: ${passwordForInfo}`, db, "semi"));
                    console.log(createString_1.createString(`Created At: ${moment_1.default(accData.createdAt).fromNow()}`, db, "semi"));
                    setTimeout(() => {
                        console.log(" ");
                        rl.question(createString_1.createString("Type anything to continue", db), () => {
                            main_1.main(db, rl, client);
                        });
                    }, 500);
                }
                if (option === "8") {
                    config_1.config(db, rl, client);
                }
                if (option === "3") {
                    console.clear();
                    logo_1.logo(db);
                    console.log(createString_1.createString("Deleting your account is irrerevsable ", db, "semi", "fail"));
                    console.log(" ");
                    rl.question(createString_1.createString("Enter account password", db), (password) => {
                        account.findOne({ Username: db.get("username"), Password: password }, (err, data) => __awaiter(this, void 0, void 0, function* () {
                            if (!data) {
                                console.log(" ");
                                console.log(createString_1.createString("Invalid password", db, "semi", "fail"));
                                setTimeout(() => {
                                    mainFunc(client, db, rl);
                                }, 1000);
                                return;
                            }
                            templates_1.default
                                .deleteMany({ Username: db.get("username") })
                                .exec()
                                .then(() => {
                                console.log(" ");
                                console.log(createString_1.createString("Deleted templates", db, "semi"));
                                scrape_1.default
                                    .deleteMany({ Username: db.get("username") })
                                    .exec()
                                    .then(() => {
                                    console.log(createString_1.createString("Deleted scraped", db, "semi"));
                                    savedTokens
                                        .deleteMany({ Username: db.get("username") })
                                        .then(() => {
                                        console.log(createString_1.createString("Deleted saved tokens", db, "semi"));
                                        account
                                            .deleteOne({ Username: db.get("username") })
                                            .exec()
                                            .then(() => {
                                            rapidTitlePromise_1.rapid("[External-Nuker] - Account has been deleted", 1);
                                            console.log(createString_1.createString("Deleted account", db, "semi"));
                                            db.delete("username");
                                            setTimeout(() => {
                                                main_2.mainMongoose();
                                            }, 1500);
                                        });
                                    });
                                });
                            });
                        }));
                    });
                }
                if (option === "9" || option === "menu") {
                    main_1.main(db, rl, client);
                }
                if (option === "c") {
                    rl.question(createString_1.createString("Enter guild ID", db), (GuildID) => __awaiter(this, void 0, void 0, function* () {
                        if (!client.guilds.cache.has(GuildID)) {
                            console.log(createString_1.createString("Unknown server", db, "semi", "fail"));
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            return;
                        }
                        let scrapes = yield scrape_1.default.findOne({
                            Username: db.get("username"),
                            Guild: GuildID,
                        });
                        if (!scrapes) {
                            console.log(createString_1.createString("Server has no scrapes", db, "semi", "fail"));
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            return;
                        }
                        let scrapeData = scrapes;
                        let scrapeStr = "";
                        scrapeStr += "Members:\n\n";
                        scrapeData.Members.map((memberID) => {
                            scrapeStr += `\n${memberID}`;
                        });
                        scrapeStr += "\n\nRoles:\n\n";
                        scrapeData.Roles.map((roleID) => {
                            scrapeStr += `\n${roleID}`;
                        });
                        scrapeStr += "\n\nChannels:\n\n";
                        scrapeData.Channels.map((channelID) => {
                            scrapeStr += `\n${channelID}`;
                        });
                        fs.writeFile(`./scrapes_${GuildID}.txt`, scrapeStr, () => { });
                        console.log(createString_1.createString(`Exported scrapes into ${mainColor(`scrapes_${GuildID}`)} file`, db, "semi"));
                        setTimeout(() => {
                            main_1.main(db, rl, client);
                        }, 1000);
                    }));
                }
                if (option === "f") {
                    rl.question(createString_1.createString("Enter guild ID", db), (guildID) => __awaiter(this, void 0, void 0, function* () {
                        if (!client.guilds.cache.has(guildID)) {
                            console.log(createString_1.createString("Unknown server", db, "semi", "fail"));
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            return;
                        }
                        let sFind = yield scrape_1.default.findOne({
                            Username: db.get("username"),
                            Guild: guildID,
                        });
                        if (!sFind) {
                            console.log(createString_1.createString("No scrape data for the guild", db, "semi", "fail"));
                            setTimeout(() => {
                                mainFunc(client, db, rl);
                            }, 1000);
                            return;
                        }
                        scrape_1.default
                            .deleteOne({ Username: db.get("username"), Guild: guildID })
                            .exec()
                            .then(() => {
                            console.log(" ");
                            console.log(createString_1.createString("Deleted scrape", db, "semi"));
                            setTimeout(() => {
                                main_1.main(client, db, rl);
                            }, 1000);
                        });
                    }));
                }
            }));
        });
    }
    mainFunc(client, db, rl);
};
