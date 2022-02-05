import fs from "fs";

import prismaClient from "../../database/prismaClientExport";
import { csvToJson } from "../convertions";
import { WordCreate } from '../../types/requesType';

const file = fs.readFileSync("./initial_db_data/test3.csv", { encoding: "utf-8" });
const csvLines = file.split("\r\n");
const jsonConverted = csvToJson(csvLines.slice(1, csvLines.length), ["word", "translate", "sep_sila", "examples", "reference"]);

export const createDataByFile = async (obj: WordCreate) => {
    let word = await prismaClient.words.create({
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

}

jsonConverted.forEach(async (obj, index) => {
    try {
        var wordCre = await createDataByFile(obj);
        console.log(wordCre);

    } catch (err) {
        console.log(err);

    }

});
