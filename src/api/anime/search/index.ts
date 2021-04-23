import express, { Request, Response, Router } from "express";
import { search, searchByGenre } from "animu-desu";

const router: Router = express.Router();

router.get("/q/:word/:page", async (req: Request, res: Response) => {
  const { word, page } = req.params;

  if (isNaN(parseInt(page))) {
    res.status(400).json({ error: "Parameter type must be integer." });
  } else {
    await search(word, parseInt(page))
      .then((results) => res.json(results))
      .catch((err) => res.status(400).json(err));
  }
});

router.get("/g/:genre/:page", async (req: Request, res: Response) => {
  const { genre, page } = req.params;

  if (isNaN(parseInt(page))) {
    res.status(400).json({ error: "Parameter type must be integer." });
  } else {
    await searchByGenre(genre, parseInt(page))
      .then((results) => res.json(results))
      .catch((err) => res.status(400).json(err));
  }
});

export { router };
