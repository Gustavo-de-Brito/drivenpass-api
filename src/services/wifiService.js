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
exports.deleteWifiById = exports.getWifiById = exports.getAllUserWifis = exports.createWifi = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cryptr_1 = __importDefault(require("cryptr"));
const wifiRepository = __importStar(require("../repositories/wifiRepository"));
dotenv_1.default.config();
function encryptData(data) {
    var _a;
    const CRYPTR_PRIVATE_KEY = (_a = process.env.CRYPTR_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    const cryptr = new cryptr_1.default(CRYPTR_PRIVATE_KEY);
    const encryptedPassword = cryptr.encrypt(data);
    return encryptedPassword;
}
function createWifi(wifi, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedPassword = encryptData(wifi.password);
        yield wifiRepository.insert(Object.assign(Object.assign({}, wifi), { password: encryptedPassword }), userId);
    });
}
exports.createWifi = createWifi;
function decryptCryptr(data) {
    var _a;
    const CRYPTR_PRIVATE_KEY = (_a = process.env.CRYPTR_PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    const cryptr = new cryptr_1.default(CRYPTR_PRIVATE_KEY);
    console.log();
    const decryptedData = cryptr.decrypt(data);
    return decryptedData;
}
function getAllUserWifis(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifis = yield wifiRepository.getWifisByUserId(userId);
        const decryptedWifis = wifis.map(wifi => {
            const decryptedPassword = decryptCryptr(wifi.password);
            return Object.assign(Object.assign({}, wifi), { password: decryptedPassword });
        });
        return decryptedWifis;
    });
}
exports.getAllUserWifis = getAllUserWifis;
function getWifiById(wifiId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield wifiRepository.getWifiById(wifiId);
        if (!wifi) {
            throw {
                code: 'not_found',
                message: 'Você não possui uma rede wifi com esse id'
            };
        }
        else if (wifi.userId !== userId) {
            throw {
                code: 'not_found',
                message: 'Você não possui uma rede wifi com esse id'
            };
        }
        const decryptedPassword = decryptCryptr(wifi.password);
        return Object.assign(Object.assign({}, wifi), { password: decryptedPassword });
    });
}
exports.getWifiById = getWifiById;
function deleteWifiById(wifiId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield wifiRepository.getWifiById(wifiId);
        if (!wifi) {
            throw {
                code: 'not_found',
                message: 'Você não possui uma rede wifi com esse id'
            };
        }
        else if (wifi.userId !== userId) {
            throw {
                code: 'not_found',
                message: 'Você não possui uma rede wifi com esse id'
            };
        }
        yield wifiRepository.deleteWifi(wifiId);
    });
}
exports.deleteWifiById = deleteWifiById;
