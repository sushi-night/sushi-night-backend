import express, { Request, Response, Router } from "express";
import { getPopular } from "animu-desu";

const router: Router = express.Router();

router.get("/:page", async (req: Request, res: Response) => {
  const { page } = req.params;

  try {
    const results = await getPopular(parseInt(page));
    res.json(results);
    return;
  } catch (err) {
    return res.status(400).json(err);
  }
});

export { router };
