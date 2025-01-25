
import { type BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        role: "CUSTOMER" | "RESTAURANT" | "DELIVERY_STAFF";
        password: string;
        refreshToken: string;
        additionalInfo: mongoose.Schema.Types.ObjectId;
}