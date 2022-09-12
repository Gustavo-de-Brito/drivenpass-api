"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const wifiValidation_1 = __importDefault(require("../middlewares/wifiValidation"));
const paramsIdValidation_1 = __importDefault(require("../middlewares/paramsIdValidation"));
const wifiControllers_1 = require("../controllers/wifiControllers");
const wifiRouter = (0, express_1.Router)();
wifiRouter.post('/wifis', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, wifiValidation_1.default, wifiControllers_1.registerNewWifi);
wifiRouter.get('/wifis', tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, wifiControllers_1.getWifis);
wifiRouter.delete('/wifis/:id', paramsIdValidation_1.default, tokenValidation_1.tokenValidation, tokenValidation_1.verifyTokenDatabase, wifiControllers_1.deleteWifi);
exports.default = wifiRouter;
