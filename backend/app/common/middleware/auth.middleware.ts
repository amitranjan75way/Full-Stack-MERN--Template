import { loadConfig } from "../helper/config.hepler";

import { type NextFunction, type Request, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { type IUser } from "../../user/user.dto";
import UserSchema from "../../user/user.schema";
import { decodeAccessToken } from "../helper/jwt.helper";

loadConfig();
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;


const fetchUser = async (id:string) => {
  return await UserSchema.findById(id).lean();
}

// Middleware for role-based authentication
export const auth = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      throw createHttpError(401, {
        message: "Token is required for authentication",
      });
    }

    const user = await decodeAccessToken(token) as any;
    if (!user) {
      throw createHttpError(401, {
        message: "Invalid or expired token",
      });
    }
    // Check if user has a valid role
    if (!user.role || !["CUSTOMER", "RESTAURANT", "DELIVERY_STAFF"].includes(user.role)) {
      throw createHttpError(403, {
        message: "Invalid or unauthorized user role",
      });
    }

    req.user = user as any;
    next();
  }
);

export const isRestaurant = async(req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user.role !== "RESTAURANT") {
    next(createHttpError(403, "Only restaurant can access this route"));
  }
  next();
};

export const isDeliveryStaff = async(req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user.role !== "DELIVERY_STAFF") {
    next(createHttpError(403, "only delivery staff can access this route"));
  }
  next();
};

export const isCustomer = async(req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user.role !== "CUSTOMER") {
    next(createHttpError(403, "only customer can access this route"));
  }
  next();
};





