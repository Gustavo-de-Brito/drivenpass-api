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
exports.deleteCredentialById = exports.getCredentialById = exports.getAllUserCredentials = exports.createCredential = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cryptr_1 = __importDefault(require("cryptr"));
const credentialRepository = __importStar(require("../repositories/credentialRepository"));
dotenv_1.default.config();
function searchTitle(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialData = yield credentialRepository.getCredentialByTitleAndUserid(title, userId);
        if (credentialData) {
            throw {
                code: 'conflict',
                message: 'já existe uma credencial com esse título'
            };
        }
    });
}
function encryptPassword(password) {
    var _a;
    const CRYPTR_PRIVATE_KEY = (_a = process.env.CRYPTR_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    const cryptr = new cryptr_1.default(CRYPTR_PRIVATE_KEY);
    const encryptedPassword = cryptr.encrypt(password);
    return encryptedPassword;
}
function createCredential(newCredential, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield searchTitle(newCredential.title, userId);
        const encryptedPassword = encryptPassword(newCredential.password);
        yield credentialRepository.insert(Object.assign(Object.assign({}, newCredential), { password: encryptedPassword }), userId);
    });
}
exports.createCredential = createCredential;
function decryptCredentialPassword(credential) {
    var _a;
    const CRYPTR_PRIVATE_KEY = (_a = process.env.CRYPTR_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    const cryptr = new cryptr_1.default(CRYPTR_PRIVATE_KEY);
    const decryptedPassword = cryptr.decrypt(credential.password);
    const decryptedCredential = Object.assign(Object.assign({}, credential), { password: decryptedPassword });
    return decryptedCredential;
}
function getAllUserCredentials(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield credentialRepository.getCredentialsByUserId(userId);
        const decryptedCredentials = credentials.map(credential => {
            const decryptedCredential = decryptCredentialPassword(credential);
            return decryptedCredential;
        });
        return decryptedCredentials;
    });
}
exports.getAllUserCredentials = getAllUserCredentials;
function getCredentialById(credentialId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialRepository.getCredentialById(credentialId);
        if (!credential) {
            throw {
                code: 'not_found',
                message: 'Os dados dessa credencial são inválidos'
            };
        }
        if (credential.userId !== userId) {
            throw {
                code: 'unauthorized',
                message: 'Você não tem acesso a essa credencial'
            };
        }
        const decryptedCredential = decryptCredentialPassword(credential);
        return decryptedCredential;
    });
}
exports.getCredentialById = getCredentialById;
function deleteCredentialById(credentialId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialRepository.getCredentialById(credentialId);
        if (!credential) {
            throw {
                code: 'unauthorized',
                message: 'Você não possui uma credencial com esse id'
            };
        }
        else if (credential.userId !== userId) {
            throw {
                code: 'unauthorized',
                message: 'Você não possui uma credencial com esse id'
            };
        }
        yield credentialRepository.deleteCredential(credentialId);
    });
}
exports.deleteCredentialById = deleteCredentialById;
