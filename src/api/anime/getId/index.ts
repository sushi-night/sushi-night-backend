import express, { Request, Response, Router } from "express";
import {
  getAnimeDetails,
  search,
  AnimeAndDate,
  AnimeDetails,
} from "animu-desu";
const router: Router = express.Router();

router.get(
  "/:title/:totalEpisodes/:otherNames/:year",
  async (req: Request, res: Response) => {
    try {
      const { title, totalEpisodes, otherNames, year } = req.params;
      let anilist = {
        otherNames: decodeURIComponent(otherNames),
        title: decodeURIComponent(title),
        year: parseInt(year),
        totalEpisodes: parseInt(totalEpisodes),
      } as animeFromAnilist;

      let results = [] as AnimeAndDate[];
      let matching = [] as AnimeDetails[];
      let toReturn = [] as string[];

      results = await search(title, 1);

      await Promise.all(
        results.map(async (result) => {
          if (result.released === anilist.year) {
            const details = await getAnimeDetails(result.id);
            if (
              details.totalEpisodes === anilist.totalEpisodes ||
              details.totalEpisodes === anilist.totalEpisodes - 1
            )
              matching.push(details);
          }
        })
      );

      if (matching.length > 2) {
        matching.map((m) => {
          anilist.otherNames.split(",").map((name) => {
            if (m.otherNames.includes(name)) {
              toReturn.push(m.id);
            }
          });
        });
      } else {
        matching.map((match) => {
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