import "dotenv/config";
import express from "express";
import cors from "cors";

import defaultRouter from "./routes/default";
import comicRouter from "./routes/comic";
import characterRouter from "./routes/character";
import userRouter from "./routes/user";

import { PORT_SERVER } from "./constants";
import { logInfo } from "./helpers/log";

import errorHandler from "./middlewares/error";
import { connectDB } from "./config/db";

// mongoDb init
connectDB("marvel");

// express init
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use(comicRouter, characterRouter, userRouter, defaultRouter);

//Error : on ggère les erreurs de maniere global
//bien mettre l appelle après tout sinon sa marche pas
app.use(errorHandler);

app.listen(PORT_SERVER, () => logInfo(`Server running at port ${PORT_SERVER}`));
