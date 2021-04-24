import express, { Request, Response, Router } from "express";
import { search, searchByGenre } from "animu-desu";

const router: Router = express.Router();

router.get("/q/:word/:page", async (req: Request, res: Response) => {
  const { word, page } = req.params;

  try {
    const results = await search(word, parseInt(page));
    res.json(results);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
  }
});

router.get("/g/:genre/:page", async (req: Request, res: Response) => {
  const { genre, page } = req.params;
  try {
    const results = await searchByGenre(genre, parseInt(page));
    res.json(results);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
  }
});

export { router };
