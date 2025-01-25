import * as userService from "./user.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import e, { type Request, type Response } from "express";
import { IUser } from "./user.dto";
import { error } from "console";
import createHttpError from "http-errors";
import { generateTokens, validateToken } from "../common/helper/jwt.helper";
import { Payload } from "../common/dto/base.dto";
import bcrypt from "bcrypt";
import { sendEmail } from "../common/services/email.service";
import { resetPasswordEmailTemplate } from "../common/template/mail.template";
import * as jwthelper from "../common/helper/jwt.helper";
import { loadConfig } from "../common/helper/config.hepler";

loadConfig();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;

/**
 * Registers a new user.
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the user already exists or refresh token update fails.
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const data: IUser = req.body;

    const isUserExist: boolean = await userService.isUserExistByEamil(
      data.email
    );
    if (isUserExist) {
      throw createHttpError(409, "User already Exits");
    }

    const result: IUser = await userService.createUser(data);
    const payload: Payload = {
      id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
    };
    const { refreshToken, accessToken } = generateTokens(payload);
    const user = await userService.updateRefreshToken(result._id, refreshToken);
    if (!user) {
      throw createHttpError(500, "Failed to update refresh token");
    }
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: false,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: false,
    });
    res.send(
      createResponse({ user, accessToken }, "User Registered Successfully")
    );
  }
);

/**
 * Logs in a user.
 * @param {Request} req - The request object containing email and password in the body.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the user is not found or the password is incorrect.
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;

  let user = await userService.getUserByEmail(data.email);
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  if (await bcrypt.compare(data.password, user.password)) {
    const payload: Payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const { refreshToken, accessToken } = generateTokens(payload);
    const updatedUser = await userService.updateRefreshToken(
      user._id,
      refreshToken
    );
    if (!updatedUser) {
      throw createHttpError(500, "Failed to update refresh token");
    }

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: false,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: false,
    });

    user.password = "";
    res.send(
      createResponse({ user, accessToken }, "User logged in successfully")
    );
  } else {
    throw createHttpError(401, "wrong password | Unauthorised access");
  }
});

/**
 * Logs out a user by clearing cookies and removing the refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the user is not found.
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(401, "User not found, please login again");
  }
  const result = await userService.deleteRefreshToken(user.email);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.send(createResponse(null, "User logged out successfully"));
});

/**
 * Updates the access token using the refresh token.
 * @param {Request} req - The request object containing the refresh token in cookies or headers.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the refresh token is not found, invalid, or the user is not found.
 */
export const updateAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken =
      req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      throw createHttpError(401, "Refresh token not found");
    }
    const { valid, decoded } = validateToken(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );
    if (!valid || !decoded) {
      throw createHttpError(401, "Invalid refresh token, Please login again");
    }
    const payload: Payload = decoded as Payload;
    const user = await userService.getUserById(payload.id);
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    const newPayload: Payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const { accessToken } = generateTokens(newPayload);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.send(createResponse(user, "Access token updated successfully"));
  }
);
