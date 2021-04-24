import express, { Request, Response, Router } from "express";
import { getAnimeDetails } from "animu-desu";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const details = await getAnimeDetails(id);
    res.json(details);
    return;
  } catch (err) {
    res.status(400).json(err);
    return;
  }
});

export { router };
