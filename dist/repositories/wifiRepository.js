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
exports.deleteWifi = exports.getWifiById = exports.getWifisByUserId = exports.insert = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function insert(wifi, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.wifiNetworks.create({ data: Object.assign(Object.assign({}, wifi), { userId }) });
    });
}
exports.insert = insert;
function getWifisByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifis = yield postgres_1.default.wifiNetworks.findMany({
            where: { userId }
        });
        return wifis;
    });
}
exports.getWifisByUserId = getWifisByUserId;
function getWifiById(wifiId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield postgres_1.default.wifiNetworks.findUnique({
            where: { id: wifiId }
        });
        return wifi;
    });
}
exports.getWifiById = getWifiById;
function deleteWifi(wifiId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.wifiNetworks.delete({ where: { id: wifiId } });
    });
}
exports.deleteWifi = deleteWifi;