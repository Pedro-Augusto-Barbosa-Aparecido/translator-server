"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvToJson = void 0;
const csvToJson = (lines, header) => {
    let jsonContent = [];
    lines.forEach((line, index) => {
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
        ];
    });
    return jsonContent;
};
exports.csvToJson = csvToJson;
