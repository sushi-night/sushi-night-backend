import express, { Request, Response, Router } from "express";
import { getAnimeDetails, search, AnimeAndDate } from "animu-desu";
const router: Router = express.Router();

router.get(
  "/:title/:totalEpisodes/:otherNames/:year",
  async (req: Request, res: Response) => {
    try {
      const { title, totalEpisodes, otherNames, year } = req.params;
      let anilist = {} as animeFromAnilist;

      anilist = {
        otherNames: decodeURIComponent(otherNames),
        title: decodeURIComponent(title),
        year: parseInt(year),
        totalEpisodes: parseInt(totalEpisodes),
      };

      let results = [] as AnimeAndDate[];
      let found = [] as AnimeAndDate[];
      let toReturn = [] as string[];

      results = await search(decodeURIComponent(title), 1);

      for (var result of results) {
        var matching: AnimeAndDate[] = [];
        if (result.released === anilist.year) {
          const details = await getAnimeDetails(result.id);
          if (
            details.totalEpisodes === anilist.totalEpisodes ||
            details.totalEpisodes === anilist.totalEpisodes - 1
          )
            matching.push(result);
        }
        found = matching;
      }

      if (found.length > 2) {
        for (var f of found) {
          const details = await getAnimeDetails(f.id);
          anilist.otherNames.split(",").map((name) => {
            if (details.otherNames.includes(name)) {
              toReturn.push(details.id);
            }
          });
        }
      } else {
        found.map((match) => {
          toReturn.push(match.id);
        });
      }
      res.json(toReturn);
      return;
    } catch (err) {
      res.status(400).json(err);
      return;
    }
  }
);

interface animeFromAnilist {
  title: string;
  totalEpisodes: number;
  otherNames: string;
  year: number;
}

export { router };
