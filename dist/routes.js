"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wordController_1 = require("./controller/wordController");
const express_1 = require("express");
const routes = (0, express_1.Router)();
const wordController = new wordController_1.WordController();
routes.post("/word/create", wordController.createWord);
routes.post("/word/create/batch", wordController.batchWordCreate);
routes.get("/word/get-contains/:limit", wordController.getWord);
routes.get("/word/get-contains/", wordController.getWord);
exports.default = routes;
