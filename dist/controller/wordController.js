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
exports.WordController = void 0;
const prismaClientExport_1 = __importDefault(require("../database/prismaClientExport"));
const wordRet = {
    examples: true,
    sep_sila: true,
    translate: true,
    word: true,
    id: true
};
class WordController {
    createWord(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { word, translate, examples, sep_sila } = request.body;
            try {
                const wordExist = (yield prismaClientExport_1.default.words.findFirst({ where: { word }, select: wordRet })) || null;
                if (wordExist) {
                    return response.status(200).json({
                        word: wordExist,
                        success: false
                    });
                }
                const wordCreated = yield prismaClientExport_1.default.words.create({
                    data: {
                        word,
                        translate,
                        sep_sila,
                        examples: {
                            create: [
                                ...examples
                            ]
                        }
                    },
                    select: wordRet
                });
                return response.status(201).json({
                    word: wordCreated,
                    success: true
                });
            }
            catch (err) {
                return response.status(500).json({
                    err,
                    msg: "Error on word create"
                });
            }
        });
    }
    batchWordCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { words } = req.body;
            try {
                // @ts-ignore
                const wordsCreated = [];
                const wordsExist = { words: [] };
                const wordsNotExist = { words: [] };
                for (let i = 0; i < words.length; i++) {
                    let word = (yield prismaClientExport_1.default.words.findFirst({ where: { word: words[i].word }, select: wordRet })) || null;
                    if (word)
                        wordsExist.words = [...wordsExist.words, Object.assign({}, words[i])];
                    else
                        wordsNotExist.words = [...wordsNotExist.words, Object.assign({}, words[i])];
                }
                for (let j = 0; j < wordsNotExist.words.length; j++) {
                    let __word = yield prismaClientExport_1.default.words.create({
                        data: {
                            word: wordsNotExist.words[j].word,
                            translate: wordsNotExist.words[j].translate,
                            sep_sila: wordsNotExist.words[j].sep_sila,
                            examples: {
                                create: [
                                    ...wordsNotExist.words[j].examples
                                ]
                            }
                        },
                        select: wordRet
                    });
                    wordsCreated.push(__word);
                }
                return res.status(201).json({
                    words_created: [...wordsCreated],
                    words_equals: [...wordsExist.words],
                    success: wordsExist.words.length > 0 ? false : true
                });
            }
            catch (err) {
                return res.status(500).json({
                    err,
                    msg: "Error on word create"
                });
            }
        });
    }
    getWord(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { __word, limit } = req.body;
            try {
                const words = yield prismaClientExport_1.default.words.findMany({
                    where: {
                        word: {
                            contains: __word.toLowerCase()
                        }
                    },
                    select: wordRet,
                    take: ((parseInt(limit) === 0) || (limit === undefined) || !limit) ? undefined : parseInt(limit)
                });
                return res.status(200).json({
                    words,
                    total: words.length,
                    success: true
                });
            }
            catch (err) {
                return res.status(200).json({
                    err,
                    success: true
                });
            }
        });
    }
}
exports.WordController = WordController;
