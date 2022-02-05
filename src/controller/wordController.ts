import { Request, Response } from "express";
import prismaClient from "../database/prismaClientExport";
import { WordCreate, WordBatchCreate, Word } from '../types/requesType';

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
            const wordExist = await prismaClient.words.findFirst({ where: { word }, select: wordRet }) || null;

            if (wordExist) {
                return response.status(200).json({
                    word: wordExist,
                    success: false

                });

            }

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
            const wordsExist: WordBatchCreate = { words: [] };
            const wordsNotExist: WordBatchCreate = { words: [] };

            for (let i = 0; i < words.length; i++) {
                let word = await prismaClient.words.findFirst({ where: { word: words[i].word }, select: wordRet }) || null;

                if (word) 
                    wordsExist.words = [...wordsExist.words, { ...words[i] }];
                else 
                    wordsNotExist.words = [...wordsNotExist.words, { ...words[i] }];

            }
            
            for (let j = 0; j < wordsNotExist.words.length; j++) {
                let __word = await prismaClient.words.create({
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

        } catch (err) {
            return res.status(500).json({
                err,
                msg: "Error on word create"

            });

        }

    }

    async getWord (req: Request, res: Response) {
        const { __word, limit }: { __word: string, limit: string } = req.body;

        try {
            const words = await prismaClient.words.findMany({
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

        } catch (err) {
            return res.status(200).json({
                err,
                success: true

            });

        }

    }

}
