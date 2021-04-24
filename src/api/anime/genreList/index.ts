import express, { Request, Response, Router } from "express";
import { getGenreList } from "animu-desu";

const router: Router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    const genreList = await getGenreList();
    res.json(genreList);
    return;
  } catch (err) {
    return res.status(400).json(err);
  }
});

export { router };
