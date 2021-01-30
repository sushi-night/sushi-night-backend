import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json("this is the popular route");
  });
  
  
export { router };