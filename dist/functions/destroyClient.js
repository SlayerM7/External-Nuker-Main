"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyClient = void 0;
const main_1 = require("../main");
const createString_1 = require("../utils/createString");
const logo_1 = require("../utils/logo");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function destroyClient(client, rl, db) {
    rapidTitlePromise_1.rapid("[External-Nuker] - Logging out", 1).then(() => {
        setTimeout(() => {
            process.title = "[External-Nuker] - Logging out";
        }, 40);
    });
    console.clear();
    logo_1.logo(db);
    console.log(createString_1.createString("Logging out of client...", db, "semi"));
    client.destroy();
    setTimeout(() => {
        console.log(createString_1.createString("Successfully logged out of client", db, "semi"));
        setTimeout(() => {
            rl.question(createString_1.createString("Would you like to exit External nuker", db), (op) => {
                op = op.toLowerCase();
                if (op === "y" || op === "yes") {
                    process.title = "[External-Nuker] - Exiting";
                    console.log(createString_1.createString("Re-capturing data", db, "semi"));
                    setTimeout(() => {
                        console.log(createString_1.createString("Successfully validated data", db, "semi"));
                        setTimeout(() => {
                            console.log(createString_1.createString("Attempting to exit process", db, "semi"));
                        }, 200);
                        setTimeout(() => {
                            process.exit();
                        }, 1000);
                    }, 1000);
                }
                else
                    main_1.mainMongoose();
            });
        }, 1000);
    }, 1000);
}
exports.destroyClient = destroyClient;
