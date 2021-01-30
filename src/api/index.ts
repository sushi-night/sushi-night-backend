import express,{Request,Response, Router} from "express";
import { router as home } from "./home"


const router: Router = express.Router();

router.use("/home", home);

export {router};