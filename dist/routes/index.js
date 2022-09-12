"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./authRouter"));
const credentialRouter_1 = __importDefault(require("./credentialRouter"));
const noteRouter_1 = __importDefault(require("./noteRouter"));
const cardRouter_1 = __importDefault(require("./cardRouter"));
const wifiRouter_1 = __importDefault(require("./wifiRouter"));
const indexRouter = (0, express_1.Router)();
indexRouter.use(authRouter_1.default);
indexRouter.use(credentialRouter_1.default);
indexRouter.use(noteRouter_1.default);
indexRouter.use(cardRouter_1.default);
indexRouter.use(wifiRouter_1.default);
exports.default = indexRouter;
