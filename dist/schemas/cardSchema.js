"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const securityCodeRegex = /^[0-9]{3}$/;
const dateRegex = /^[0-9]{2}\/[0-9]{2}$/;
const cardSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    cardNumber: joi_1.default.string().creditCard().required(),
    ownerName: joi_1.default.string().required(),
    securityCode: joi_1.default.string().regex(securityCodeRegex).required(),
    expirationDate: joi_1.default.string().regex(dateRegex).required(),
    password: joi_1.default.string().required(),
    isVirtual: joi_1.default.boolean().required(),
    cardType: joi_1.default.string()
        .valid('credito', 'debito', 'credito-debito').required()
});
exports.default = cardSchema;
