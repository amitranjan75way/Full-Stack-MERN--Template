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
exports.verifyResetPasswordToken = exports.generatePasswordRestToken = exports.decodeAccessToken = exports.validateToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_hepler_1 = require("./config.hepler");
const http_errors_1 = __importDefault(require("http-errors"));
(0, config_hepler_1.loadConfig)();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
/**
 * Generates access and refresh tokens for the given payload.
 *
 * @param {Payload} payload - The payload to be included in the JWT.
 * @returns {Object} - An object containing the generated access and refresh tokens.
 * @throws {Error} - Throws an error if token generation fails.
 */
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
/**
 * Validates a given token using the provided secret.
 *
 * @param {string} token - The JWT token to be validated.
 * @param {string} secret - The secret key to validate the token.
 * @returns {Object} - An object with properties `valid` (boolean) and `decoded` (the decoded payload) or `error`.
 */
const validateToken = (token, secret) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { valid: true, decoded };
    }
    catch (error) {
        return { valid: false, error };
    }
};
exports.validateToken = validateToken;
/**
 * Decodes and verifies the access token, attaching the user information.
 *
 * @param {string} encryptedAccessToken - The encrypted access token to decode and verify.
 * @returns {Payload} - The decoded payload containing user information.
 * @throws {HttpError} - Throws an HTTP error if the token is invalid or expired.
 */
const decodeAccessToken = (encryptedAccessToken) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify token and attach the user information to the request object
    const payload = jsonwebtoken_1.default.verify(encryptedAccessToken, ACCESS_TOKEN_SECRET);
    console.log("Payload is : ", payload);
    if (payload === null) {
        throw (0, http_errors_1.default)(403, {
            message: "Invalid Token...",
        });
    }
    return payload;
});
exports.decodeAccessToken = decodeAccessToken;
/**
 * Generates a password reset token for the given user ID.
 *
 * @param {string} userId - The ID of the user requesting the password reset.
 * @returns {string} - The generated password reset token.
 * @throws {Error} - Throws an error if token generation fails.
 */
const generatePasswordRestToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const resetToken = jsonwebtoken_1.default.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    return resetToken;
});
exports.generatePasswordRestToken = generatePasswordRestToken;
/**
 * Verifies the password reset token.
 *
 * @param {string} token - The password reset token to be verified.
 * @returns {Object} - An object with properties `valid` (boolean) and `decoded` (the decoded payload) or `error`.
 */
const verifyResetPasswordToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        return { valid: true, decoded };
    }
    catch (error) {
        return { valid: false, error };
    }
});
exports.verifyResetPasswordToken = verifyResetPasswordToken;
