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
exports.deleteCredential = exports.insert = exports.getCredentialById = exports.getCredentialsByUserId = exports.getCredentialByTitleAndUserid = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function getCredentialByTitleAndUserid(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentialData = yield postgres_1.default.credentials.findFirst({
            where: { title, userId }
        });
        return credentialData;
    });
}
exports.getCredentialByTitleAndUserid = getCredentialByTitleAndUserid;
function getCredentialsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield postgres_1.default.credentials.findMany({
            where: { userId }
        });
        return credentials;
    });
}
exports.getCredentialsByUserId = getCredentialsByUserId;
function getCredentialById(credentialId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield postgres_1.default.credentials.findUnique({
            where: { id: credentialId }
        });
        return credential;
    });
}
exports.getCredentialById = getCredentialById;
function insert(credential, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.credentials.create({ data: Object.assign(Object.assign({}, credential), { userId }) });
    });
}
exports.insert = insert;
function deleteCredential(credentialId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.credentials.delete({ where: { id: credentialId } });
    });
}
exports.deleteCredential = deleteCredential;
