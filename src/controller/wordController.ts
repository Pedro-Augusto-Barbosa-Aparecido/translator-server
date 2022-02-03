import { Request, Response } from "express";
import prismaClient from "../database/prismaClientExport";

import { WordCreate, WordBatchCreate } from "../types/requesType";

const wordRet = {
    examples: true,
    sep_sila: true,
    translate: true,
    word: true,
    id: true

}

export class WordController {
    async createWord(request: Request, response: Response) {
        const { word, translate, examples, sep_sila }: WordCreate = request.body;

        try {
            const wordCreated = await prismaClient.words.create({
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

        } catch (err) {
            return response.status(500).json({
                err,
                msg: "Error on word create"

            });

        }
        
    }

    async batchWordCreate (req: Request, res: Response) {
        const { words }: WordBatchCreate = req.body;

        try {
            // @ts-ignore
            const wordsCreated = [];
            
            words.forEach(async (_word: WordCreate) => {
                var __word = await prismaClient.words.create({
                    data: {
                        word: _word.word,
                        translate: _word.translate,
                        sep_sila: _word.sep_sila,
                        examples: {
                            create: [
                                ..._word.examples

                            ]

                        }

                    },
                    select: wordRet

                });

                wordsCreated.push(__word);

            });

            return res.status(201).json({
                words_created: [...words],
                success: true

            });

        } catch (err) {
            return res.status(500).json({
                err,
                msg: "Error on word create"

            });

        }

    }

}
