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
exports.deleteCard = exports.getCardById = exports.getCardsByUserId = exports.insert = exports.getCardByTitleAndUserid = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function getCardByTitleAndUserid(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cardData = yield postgres_1.default.cards.findFirst({
            where: { title, userId }
        });
        return cardData;
    });
}
exports.getCardByTitleAndUserid = getCardByTitleAndUserid;
function insert(card, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.cards.create({ data: Object.assign(Object.assign({}, card), { userId }) });
    });
}
exports.insert = insert;
function getCardsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield postgres_1.default.cards.findMany({
            where: { userId }
        });
        return cards;
    });
}
exports.getCardsByUserId = getCardsByUserId;
function getCardById(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield postgres_1.default.cards.findUnique({
            where: { id: cardId }
        });
        return card;
    });
}
exports.getCardById = getCardById;
function deleteCard(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.cards.delete({ where: { id: cardId } });
    });
}
exports.deleteCard = deleteCard;
