const account = require("../models/accounts");
const savedTokens = require("../models/saveToken");
import { createString } from "../utils/createString";
import { getTheme } from "../utils/getTheme";
import { logo } from "../utils/logo";
import utilsLogo from "../utils/utilsLogo";
import { main } from "./main";
import moment from "moment";
import templates from "../models/templates";
import scrape from "../models/scrape";
import * as fs from "fs";
import { config } from "./config";
import { rapid } from "./rapidTitlePromise";
import { mainMongoose } from "../main";
import { main as wizz } from "./main";

module.exports = (client, db, rl) => {
  console.clear();
  async function mainFunc(client, db, rl) {
    rapid("[External-Nuker] - Utility", 1).then(() => {
      setTimeout(() => {
        process.title = "[External-Nuker] - Utility";
      }, 40);
    });
    console.clear();
    let mainColor = getTheme(db);
    utilsLogo(db);
    console.log(" ");
    console.log(" ");
    rl.question(createString("Enter option", db), async (option) => {
      if (
        ![
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
        ].includes(option)
      ) {
        console.log(createString("Invalid option", db, "semi", "fail"));
        setTimeout(() => {
          mainFunc(client, db, rl);
        }, 1000);
        return;
      }
      if (option === "g") {
        main(db, rl, client);
        return;
      }
      if (option === "2") {
        rl.question(
          createString("Enter server ID to save scrapes to", db),
          (serverID) => {
            if (!client.guilds.cache.has(serverID)) {
              setTimeout(() => {
                mainFunc(client, db, rl);
              }, 1000);
              console.log(createString("Unknown server", db, "semi", "fail"));
              return;
            }
            if (!fs.existsSync("./scrapes.txt")) {
              setTimeout(() => {
                mainFunc(client, db, rl);
              }, 1000);
              console.log(
                createString(
                  "Create a scrapes file and add IDS serated with a new line",
                  db,
                  "semi",
                  "fail"
                )
              );
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
              } else {
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
            scrape
              .findOneAndUpdate(
                { Guild: serverID, Username: db.get("username") },
                { Members: [...IDS] },
                { upsert: true }
              )
              .exec()
              .then(() => {
                let g = client.guilds.cache.get(serverID);
                console.log(
                  createString(
                    `Added ${IDS.length} scrapes to ${g.name} server`,
                    db,
                    "semi"
                  )
                );
                setTimeout(() => {
                  main(db, rl, client);
                }, 1000);
              });
          }
        );
      }
      if (option === "h") {
        rl.question(createString("Enter guild ID", db), async (gID) => {
          if (!client.guilds.cache.has(gID)) {
            console.log(createString("Unknown server", db, "semi", "fail"));
            setTimeout(() => {
              mainFunc(client, db, rl);
            }, 1000);
            return;
          }
          let scrapeFind = <unknown>await scrape.findOne({
            Username: db.get("username"),
          });
          if (!scrapeFind) {
            console.log(
              createString("No scrape data for that server", db, "semi", "fail")
            );
            return;
          }
          interface scrapeInter {
            Roles: Array<string>;
            Channels: Array<string>;
            Members: Array<string>;
          }
          let scrapeData = <scrapeInter>scrapeFind;
          console.log(" ");
          console.log(
            createString(`Members: ${scrapeData.Members.length}`, db, "semi")
          );
          console.log(
            createString(`Roles: ${scrapeData.Roles.length}`, db, "semi")
          );
          console.log(
            createString(`Channels: ${scrapeData.Channels.length}`, db, "semi")
          );
          console.log(" ");
          rl.question(createString("Type anything to continue", db), () => {
            main(db, rl, client);
          });
        });
      }
      if (option === "5") {
        let templateData = await templates.find();
        let accountData = await account.find();
        let scrapeData = await scrape.find();

        let accountSize = accountData.length;
        let templateSize = templateData.length;
        let savedScrapes = scrapeData.length;

        console.clear();
        logo(db);
        console.log(createString(`Total accounts: ${accountSize}`, db, "semi"));
        console.log(
          createString(`Total templates: ${templateSize}`, db, "semi")
        );
        console.log(createString(`Total scrapes: ${savedScrapes}`, db, "semi"));

        setTimeout(() => {
          console.log(" ");
          rl.question(createString("Type anything to continue", db), () => {
            mainFunc(client, db, rl);
          });
        }, 500);
      }
      if (option === "6") {
        let totalScrapes = await scrape.find({
          Username: db.get("username"),
        });
        if (!totalScrapes) {
          console.log(
            createString("No scraped were found", db, "semi", "fail")
          );
          setTimeout(() => {
            mainFunc(client, db, rl);
          }, 500);
          return;
        }
        scrape.deleteMany({ Username: db.get("username") }).exec();
        console.log(" ");
        console.log(
          createString(
            `Deleted ${mainColor(totalScrapes.length)} scraped`,
            db,
            "semi"
          )
        );
        setTimeout(() => {
          main(db, rl, client);
        }, 1000);
      }
      if (option === "z") {
        rl.question(createString("Enter guild ID", db), (GuildID) => {
          if (!client.guilds.cache.has(GuildID)) {
            setTimeout(() => {
              mainFunc(client, db, rl);
            }, 1000);
            console.log(createString("Invalid server", db, "semi", "fail"));
            return;
          }
          let server = client.guilds.cache.get(GuildID);
          server.fetchBans().then((bans) => {
            let c = 1;
            bans.map((ban) => {
              let inter = setInterval(() => {
                if (c >= bans.size) {
                  setTimeout(() => {
                    wizz(db, rl, client);
                  }, 500);
                  clearInterval(inter);
                }
              }, 500);
              server.members
                .unban(ban.user.id)
                .then(() => {
                  c++;
                  console.log(
                    createString(
                      `Unbanned ${mainColor(ban.user.id)}`,
                      db,
                      "semi"
                    )
                  );
                })
                .catch(() => {
                  c++;
                  console.log(
                    createString(
                      `Failed to unban ${mainColor(ban.user.id)}`,
                      db,
                      "semi"
                    )
                  );
                });
            });
          });
        });
      }
      if (option === "x") {
        rl.question(createString("Enter guild ID", db), (GuildID) => {
          rl.question(
            createString("Enter guild ID to save scrapes to", db),
            (saveG) => {
              if (!client.guilds.cache.has(GuildID)) {
                setTimeout(() => {
                  mainFunc(client, db, rl);
                }, 1000);
                console.log(createString("Invalid server", db, "semi", "fail"));
                return;
              }
              let server = client.guilds.cache.get(GuildID);
              server.fetchBans().then((bans) => {
                let members = [];
                bans.map((b) => {
                  members.push(b.user.id);
                });
                scrape
                  .findOneAndUpdate(
                    { Username: db.get("username"), Guild: saveG },
                    { Members: members },
                    { upsert: true }
                  )
                  .exec()
                  .then(() => {
                    console.log(
                      createString(
                        `Scraped ${mainColor(bans.size)} users`,
                        db,
                        "semi"
                      )
                    );
                    setTimeout(() => {
                      main(db, rl, client);
                    }, 1000);
                  });
              });
            }
          );
        });
      }
      if (option === "7") {
        rl.question(createString("Enter title to spam", db), (titleName) => {
          rl.question(createString("Enter amount to spam", db), (amt) => {
            amt = Number(amt);
            if (!amt) {
              console.log(" ");
              console.log(
                createString("Amount is not a Number", db, "semi", "fail")
              );
              setTimeout(() => {
                mainFunc(client, db, rl);
              }, 1000);
              return;
            }
            rapid(titleName, amt).then(() => {
              main(db, rl, client);
            });
          });
        });
      }
      if (option === "1") {
        console.log(createString("Pinging API..", db, "semi", "w"));
        setTimeout(() => {
          console.clear();
          logo(db);
          console.log(
            createString(
              `Ping to discord API is: ${mainColor(client.ws.ping)}ms`,
              db,
              "semi",
              "w"
            )
          );
          setTimeout(() => {
            console.log(" ");
            rl.question(createString("Type anything to continue", db), () => {
              main(db, rl, client);
            });
          }, 800);
        }, 500);
      }
      if (option === "4") {
        console.clear();
        logo(db);
        let accData = await account.findOne({ Username: db.get("username") });
        if (!accData) {
          console.log(
            createString("Failed to fetch account data", db, "semi", "fail")
          );
          setTimeout(() => {
            mainFunc(client, db, rl);
          }, 1000);
          return;
        }
        let passwordForInfo = "";
        for (let passwordChar of accData.Password) {
          passwordForInfo += `*`;
        }

        console.log(
          createString(`Username: ${db.get("username")}`, db, "semi")
        );
        console.log(createString(`Password: ${passwordForInfo}`, db, "semi"));
        console.log(
          createString(
            `Created At: ${moment(accData.createdAt).fromNow()}`,
            db,
            "semi"
          )
        );
        setTimeout(() => {
          console.log(" ");
          rl.question(createString("Type anything to continue", db), () => {
            main(db, rl, client);
          });
        }, 500);
      }
      if (option === "8") {
        config(db, rl, client);
      }
      if (option === "3") {
        console.clear();
        logo(db);
        console.log(
          createString(
            "Deleting your account is irrerevsable ",
            db,
            "semi",
            "fail"
          )
        );
        console.log(" ");
        rl.question(createString("Enter account password", db), (password) => {
          account.findOne(
            { Username: db.get("username"), Password: password },
            async (err, data) => {
              if (!data) {
                console.log(" ");
                console.log(
                  createString("Invalid password", db, "semi", "fail")
                );
                setTimeout(() => {
                  mainFunc(client, db, rl);
                }, 1000);
                return;
              }
              templates
                .deleteMany({ Username: db.get("username") })
                .exec()
                .then(() => {
                  console.log(" ");
                  console.log(createString("Deleted templates", db, "semi"));
                  scrape
                    .deleteMany({ Username: db.get("username") })
                    .exec()
                    .then(() => {
                      console.log(createString("Deleted scraped", db, "semi"));
                      savedTokens
                        .deleteMany({ Username: db.get("username") })
                        .then(() => {
                          console.log(
                            createString("Deleted saved tokens", db, "semi")
                          );
                          account
                            .deleteOne({ Username: db.get("username") })
                            .exec()
                            .then(() => {
                              rapid(
                                "[External-Nuker] - Account has been deleted",
                                1
                              );
                              console.log(
                                createString("Deleted account", db, "semi")
                              );
                              db.delete("username");
                              setTimeout(() => {
                                mainMongoose();
                              }, 1500);
                            });
                        });
                    });
                });
            }
          );
        });
      }
      if (option === "9" || option === "menu") {
        main(db, rl, client);
      }
      if (option === "c") {
        rl.question(createString("Enter guild ID", db), async (GuildID) => {
          if (!client.guilds.cache.has(GuildID)) {
            console.log(createString("Unknown server", db, "semi", "fail"));
            setTimeout(() => {
              mainFunc(client, db, rl);
            }, 1000);
            return;
          }
          let scrapes = <unknown>await scrape.findOne({
            Username: db.get("username"),
            Guild: GuildID,
          });
          if (!scrapes) {
            console.log(
              createString("Server has no scrapes", db, "semi", "fail")
            );
            setTimeout(() => {
              mainFunc(client, db, rl);
            }, 1000);
            return;
          }
          interface scrapeInter {
            Roles: Array<string>;
            Channels: Array<string>;
            Members: Array<string>;
          }
          let scrapeData = <scrapeInter>scrapes;
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
          fs.writeFile(`./scrapes_${GuildID}.txt`, scrapeStr, () => {});
          console.log(
            createString(
              `Exported scrapes into ${mainColor(`scrapes_${GuildID}`)} file`,
              db,
              "semi"
            )
          );
          setTimeout(() => {
            main(db, rl, client);
          }, 1000);
        });
      }
      if (option === "f") {
        rl.question(createString("Enter guild ID", db), async (guildID) => {
          if (!client.guilds.cache.has(guildID)) {
            console.log(createString("Unknown server", db, "semi", "fail"));
            setTimeout(() => {
              mainFunc(client, db, rl);
            }, 1000);
            return;
          }
          let sFind = await scrape.findOne({
            Username: db.get("username"),
            Guild: guildID,
          });
          if (!sFind) {
            console.log(
              createString("No scrape data for the guild", db, "semi", "fail")
            );
            setTimeout(() => {
              mainFunc(client, db, rl);
            }, 1000);
            return;
          }
          scrape
            .deleteOne({ Username: db.get("username"), Guild: guildID })
            .exec()
            .then(() => {
              console.log(" ");
              console.log(createString("Deleted scrape", db, "semi"));
              setTimeout(() => {
                main(client, db, rl);
              }, 1000);
            });
        });
      }
    });
  }
  mainFunc(client, db, rl);
};
