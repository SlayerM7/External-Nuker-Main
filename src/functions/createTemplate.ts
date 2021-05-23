import templates from "../models/templates";
import { createString } from "../utils/createString";
import { logo } from "../utils/logo";
import { main } from "./main";
import { rapid } from "./rapidTitlePromise";

function createTemplate(db, rl, client) {
  rapid("[External-Nuker] - Create template", 1).then(() => {
    setTimeout(() => {
      process.title = "[External-Nuker] - Create template";
    }, 40);
  });
  console.clear();
  logo(db);
  rl.question(createString("Enter template name", db), (templateName) => {
    if (templateName === "exit" || templateName === "menu") {
      main(db, rl, client);
      return;
    }
    templates.findOne(
      { Username: db.get("username"), Name: templateName },
      async (err, data) => {
        if (data) {
          console.log(
            createString(
              "A template with that name already exists",
              db,
              "semi",
              "fail"
            )
          );
          setTimeout(() => {
            main(db, rl, client);
          }, 2000);
          return;
        }
        rl.question(createString("Enter channel names", db), (channelName) => {
          if (channelName === "exit" || channelName === "menu") {
            main(db, rl, client);
            return;
          }
          rl.question(
            createString("Enter channel amount", db),
            (channelAmount) => {
              if (channelAmount === "exit" || channelAmount === "menu") {
                main(db, rl, client);
                return;
              }
              rl.question(createString("Enter role names", db), (roleName) => {
                if (roleName === "exit" || roleName === "menu") {
                  main(db, rl, client);
                  return;
                }
                rl.question(
                  createString("Enter role amount", db),
                  (roleAmount) => {
                    if (roleAmount === "exit" || roleAmount === "menu") {
                      main(db, rl, client);
                      return;
                    }
                    rl.question(
                      createString("Enter webhook name", db),
                      (webhookName) => {
                        if (webhookName === "exit" || webhookName === "menu") {
                          main(db, rl, client);
                          return;
                        }
                        new templates({
                          Username: db.get("username"),
                          ChannelName: channelName,
                          ChannelAmount: channelAmount,
                          RoleName: roleName,
                          RoleAmount: roleAmount,
                          WebhookName: webhookName,
                          Name: templateName,
                        })
                          .save()
                          .then(() => {
                            console.log(
                              createString("Created template", db, "semi")
                            );
                            setTimeout(() => {
                              main(db, rl, client);
                            }, 2000);
                          });
                        /**
                         *    Username: String,
    ChannelName: String,
    RoleName: String,
    RoleAmount: Number,
    WebhookName: String,
    ChannelAmount: Number,
    Name: String,
                         */
                      }
                    );
                  }
                );
              });
            }
          );
        });
      }
    );
  });
}

export { createTemplate };
