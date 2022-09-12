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
exports.verifyTokenDatabase = exports.tokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authService = __importStar(require("../services/authService"));
dotenv_1.default.config();
function tokenValidation(req, res, next) {
    var _a;
    const authorization = req.headers.authorization;
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send('Essa rota precisa de um token de acesso');
    }
    try {
        const JWT_PRIVATE_KEY = (_a = process.env.JWT_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
        const indentificationData = jsonwebtoken_1.default.verify(token, JWT_PRIVATE_KEY);
        res.locals.indentificationData = indentificationData;
        next();
    }
    catch (_b) {
        res.status(401).send('Token de acesso inválido');
    }
}
exports.tokenValidation = tokenValidation;
function verifyTokenDatabase(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const indentificationData = res.locals.indentificationData;
        try {
            const userData = yield authService.getUserData(indentificationData.userId);
            if (!userData) {
                return res.status(401).send('O token passado é inválido');
            }
            res.locals.userData = userData;
            next();
        }
        catch (err) {
            res.status(401).send('O token passado é inválido');
        }
    });
}
exports.verifyTokenDatabase = verifyTokenDatabase;
