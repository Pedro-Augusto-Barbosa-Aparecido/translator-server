"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const child_process_1 = require("child_process");
const line = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
try {
    (0, child_process_1.exec)("yarn build", (err, stdout, stderr) => {
        if (err) {
            console.log(`Code: ${err.name} - ${err.code} - ${err.cmd}`);
            throw new Error(err.message);
        }
        if (stderr)
            throw new Error(stderr);
        console.log(stdout);
        line.question("Put your commit message (put the message between \"\" or \'\'): ", (answer) => {
            if (answer) {
                (0, child_process_1.exec)(`git add . && git commit -m ${answer}`, (_err, _stdout, _stderr) => {
                    if (_err) {
                        console.log(`Code: ${_err.name} - ${_err.code} - ${_err.cmd}`);
                        throw new Error(_err.message);
                    }
                    if (_stderr)
                        throw new Error(_stderr);
                    console.log(_stdout);
                    line.question("Put your branch: ", (_answer) => {
                        if (answer) {
                            (0, child_process_1.exec)(`git push -u origin ${_answer}`, (__err, __stdout, __stderr) => {
                                if (__err) {
                                    console.log(`Code: ${__err.name} - ${__err.code} - ${__err.cmd}`);
                                    throw new Error(__err.message);
                                }
                                if (__stderr)
                                    throw new Error(__stderr);
                                console.log(__stdout);
                                process.exit(0);
                            });
                        }
                    });
                });
            }
        });
    });
}
catch (err) {
    console.log(err);
}
