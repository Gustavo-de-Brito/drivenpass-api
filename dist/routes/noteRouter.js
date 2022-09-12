"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const noteValidation_1 = __importDefault(require("../middlewares/noteValidation"));
const noteControllers_1 = require("../controllers/noteControllers");
const paramsIdValidation_1 = __importDefault(require("../middlewares/paramsIdValidation"));
const noteRouter = (0, express_1.Router)();
noteRouter.post('/notes', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, noteValidation_1.default, noteControllers_1.registerNewNote);
noteRouter.get('/notes', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, noteControllers_1.getNotes);
noteRouter.delete('/notes/:id', paramsIdValidation_1.default, tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, noteControllers_1.deleteNote);
exports.default = noteRouter;
