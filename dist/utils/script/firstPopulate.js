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
exports.createDataByFile = void 0;
const fs_1 = __importDefault(require("fs"));
const prismaClientExport_1 = __importDefault(require("../../database/prismaClientExport"));
const convertions_1 = require("../convertions");
const file = fs_1.default.readFileSync("./initial_db_data/test3.csv", { encoding: "utf-8" });
const csvLines = file.split("\r\n");
const jsonConverted = (0, convertions_1.csvToJson)(csvLines.slice(1, csvLines.length), ["word", "translate", "sep_sila", "examples", "reference"]);
const createDataByFile = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    let word = yield prismaClientExport_1.default.words.create({
        data: {
            word: obj.word,
            translate: obj.translate,
            sep_sila: obj.sep_sila,
            examples: {
                create: [
                    ...obj.examples
                ]
            }
        }
    });
    return word;
});
exports.createDataByFile = createDataByFile;
jsonConverted.forEach((obj, index) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var wordCre = yield (0, exports.createDataByFile)(obj);
        console.log(wordCre);
    }
    catch (err) {
        console.log(err);
    }
}));
