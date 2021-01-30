"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
var routes = [
    {
        name: "Popular animes",
        description: "Get the popular animes by page.",
        url: `/api/anime/popular/:page`,
    },
    {
        name: "Query Search",
        description: "Search for a something by page.",
        url: `/api/anime/search/q/:word/:page`,
    },
    {
        name: "List of genres",
        description: "Get the list of genres available in gogoanime.",
        url: `/api/anime/genrelist`,
    },
    {
        name: "Search by genre",
        description: "Search for animes with some genre in some page.",
        url: `/api/anime/search/g/:genre/:page`,
    },
    {
        name: "Recently added episodes",
        description: "get the recently added episodes by page.",
        url: `/api/anime/recentlyadded/:page`,
    },
    {
        name: "Details of an anime",
        description: "Get the details of an anime by its ID.",
        url: `/api/anime/details/:id`,
    },
    {
        name: "Links for an episode of an anime",
        description: "Get links for an episode by its ID and episode.",
        url: `/api/anime/watch/:id/:episode`,
    },
];
const getApiRoutes = (currentUrl) => {
    var formattedroutes = [];
    routes.forEach((route) => {
        formattedroutes.push({
            name: route.name,
            description: route.description,
            url: `${currentUrl}${route.url}`,
        });
    });
    return formattedroutes;
};
router.get("/", (req, res) => {
    const currentUrl = `${req.protocol}://${req.get("host")}`;
    res.json(getApiRoutes(currentUrl));
});
