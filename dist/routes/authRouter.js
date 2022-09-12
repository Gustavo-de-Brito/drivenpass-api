"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const authValidation_1 = __importDefault(require("../middlewares/authValidation"));
const authRouter = (0, express_1.Router)();
authRouter.post('/sign-up', authValidation_1.default, authControllers_1.signUp);
authRouter.post('/sign-in', authValidation_1.default, authControllers_1.signIn);
exports.default = authRouter;
