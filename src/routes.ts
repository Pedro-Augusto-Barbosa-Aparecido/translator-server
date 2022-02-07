import { WordController } from "./controller/wordController";
import { Router } from "express";

const routes = Router();
const wordController = new WordController();

routes.post("/word/create", wordController.createWord);
routes.post("/word/create/batch", wordController.batchWordCreate);

routes.get("/word/get-contains/:limit", wordController.getWord);
routes.get("/word/get-contains/", wordController.getWord);
routes.post("/word/get-contains/:limit", wordController.getWord);
routes.post("/word/get-contains/", wordController.getWord);

export default routes;
