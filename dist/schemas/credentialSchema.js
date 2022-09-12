"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
function validateUrl(url, helper) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return helper.message('A url passada é inválida');
    }
}
const credentialSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    url: joi_1.default.string().custom(validateUrl).required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.default = credentialSchema;
