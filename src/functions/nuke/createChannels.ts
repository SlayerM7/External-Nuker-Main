import { white } from "chalk";
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
  rl.question(createString("Enter channel name", db), (chName) => {
    rl.question(createString("Enter channel amount", db), async (chAmt) => {
      chAmt = Number(chAmt);
      if (!chAmt) {
        console.log(
          createString("Channel amount is not a Number", db, "semi", "fail")
        );
        setTimeout(() => {
          wizz(client, db, rl);
        }, 1000);
        return;
      }
      let c = 1;
      let server = client.guilds.cache.get(guildID);
      let mainColor = getTheme(db);
      for (let i = 0; i < chAmt; i++) {
        let inter = setInterval(() => {
          if (c >= chAmt) {
            setTimeout(() => {
              wizz(client, db, rl);
            }, 500);
            clearInterval(inter);
          }
        }, 500);
        server.channels
          .create(chName, {
            topic: "Enternal Nuker | Made By Slayer",
          })
          .then((x) => {
            // process.title = `[External-Nuker] Created channel ${x.id}`;
            c++;
            console.log(
              nukeStr(`Created channel ${mainColor(x.id)}`, "success")
            );
          })
          .catch(() => {
            // process.title = `[External-Nuker] Failed to create channel`;
            c++;
            console.log(nukeStr(`Failed to create channel`, "fail"));
          });
      }
    });
  });
};
