require("dotenv").config();
import express, {Application} from "express";
import cors from "cors";
import { router } from "./api";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app: Application = express();

app.use(cors());

app.use('/api',router);

app.listen(port, () => console.log(`express is listening in port: ${port}`));