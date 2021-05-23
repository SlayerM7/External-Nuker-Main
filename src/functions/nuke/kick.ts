import { white } from "chalk";
import scrapeModel from "../../models/scrape";
import { createString } from "../../utils/createString";
import { getTheme } from "../../utils/getTheme";
import { wizz } from "../wizz";

module.exports = async (client, db, rl, guildID) => {
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
  interface members {
    Members: String[];
  }
  let c = 1;
  let scraper = <members>scrape;
  let mainColor = getTheme(db);
  scraper.Members.forEach((member, i) => {
    let inter = setInterval(() => {
      if (c >= scraper.Members.length) {
        setTimeout(() => {
          wizz(client, db, rl);
        }, 500);
        clearInterval(inter);
      }
    }, 500);
    server.members
      .kick(member)
      .then(() => {
        // process.title = `[External-Nuker] - Kicked ${member}`;
        console.log(nukeStr(`Kicked member ${mainColor(member)}`, "success"));
        c++;
      })
      .catch(() => {
        // process.title = `[External-Nuker] - Failed to kick ${member}`;
        c++;
        console.log(
          nukeStr(`Failed to kick member ${mainColor(member)}`, "fail")
        );
      });
  });
};
