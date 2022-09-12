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
exports.getUserData = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRepository = __importStar(require("../repositories/userRepository"));
dotenv_1.default.config();
function isEmailAlreadyRegistered(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield userRepository.getUserByEmail(email);
        if (userData) {
            throw { code: 'conflict', message: 'email já cadastrado' };
        }
    });
}
function registerUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const BCRYPT_SALTS = 10;
        yield isEmailAlreadyRegistered(userData.email);
        const encryptedPassword = bcrypt_1.default.hashSync(userData.password, BCRYPT_SALTS);
        userData.password = encryptedPassword;
        yield userRepository.insert(userData);
    });
}
exports.registerUser = registerUser;
function isUserRegistered(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield userRepository.getUserByEmail(email);
        if (!userData) {
            throw {
                code: 'unauthorized',
                message: 'os dados de login estão incorretos'
            };
        }
        return userData;
    });
}
function checkPassword(databasePassword, password) {
    const isRightPassword = bcrypt_1.default.compareSync(password, databasePassword);
    if (!isRightPassword) {
        throw {
            code: 'unauthorized',
            message: 'os dados de login estão incorretos'
        };
    }
}
function loginUser(userData) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const dbUser = yield isUserRegistered(userData.email);
        checkPassword(dbUser.password, userData.password);
        const JWT_PRIVATE_KEY = (_a = process.env.JWT_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
        const EXPIRATION_TIME = 60 * 60 * 2;
        const token = jsonwebtoken_1.default.sign({ userId: dbUser.id }, JWT_PRIVATE_KEY, { expiresIn: EXPIRATION_TIME });
        return { token };
    });
}
exports.loginUser = loginUser;
function getUserData(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield userRepository.getUserById(userId);
        return userData;
    });
}
exports.getUserData = getUserData;
