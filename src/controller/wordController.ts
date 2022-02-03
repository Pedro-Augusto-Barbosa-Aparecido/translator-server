import { Request, Response } from "express";
import prismaClient from "../database/prismaClientExport";

import { WordCreate, ExampleCreate } from "../types/requesType";

export class WordController {
    async createWord(request: Request, response: Response) {
        const { word, translate,  }: WordCreate = request.body;

        const wordCreated = await prismaClient.words.create({
            data: {
                word,
                translate,
                examples: {
                    create: [
                        
                    ]

                }

            }

        });
        
    }

}
