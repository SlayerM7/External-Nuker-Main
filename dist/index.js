"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainLoad = void 0;
const saveToken = require("./models/saveToken");
const discord_js_1 = require("discord.js");
const main_1 = require("./functions/main");
const createString_1 = require("./utils/createString");
const saveNewToken_1 = require("./utils/saveNewToken");
const child_process_1 = __importDefault(require("child_process"));
const logo_1 = require("./utils/logo");
const main_2 = require("./main");
const rapidTitlePromise_1 = require("./functions/rapidTitlePromise");
function mainLoad(rl, db, username, bypass = null) {
    return __awaiter(this, void 0, void 0, function* () {
        process.on("exit", () => {
            db.delete("username");
            db.delete("curtoken");
            db.save();
        });
        process.title = "[External-Nuker] - Setup";
        console.clear();
        logo_1.logo(db);
        const client = new discord_js_1.Client();
        let tokenData = yield saveToken.findOne({ Username: username });
        if (tokenData || bypass === "bypass") {
            rl.question(createString_1.createString("Would you like to use a saved token", db), (tokenOption) => __awaiter(this, void 0, void 0, function* () {
                tokenData = tokenOption.toLowerCase();
                if (tokenOption === "y" || tokenOption === "yes") {
                    let objSaved = yield saveToken.findOne({ Username: username });
                    console.log(createString_1.createString("Starting to attempt to log into " + objSaved.clientUsername, db, "semi"));
                    client.on("ready", () => {
                        process.title = `[External-Nuker] -> Logged in as ${client.user.username}`;
                        console.clear();
                        main_1.main(db, rl, client);
                        db.set("curtoken", objSaved.Token);
                    });
                    client.login(objSaved.Token).catch(() => {
                        console.log(createString_1.createString("Failed to log in", db, "semi"));
                        setTimeout(() => {
                            main_2.mainMongoose();
                        }, 1000);
                    });
                }
                else if (tokenOption === "n" || tokenOption === "no") {
                    saveNewToken_1.saveNewToken(db, rl, username);
                }
                else
                    mainLoad(rl, db, username);
            }));
        }
        else
            saveNewToken_1.saveNewToken(db, rl, username);
    });
}
exports.mainLoad = mainLoad;
child_process_1.default.exec("mode 85,20");
console.clear();
setTimeout(() => {
    console.clear();
}, 10);
setTimeout(() => {
    console.clear();
    console.log("Loading all data");
}, 1000);
rapidTitlePromise_1.rapid(`[External-Nuker] - Loading all data`, 1).then(() => {
    main_2.mainMongoose();
});
