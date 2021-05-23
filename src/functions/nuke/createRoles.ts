import { white } from "chalk";
import { createString } from "../../utils/createString";
import { getTheme } from "../../utils/getTheme";
import { wizz } from "../wizz";

module.exports = (client, db, rl, guildID) => {
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
  rl.question(createString("Enter role name", db), (rlName) => {
    rl.question(createString("Enter role amount", db), (rlAmt) => {
      rlAmt = Number(rlAmt);
      if (!rlAmt) {
        console.log(
          createString("Role amount is not a Number", db, "semi", "fail")
        );
        setTimeout(() => {
          wizz(client, db, rl);
        }, 1000);
        return;
      }
      let c = 1;
      let server = client.guilds.cache.get(guildID);
      let mainColor = getTheme(db);
      for (let i = 0; i < rlAmt; i++) {
        let inter = setInterval(() => {
          if (c >= rlAmt) {
            setTimeout(() => {
              wizz(client, db, rl);
            }, 500);
            clearInterval(inter);
          }
        }, 500);
        server.roles
          .create({
            data: {
              name: rlName,
              color: "RANDOM",
            },
            reason: "External Nuker | Made by Vxty",
          })
          .then((x) => {
            // process.title = `[External-Nuker] - Created role ${x.id}`;
            c++;
            console.log(nukeStr(`Created role ${mainColor(x.id)}`, "success"));
          })
          .catch(() => {
            // process.title = `[External-Nuker] - Failed to create role`;
            c++;
            console.log(nukeStr(`Failed to create role`, "fail"));
          });
      }
    });
  });
};
