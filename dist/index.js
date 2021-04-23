"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = require("./api");
const app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.use("/api", api_1.router);
//usage : import { app } from "./index.ts"
// app.listen(port);
