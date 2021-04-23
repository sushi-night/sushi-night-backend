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
router.get("/:id/:episode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, episode } = req.params;
    if (isNaN(parseInt(episode))) {
        res.status(404).json({ error: "Episode must be integer." });
    }
    else {
        yield animu_desu_1.getEpisodeLinks(id, parseInt(episode))
            .then((links) => res.json(links))
            .catch((err) => res.status(404).json(err));
    }
}));
