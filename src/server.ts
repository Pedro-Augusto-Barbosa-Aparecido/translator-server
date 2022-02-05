import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}!!`);

});
