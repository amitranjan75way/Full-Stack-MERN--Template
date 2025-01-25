import jwt from 'jsonwebtoken';
import { Payload } from '../dto/base.dto';
import { loadConfig } from "./config.hepler";
import createHttpError from "http-errors";
loadConfig();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY = '15min'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days


export const generateTokens = (payload: Payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  return { accessToken, refreshToken };
};
 
export const validateToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};
export const decodeAccessToken = async (encryptedAccessToken : string) => {
  // Verify token and attach the user information to the request object
  const payload = jwt.verify(encryptedAccessToken, ACCESS_TOKEN_SECRET) as any;
  
  if (payload === null) {
      throw createHttpError(403, {
      message: "Invalid Token...",
      });
  }

  return payload;
}

