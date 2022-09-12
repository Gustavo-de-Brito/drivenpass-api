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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCardById = exports.getCardById = exports.getAllUserCards = exports.createCard = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const cardRepository = __importStar(require("../repositories/cardRepository"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function searchTitle(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialData = yield cardRepository.getCardByTitleAndUserid(title, userId);
        if (credentialData) {
            throw {
                code: 'conflict',
                message: 'já existe um cartão com esse título'
            };
        }
    });
}
function encryptData(data) {
    var _a;
    const CRYPTR_PRIVATE_KEY = (_a = process.env.CRYPTR_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    const cryptr = new cryptr_1.default(CRYPTR_PRIVATE_KEY);
    const encryptedPassword = cryptr.encrypt(data);
    return encryptedPassword;
}
function createCard(newCard, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield searchTitle(newCard.title, userId);
        const cardType = newCard.cardType.toUpperCase();
        const encryptedPassword = encryptData(newCard.password);
        const encryptedSecurityCode = encryptData(newCard.securityCode);
        yield cardRepository.insert(Object.assign(Object.assign({}, newCard), { password: encryptedPassword, securityCode: encryptedSecurityCode, cardType: cardType }), userId);
    });
}
exports.createCard = createCard;
function decryptCardData(data) {
    var _a;
    const CRYPTR_PRIVATE_KEY = (_a = process.env.CRYPTR_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    const cryptr = new cryptr_1.default(CRYPTR_PRIVATE_KEY);
    const decryptedData = cryptr.decrypt(data);
    return decryptedData;
}
function getAllUserCards(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield cardRepository.getCardsByUserId(userId);
        const decryptedCards = cards.map(card => {
            const decryptedPassword = decryptCardData(card.password);
            const decryptedSecurityCode = decryptCardData(card.securityCode);
            return Object.assign(Object.assign({}, card), { password: decryptedPassword, securityCode: decryptedSecurityCode });
        });
        return decryptedCards;
    });
}
exports.getAllUserCards = getAllUserCards;
function getCardById(cardId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.getCardById(cardId);
        if (!card) {
            throw {
                code: 'not_found',
                message: 'Você não possui um cartão com esse id'
            };
        }
        else if (card.userId !== userId) {
            throw {
                code: 'not_found',
                message: 'Você não possui um cartão com esse id'
            };
        }
        const decryptedPassword = decryptCardData(card.password);
        const decryptedSecurityCode = decryptCardData(card.securityCode);
        return Object.assign(Object.assign({}, card), { password: decryptedPassword, securityCode: decryptedSecurityCode });
    });
}
exports.getCardById = getCardById;
function deleteCardById(cardId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardRepository.getCardById(cardId);
        if (!card) {
            throw {
                code: 'not_found',
                message: 'Você não possui um cartão com esse id'
            };
        }
        else if (card.userId !== userId) {
            throw {
                code: 'not_found',
                message: 'Você não possui um cartão com esse id'
            };
        }
        yield cardRepository.deleteCard(cardId);
    });
}
exports.deleteCardById = deleteCardById;
