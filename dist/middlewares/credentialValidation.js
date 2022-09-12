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
const credentialSchema_1 = __importDefault(require("../schemas/credentialSchema"));
function credentialValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCredential = req.body;
        const { error } = credentialSchema_1.default.validate(newCredential, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(422).send(errors);
        }
        next();
    });
}
exports.default = credentialValidation;
