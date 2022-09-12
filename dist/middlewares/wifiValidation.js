"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wifiSchema_1 = __importDefault(require("../schemas/wifiSchema"));
function wifiValidation(req, res, next) {
    const wifi = req.body;
    const { error } = wifiSchema_1.default.validate(wifi, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(422).send(errors);
    }
    next();
}
exports.default = wifiValidation;
