"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const home_1 = require("./home");
const anime_1 = require("./anime");
const router = express_1.default.Router();
exports.router = router;
router.use("/", home_1.router);
router.use("/anime", anime_1.router);
