import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import * as restaurantService from "../restaurants/restaurant.service";
import * as customerService from "./customer.service";
import createHttpError from "http-errors";
import { sendEmail } from "../common/services/email.service";

/**
 * Fetches menu items for a specific restaurant.
 * @param {Request} req - The request object containing the restaurant ID in the parameters.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the restaurant ID is invalid or menu items cannot be fetched.
 */
export const getMenuItems = asyncHandler(async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  const menuItems = await restaurantService.getMenuItems(restaurantId);
  res.send(createResponse(menuItems, "Menu items fetched successfully"));
});

/**
 * Fetches a list of all restaurants.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the restaurant list cannot be fetched.
 */
export const getRestaurants = asyncHandler(async (req: Request, res: Response) => {
  const restaurants = await restaurantService.getRestaurantList();
  res.send(createResponse(restaurants, "Restaurant fetched successfully"));
});

/**
 * Adds an item to the user's cart.
 * @param {Request} req - The request object containing restaurant and item IDs in the parameters.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If restaurant ID, item ID, or user authentication is missing or invalid.
 */
export const addItemToCart = asyncHandler(async (req: Request, res: Response) => {
  const restaurantId = req.params.restaurantId;
  const itemId = req.params.itemId;
  if (!restaurantId) {
    throw createHttpError(400, "Restaurant id is required");
  }
  if (!itemId) {
    throw createHttpError(400, "Item id is required");
  }
  if (!req.user) {
    throw createHttpError(401, "User not found, please login again");
  }

  const cart = await customerService.addItemToCartService(req.user.email, restaurantId, itemId);
  res.send(createResponse(cart, "Item added to cart successfully"));
});

/**
 * Places an order for the items in the user's cart and sends an email confirmation.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the user is not authenticated or the order placement fails.
 */

export const placeOrder = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw createHttpError(401, "User not found, please login again");
  }

  const order = await customerService.placeOrderService(req.user.email);

  const mailOptions = {
    from: `Food Delivery app - Amit Ranjan`,
    to: `${req.user.email}`,
    subject: `Order Placed successfully`,
    text: `Order placed successfully`
  }
  await sendEmail(mailOptions);
  res.send(createResponse(order, "Order placed successfully"));
});