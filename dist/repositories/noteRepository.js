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
exports.deleteNote = exports.insert = exports.getNoteById = exports.getNotesByUserId = exports.getNoteByTitleAndUserid = void 0;
const postgres_1 = __importDefault(require("../databases/postgres"));
function getNoteByTitleAndUserid(title, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const noteData = yield postgres_1.default.notes.findFirst({
            where: { title, userId }
        });
        return noteData;
    });
}
exports.getNoteByTitleAndUserid = getNoteByTitleAndUserid;
function getNotesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const notes = yield postgres_1.default.notes.findMany({
            where: { userId }
        });
        return notes;
    });
}
exports.getNotesByUserId = getNotesByUserId;
function getNoteById(noteId) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = yield postgres_1.default.notes.findUnique({
            where: { id: noteId }
        });
        return note;
    });
}
exports.getNoteById = getNoteById;
function insert(note, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.notes.create({ data: Object.assign(Object.assign({}, note), { userId }) });
    });
}
exports.insert = insert;
function deleteNote(noteId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgres_1.default.notes.delete({ where: { id: noteId } });
    });
}
exports.deleteNote = deleteNote;
