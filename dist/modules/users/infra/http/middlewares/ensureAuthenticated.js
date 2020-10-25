"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var auth_1 = __importDefault(require("@config/auth"));
function ensureAuthenticated(request, response, next) {
    // ? Validação Token JWT
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing', 401);
    }
    try {
        var _a = authHeader.split(' '), token = _a[1];
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var sub = decoded.sub;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (error) {
        throw new AppError_1.default('JWT token not valid', 401);
    }
}
exports.default = ensureAuthenticated;
