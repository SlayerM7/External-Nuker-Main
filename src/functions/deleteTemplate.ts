import { createString } from "../utils/createString";
import { logo } from "../utils/logo";
import { main } from "./main";

import temp from "../models/templates";
import { rapid } from "./rapidTitlePromise";

async function deleteTemplate(db, rl, client) {
  console.clear();
  rapid("[External-Nuker] - Delete Template", 1).then(() => {
    setTimeout(() => {
      process.title = "[External-Nuker] - Delete Template";
    }, 40);
  });
  logo(db);
  let tems = await temp.find({ Username: db.get("username") });
  let arr = [];
  tems.map(<x>(tem) => {
    arr.push(tem.Name);
  });
  console.log(createString("Templates:", db, "semi"));
  console.log(arr.join("\n"));
  console.log(" ");
  rl.question(createString("Enter template name", db), (name) => {
    if (name === "menu") {
      main(db, rl, client);
      return;
    }
    if (!arr.includes(name)) {
      console.log(createString("Invalid template", db, "semi", "fail"));
      setTimeout(() => {
        deleteTemplate(db, rl, client);
      }, 2000);
      return;
    }
    temp
      .deleteOne({ Username: db.get("username"), Name: name })
      .exec()
      .then(() => {
        console.log(createString("Deleted template", db, "semi"));
        console.log(" ");
        rl.question(createString("Type anything to continue", db), () => {
          main(db, rl, client);
        });
      });
  });
}

export { deleteTemplate };
