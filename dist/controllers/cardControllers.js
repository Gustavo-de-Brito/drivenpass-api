"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.getCards = exports.registerNewCard = void 0;
const cardService = __importStar(require("../services/cardService"));
function registerNewCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = req.body;
        const userData = res.locals.userData;
        try {
            yield cardService.createCard(card, userData.id);
            res.sendStatus(201);
        }
        catch (err) {
            if (err.code === 'conflict')
                return res.status(409).send(err.message);
            console.log(err);
            res.sendStatus(500);
        }
    });
}
exports.registerNewCard = registerNewCard;
function getCards(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardId = Number(req.query.id);
        const userData = res.locals.userData;
        try {
            if (isNaN(cardId)) {
                const cards = yield cardService.getAllUserCards(userData.id);
                res.status(200).send(cards);
            }
            else {
                const card = yield cardService.getCardById(cardId, userData.id);
                res.status(200).send(card);
            }
        }
        catch (err) {
            if (err.code === 'not_found')
                return res.status(404).send(err.message);
            res.sendStatus(500);
        }
    });
}
exports.getCards = getCards;
function deleteCard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardId = parseInt(req.params.id);
        const userData = res.locals.userData;
        try {
            yield cardService.deleteCardById(cardId, userData.id);
            res.sendStatus(200);
        }
        catch (err) {
            if (err.code === 'not_found')
                return res.status(404).send(err.message);
            res.sendStatus(500);
        }
    });
}
exports.deleteCard = deleteCard;