import { WordCreate } from '../types/requesType';

export const csvToJson = (lines: Array<string>, header: Array<string>): Array<WordCreate> => {
    let jsonContent: Array<any> = [];

    lines.forEach((line: string, index: number) => {
        let l = line.split(";");
        jsonContent = [
            ...jsonContent,
            {
                [header[0]]: l[0],       
                [header[1]]: l[1],       
                [header[2]]: l[2],       
                [header[3]]: [{
                    [header[3].replace("s", "")]: l[3],
                    [header[4]]: l[4]

                }],       
            }
        ]

    });

    return jsonContent;

}