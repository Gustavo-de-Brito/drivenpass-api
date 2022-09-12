"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const credentialValidation_1 = __importDefault(require("../middlewares/credentialValidation"));
const paramsIdValidation_1 = __importDefault(require("../middlewares/paramsIdValidation"));
const credentialControllers_1 = require("../controllers/credentialControllers");
const credentialRouter = (0, express_1.Router)();
credentialRouter.post('/credentials', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, credentialValidation_1.default, credentialControllers_1.registerCredential);
credentialRouter.get('/credentials', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, credentialControllers_1.getCredentials);
credentialRouter.delete('/credentials/:id', paramsIdValidation_1.default, tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, credentialControllers_1.deleteCredential);
exports.default = credentialRouter;
