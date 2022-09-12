"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cardSchema_1 = __importDefault(require("../schemas/cardSchema"));
function cardValidation(req, res, next) {
    const card = req.body;
    const { error } = cardSchema_1.default.validate(card, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(422).send(errors);
    }
    next();
}
exports.default = cardValidation;
