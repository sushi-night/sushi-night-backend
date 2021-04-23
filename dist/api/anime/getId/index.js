"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const animu_desu_1 = require("animu-desu");
const router = express_1.default.Router();
exports.router = router;
router.get("/:title/:totalEpisodes/:otherNames/:year", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, totalEpisodes, otherNames, year } = req.params;
    let anilist = {};
    try {
        anilist = {
            otherNames: decodeURIComponent(otherNames),
            title: decodeURIComponent(title),
            year: parseInt(year),
            totalEpisodes: parseInt(totalEpisodes),
        };
    }
    catch (err) {
        res.status(400).json(err);
    }
    let results = [];
    let found = [];
    let toReturn = [];
    yield animu_desu_1.search(decodeURIComponent(title), 1)
        .then((data) => (results = data))
        .catch((err) => res.json(err));
    yield compareYearAndTotalEpisodes(anilist, results)
        .then((matching) => matching.map((match) => {
        found.push(match);
    }))
        .catch((err) => res.status(400).json(err));
    if (found.length > 2) {
        yield Promise.all(found.map((animeFromQuery) => __awaiter(void 0, void 0, void 0, function* () {
            yield animu_desu_1.getAnimeDetails(animeFromQuery.id)
                .then((details) => {
                anilist.otherNames.split(",").map((name) => {
                    if (details.otherNames.includes(name)) {
                        toReturn.push(details.id);
                    }
                });
            })
                .catch((err) => res.status(400).json(err));
        })));
    }
    else {
        found.map((match) => {
            toReturn.push(match.id);
        });
    }
    res.json(toReturn);
}));
function compareYearAndTotalEpisodes(anilist, gogoResults) {
    return __awaiter(this, void 0, void 0, function* () {
        let matching = [];
        yield Promise.all(gogoResults.map((result) => __awaiter(this, void 0, void 0, function* () {
            if (result.released === anilist.year) {
                yield animu_desu_1.getAnimeDetails(result.id).then((details) => {
                    if (details.totalEpisodes === anilist.totalEpisodes ||
                        details.totalEpisodes === anilist.totalEpisodes - 1)
                        matching.push(result);
                });
            }
        })));
        return matching;
    });
}
