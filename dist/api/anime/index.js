"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const popular_1 = require("./popular");
const search_1 = require("./search");
const genreList_1 = require("./genreList");
const recentlyAdded_1 = require("./recentlyAdded");
const animeDetails_1 = require("./animeDetails");
const watch_1 = require("./watch");
const getId_1 = require("./getId");
const router = express_1.default.Router();
exports.router = router;
router.get("/", (req, res) => {
    res.json("this is the anime route");
});
router.use("/popular", popular_1.router);
router.use("/search", search_1.router);
router.use("/genreList", genreList_1.router);
router.use("/recentlyAdded", recentlyAdded_1.router);
router.use("/details", animeDetails_1.router);
router.use("/watch", watch_1.router);
router.use("/getId", getId_1.router);
