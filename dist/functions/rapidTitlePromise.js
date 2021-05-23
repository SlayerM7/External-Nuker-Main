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
exports.rapid = void 0;
const sleep_1 = __importDefault(require("../utils/sleep"));
function rapid(str, conditionNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = 0;
        function goRapid() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    count = count + 1;
                    let array = str.split("");
                    str = array[0];
                    array.shift();
                    for (let ix in array) {
                        yield sleep_1.default(40);
                        let index = Number(ix);
                        str += `${array[index]}`;
                        process.title = str;
                        if (index + 1 === array.length && count <= array.length) {
                            process.title = "";
                            if (count !== conditionNumber)
                                goRapid();
                            else
                                resolve(void 0);
                        }
                    }
                }));
            });
        }
        return goRapid();
    });
}
exports.rapid = rapid;
