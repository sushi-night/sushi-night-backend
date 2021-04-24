import express, { Request, Response, Router } from "express";
import { getEpisodeLinks } from "animu-desu";

const router: Router = express.Router();

router.get("/:id/:episode", async (req: Request, res: Response) => {
  const { id, episode } = req.params;

  try {
    const results = await getEpisodeLinks(id, parseInt(episode));
    res.json(results);
    return;
  } catch (err) {
    return res.status(400).json(err);
  }
});

export { router };
