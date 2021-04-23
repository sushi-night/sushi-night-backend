require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import { router } from "./api";

const app: Application = express();

app.use(cors());

app.use("/api", router);

app.listen(process.env.PORT);
//usage : import { app } from "./index.ts"
// app.listen(port);