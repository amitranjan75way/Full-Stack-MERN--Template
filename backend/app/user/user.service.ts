
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import bcrypt from 'bcrypt';
import * as jwthelper from '../common/helper/jwt.helper';
import createHttpError from "http-errors";


/**
 * Creates a new user.
 *
 * @param {IUser} data - The user data to create a new user.
 * @returns {Promise<UserSchema>} The created user with additional information.
 *
 * @throws {Error} If there is an error during the creation process.
 */
export const createUser = async (data: IUser) => {
    const result = await UserSchema.create({ ...data });
    return result;
};


/**
 * Checks if a user exists by their email.
 *
 * @param {string} email - The email of the user to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the user exists, otherwise `false`.
 */
export const isUserExistByEamil = async (email: string) => {
    const user = await UserSchema.findOne({ email: email });
    if (user) {
        return true;
    } else {
        return false;
    }
}

/**
 * Retrieves a user by their email address.
 *
 * @param {string} email - The email address of the user to retrieve.
 * @returns {Promise<any>} A promise that resolves to the user document if found, otherwise null.
 */
export const getUserByEmail = async (email: string) => {
    const result = await UserSchema.findOne({ email }).lean();
    return result as IUser;
};


/**
 * Updates the refresh token for a user by their ID.
 *
 * @param {string} id - The ID of the user to update.
 * @param {string} refreshToken - The new refresh token to set for the user.
 * @returns {Promise<UserSchema | null>} - The updated user document, or null if no user was found.
 */
export const updateRefreshToken = async (id: string, refreshToken: string) => {
    const user = await UserSchema.findByIdAndUpdate(id,
        { refreshToken },
        { new: true }
    );
    return user as IUser;
}


/**
 * Retrieves a user by their ID.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<any>} A promise that resolves to the user document if found, otherwise null.
 */
export const getUserById = async (id: string) => {
    const result = await UserSchema.findById(id).lean();

    return result;
}


/**
 * Deletes the refresh token for a user by their user id.
 *
 * @param {string} id - The email address of the user to delete the refresh token for.
 * @returns {Promise<any>} A promise that resolves to the updated user document.
 */
export const deleteRefreshToken = async (id: string) => {
    const user = await UserSchema.findByIdAndUpdate(id, { refreshToken: '' });
    return user as IUser;
}

/**
 * Updates the password for a user by their ID.
 *
 * @param {string} userId - The ID of the user to update the password for.
 * @param {any} data - An object containing the new password.
 * @returns {Promise<IUser>} A promise that resolves to the updated user document.
 *
 * @throws {Error} If there is an error during the update process.
 */
export const updatePassword = async(userId: string, data: any) => {
    
    const hashedPass = await bcrypt.hash(data.newPassword, 12);
     
    const user = await UserSchema.findByIdAndUpdate(userId, {password: hashedPass});
    return user as IUser;
}

/**
 * Updates the reset password token for a user.
 * 
 * @param {string} userId - The ID of the user whose reset token is being updated.
 * @param {string} token - The reset password token to be stored in the database.
 * @returns {Promise<void>} A promise that resolves when the token is updated.
 */
export const updateResetToken = async(userId: string, token: string) => {
    await UserSchema.findByIdAndUpdate(userId, {resetPasswordToken: token});
}


/**
 * Resets the user's password if the provided token is valid.
 * 
 * @param {string} userId - The ID of the user who is resetting their password.
 * @param {string} token - The reset password token provided by the user.
 * @param {string} newPassword - The new password to be set for the user.
 * @throws {HttpError} Throws an error if the reset token is invalid or expired.
 * @returns {Promise<User | null>} A promise that resolves to the updated user document, or null if the user is not found.
 */
export const resetPassword = async(userId: string, token: string, newPassword: string) => {
    const user = await UserSchema.findById(userId);
    console.log(user);
    if(!user?.resetPasswordToken) {
        throw createHttpError(401, "Token expired or invalid");
    }
    const hashPass = await bcrypt.hash(newPassword, 12);
    const newUser = await UserSchema.findByIdAndUpdate(userId, 
        {
            password: hashPass, resetPasswordToken: null
        }, {new: true}
    );

    return newUser;
}

