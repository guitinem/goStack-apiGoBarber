"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ResetPasswordController_1 = __importDefault(require("../controllers/ResetPasswordController"));
var ForgotPasswordController_1 = __importDefault(require("../controllers/ForgotPasswordController"));
var passwordsRouter = express_1.Router();
var resetPasswordController = new ResetPasswordController_1.default();
var forgotPasswordController = new ForgotPasswordController_1.default();
passwordsRouter.post('/forgot', forgotPasswordController.create);
passwordsRouter.post('/reset', resetPasswordController.create);
exports.default = passwordsRouter;
