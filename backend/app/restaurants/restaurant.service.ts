import MenuSchema from "./restaurant.menu.schema";
import { Menu } from "./restaurent.dto";
import RestaurantSchema from "./restaurent.schema";
import OrderSchema from "../customers/customer.order.schema";
import createHttpError from "http-errors";
import * as UserService from "../user/user.service";

/**
 * Adds a new menu item to the restaurant's menu.
 *
 * @param {Menu} data - The menu item data to be added.
 * @param {string} email - The email of the user associated with the restaurant.
 * @returns {Promise<Menu>} The added menu item.
 * @throws {Error} If the user is not found.
 */
export const addItem = async (data: Menu, email: string) => {
  const user = await UserService.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const restaurantId = user.additionalInfo;

  const menu = new MenuSchema(data);
  const addedMenuItem = await menu.save();

  const restaurant = await RestaurantSchema.findByIdAndUpdate(restaurantId, {
    $push: { menu: addedMenuItem._id },
  });

  return addedMenuItem;
};

/**
 * Fetches menu items for a specific restaurant.
 *
 * @param {string} restaurantId - The ID of the restaurant.
 * @returns {Promise<Restaurant>} The restaurant with menu items.
 */
export const getMenuItems = async (restaurantId: string) => {
  const restaurant =
    await RestaurantSchema.findById(restaurantId).populate("menu");
  return restaurant;
};

/**
 * Fetches a list of all restaurants.
 *
 * @returns {Promise<Restaurant[]>} The list of restaurants.
 */
export const getRestaurantList = async () => {
  const restaurants = await RestaurantSchema.find({})
  .populate({
    path: 'userId',
    select: 'name email',
    match: {}
  });
  return restaurants;
};

/**
 * Updates the status of an order and associates it with a restaurant.
 *
 * @param {string} restaurantId - The ID of the restaurant.
 * @param {string} orderId - The ID of the order.
 * @param {string} status - The new status of the order.
 * @returns {Promise<{order: Order, user: User}>} - The updated order and the user associated with the order.
 * @throws {HttpError} - Throws a 404 error if the order, restaurant, or user is not found.
 */
export const updateOrderStatus = async (
  restaurantId: string,
  orderId: string,
  status: string
) => {
  const order = await OrderSchema.findByIdAndUpdate(
    orderId,
    { status: status },
    { new: true }
  );
  if (!order) {
    throw createHttpError(404, "Order not found");
  }
  const restaurant = await RestaurantSchema.findByIdAndUpdate(
    restaurantId,
    { orders: order._id },
    { new: true }
  );
  if (!restaurant) {
    throw createHttpError(404, "Restaurant not found");
  }
  const user = await UserService.getUserById(order.userId.toString());
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  return { order, user };
};
