"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const cardValidation_1 = __importDefault(require("../middlewares/cardValidation"));
const paramsIdValidation_1 = __importDefault(require("../middlewares/paramsIdValidation"));
const cardControllers_1 = require("../controllers/cardControllers");
const cardRouter = (0, express_1.Router)();
cardRouter.post('/cards', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, cardValidation_1.default, cardControllers_1.registerNewCard);
cardRouter.get('/cards', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, cardControllers_1.getCards);
cardRouter.delete('/cards/:id', paramsIdValidation_1.default, tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, cardControllers_1.deleteCard);
exports.default = cardRouter;
