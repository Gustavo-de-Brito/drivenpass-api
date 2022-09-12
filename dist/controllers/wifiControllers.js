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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWifi = exports.getWifis = exports.registerNewWifi = void 0;
const wifiService = __importStar(require("../services/wifiService"));
function registerNewWifi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = req.body;
        const userData = res.locals.userData;
        try {
            yield wifiService.createWifi(wifi, userData.id);
            res.sendStatus(201);
        }
        catch (err) {
            res.sendStatus(500);
        }
    });
}
exports.registerNewWifi = registerNewWifi;
function getWifis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiId = Number(req.query.id);
        const userData = res.locals.userData;
        try {
            if (isNaN(wifiId)) {
                const wifis = yield wifiService.getAllUserWifis(userData.id);
                res.status(200).send(wifis);
            }
            else {
                const wifi = yield wifiService.getWifiById(wifiId, userData.id);
                res.status(200).send(wifi);
            }
        }
        catch (err) {
            if (err.code === 'not_found')
                return res.status(404).send(err.message);
            console.log(err);
            res.sendStatus(500);
        }
    });
}
exports.getWifis = getWifis;
function deleteWifi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiId = parseInt(req.params.id);
        const userData = res.locals.userData;
        try {
            yield wifiService.deleteWifiById(wifiId, userData.id);
            res.sendStatus(200);
        }
        catch (err) {
            if (err.code === 'not_found')
                return res.status(401).send(err.message);
            res.sendStatus(500);
        }
    });
}
exports.deleteWifi = deleteWifi;
