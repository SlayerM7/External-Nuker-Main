import { createString } from "../../utils/createString";
import scrapeModel from "../../models/scrape";
import { wizz } from "../wizz";
import { getTheme } from "../../utils/getTheme";
import { white } from "chalk";

module.exports = async (client, rl, db, guildID) => {
  function nukeStr(str, type) {
    mainColor = getTheme(db);
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
  scraper.Channels.map(async (ch, i) => {
    i = i + 1;
    // if (i === scraper.Channels.length) {
    //   setTimeout(() => {
    //     wizz(client, db, rl);
    //   }, 1000);
    // }
    let inter = setInterval(() => {
      if (c >= scraper.Channels.length) {
        setTimeout(() => {
          wizz(client, db, rl);
        }, 500);
        clearInterval(inter);
      }
    }, 500);
    let channel = server.channels.cache.get(ch);
    if (!channel) return;
    (await channel.fetch())
      .delete()
      .then((r) => {
        process.title = `[External-Nuker] - Deleted channel ${ch}`;
        c++;
        console.log(nukeStr(`Deleted channel ${mainColor(ch)}`, "success"));
      })
      .catch(() => {
        process.title = `[External-Nuker] - Failed to delete channel ${ch}`;
        c++;
        console.log(
          nukeStr(`Failed to delete channel ${mainColor(ch)}`, "fail")
        );
      });
  });
};
