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
    try {
        const { title, totalEpisodes, otherNames, year } = req.params;
        let anilist = {
            otherNames: decodeURIComponent(otherNames),
            title: decodeURIComponent(title),
            year: parseInt(year),
            totalEpisodes: parseInt(totalEpisodes),
        };
        let results = [];
        let matching = [];
        let toReturn = [];
        results = yield animu_desu_1.search(title, 1);
        yield Promise.all(results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result.released === anilist.year) {
                const details = yield animu_desu_1.getAnimeDetails(result.id);
                if (details.totalEpisodes === anilist.totalEpisodes ||
                    details.totalEpisodes === anilist.totalEpisodes - 1)
                    matching.push(details);
            }
        })));
        if (matching.length > 2) {
            matching.map((m) => {
                anilist.otherNames.split(",").map((name) => {
                    if (m.otherNames.includes(name)) {
                        toReturn.push(m.id);
                    }
                });
            });
        }
        else {
            matching.map((match) => {
                toReturn.push(match.id);
            });
        }
        res.json(toReturn);
        return;
    }
    catch (err) {
        res.status(400).json(err);
        return;
    }
}));
