import express, { Request, Response, Router } from "express";
import { getAnimeDetails, search } from "animu-desu";
import { AnimeAndDate } from "animu-desu/lib/types";

const router: Router = express.Router();

router.get(
  "/:title/:totalEpisodes/:otherNames/:year",
  async (req: Request, res: Response) => {
    const { title, totalEpisodes, otherNames, year } = req.params;
    try {
      parseInt(year);
      parseInt(totalEpisodes);
    } catch (err) {
      res.json(err);
    }
    let results = [] as AnimeAndDate[];
    let idsFound = [] as string[];

    await search(decodeURIComponent(title), 1)
      .then((data) => (results = data))
      .catch((err) => res.json(err));

    await Promise.all(
      results.map(async (animeFromQuery) => {
        if (animeFromQuery.released === parseInt(year)) {
          await getAnimeDetails(animeFromQuery.id)
            .then((details) => {
              if (
                details.totalEpisodes === parseInt(totalEpisodes) ||
                details.totalEpisodes === parseInt(totalEpisodes) - 1
              ) {
                decodeURIComponent(otherNames).split(",").map((name) => {
                  if (details.otherNames.includes(name)) {
                    console.log("returnin " + details.id);
                    idsFound.push(details.id);
                  }
                });
              }
            })
            .catch((err) => res.json(err));
        }
      })
    );
      
    res.json(idsFound);
  }
);

export { router };
