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
exports.deleteTemplate = void 0;
const createString_1 = require("../utils/createString");
const logo_1 = require("../utils/logo");
const main_1 = require("./main");
const templates_1 = __importDefault(require("../models/templates"));
const rapidTitlePromise_1 = require("./rapidTitlePromise");
function deleteTemplate(db, rl, client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.clear();
        rapidTitlePromise_1.rapid("[External-Nuker] - Delete Template", 1).then(() => {
            setTimeout(() => {
                process.title = "[External-Nuker] - Delete Template";
            }, 40);
        });
        logo_1.logo(db);
        let tems = yield templates_1.default.find({ Username: db.get("username") });
        let arr = [];
        tems.map((tem) => {
            arr.push(tem.Name);
        });
        console.log(createString_1.createString("Templates:", db, "semi"));
        console.log(arr.join("\n"));
        console.log(" ");
        rl.question(createString_1.createString("Enter template name", db), (name) => {
            if (name === "menu") {
                main_1.main(db, rl, client);
                return;
            }
            if (!arr.includes(name)) {
                console.log(createString_1.createString("Invalid template", db, "semi", "fail"));
                setTimeout(() => {
                    deleteTemplate(db, rl, client);
                }, 2000);
                return;
            }
            templates_1.default
                .deleteOne({ Username: db.get("username"), Name: name })
                .exec()
                .then(() => {
                console.log(createString_1.createString("Deleted template", db, "semi"));
                console.log(" ");
                rl.question(createString_1.createString("Type anything to continue", db), () => {
                    main_1.main(db, rl, client);
                });
            });
        });
    });
}
exports.deleteTemplate = deleteTemplate;
