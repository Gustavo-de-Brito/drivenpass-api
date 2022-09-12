"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const noteSchema_1 = __importDefault(require("../schemas/noteSchema"));
function noteValidation(req, res, next) {
    const newNote = req.body;
    const { error } = noteSchema_1.default.validate(newNote, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(422).send(errors);
    }
    next();
}
exports.default = noteValidation;