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
exports.createTemplate = void 0;
const templates_1 = __importDefault(require("../models/templates"));
const createString_1 = require("../utils/createString");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function createTemplate(db, rl, client) {
    rapidTitlePromise_1.rapid("[External-Nuker] - Create template", 1).then(() => {
        setTimeout(() => {
            process.title = "[External-Nuker] - Create template";
        }, 40);
    });
    console.clear();
    logo_1.logo(db);
    rl.question(createString_1.createString("Enter template name", db), (templateName) => {
        if (templateName === "exit" || templateName === "menu") {
            main_1.main(db, rl, client);
            return;
        }
        templates_1.default.findOne({ Username: db.get("username"), Name: templateName }, (err, data) => __awaiter(this, void 0, void 0, function* () {
            if (data) {
                console.log(createString_1.createString("A template with that name already exists", db, "semi", "fail"));
                setTimeout(() => {
                    main_1.main(db, rl, client);
                }, 2000);
                return;
            }
            rl.question(createString_1.createString("Enter channel names", db), (channelName) => {
                if (channelName === "exit" || channelName === "menu") {
                    main_1.main(db, rl, client);
                    return;
                }
                rl.question(createString_1.createString("Enter channel amount", db), (channelAmount) => {
                    if (channelAmount === "exit" || channelAmount === "menu") {
                        main_1.main(db, rl, client);
                        return;
                    }
                    rl.question(createString_1.createString("Enter role names", db), (roleName) => {
                        if (roleName === "exit" || roleName === "menu") {
                            main_1.main(db, rl, client);
                            return;
                        }
                        rl.question(createString_1.createString("Enter role amount", db), (roleAmount) => {
                            if (roleAmount === "exit" || roleAmount === "menu") {
                                main_1.main(db, rl, client);
                                return;
                            }
                            rl.question(createString_1.createString("Enter webhook name", db), (webhookName) => {
                                if (webhookName === "exit" || webhookName === "menu") {
                                    main_1.main(db, rl, client);
                                    return;
                                }
                                new templates_1.default({
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
                                    console.log(createString_1.createString("Created template", db, "semi"));
                                    setTimeout(() => {
                                        main_1.main(db, rl, client);
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
                            });
                        });
                    });
                });
            });
        }));
    });
}
exports.createTemplate = createTemplate;
