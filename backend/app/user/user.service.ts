
import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import customerSchema from "../customers/customer.schema";
import restaurantSchema from "../restaurants/restaurent.schema";
import deliveryStaffSchema from "../deliveryStaff/delivery.schema";
import customerCartSchema from "../customers/customer.cart.schema";


/**
 * Creates a new user and initializes additional information based on the user's role.
 *
 * @param {IUser} data - The user data to create a new user.
 * @returns {Promise<UserSchema>} The created user with additional information.
 *
 * @throws {Error} If there is an error during the creation process.
 *
 * The function performs the following steps:
 * 1. Creates a new user using the provided data.
 * 2. If the user's role is "RESTAURANT", it creates a new restaurant entry and associates it with the user.
 * 3. If the user's role is "DELIVERY_STAFF", it creates a new delivery staff entry and associates it with the user.
 * 4. For any other role, it creates a new customer cart and customer entry, then associates them with the user.
 */
export const createUser = async (data: IUser) => {
    const result = await UserSchema.create({ ...data });
    if (data.role === "RESTAURANT") {
        const restaurant = new restaurantSchema({
            userId: result._id,
            menu: [],
            address: null,
            orders: []
        });
        const res = await restaurant.save();
        result.additionalInfo = res._id as any;
        await result.save();
    } else if (data.role === "DELIVERY_STAFF") {
        const deliveryStaff = new deliveryStaffSchema({
            userId: result._id,
            address: null
        });
        const res = await deliveryStaff.save();
        result.additionalInfo = res._id as any;
        await result.save();
    } else {
        const cart = new customerCartSchema({
            userId: result._id,
            items: [],
            total: 0,
            restaurantId: null,
        });
        const newCart = await cart.save();

        const customer = new customerSchema({
            userId: result._id,
            addresses: null,
            orders: [],
            cart: newCart._id
        });
        const res = await customer.save();
        result.additionalInfo = res._id as any;
        await result.save();
    }
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
    return result;
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
    return user;
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
 * Deletes the refresh token for a user by their email address.
 *
 * @param {string} email - The email address of the user to delete the refresh token for.
 * @returns {Promise<any>} A promise that resolves to the updated user document.
 */
export const deleteRefreshToken = async (email: string) => {
    const user = await UserSchema.findOneAndUpdate({ email }, { refreshToken: '' });
    return user;
}
