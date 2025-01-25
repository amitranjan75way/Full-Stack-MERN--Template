import restaurantMenuSchema from "../restaurants/restaurant.menu.schema";
import userSchema from "../user/user.schema";
import customerCartSchema from "./customer.cart.schema";
import customerSchema from "./customer.schema";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import orderSchema from "./customer.order.schema";
import restaurentSchema from "../restaurants/restaurent.schema";


/**
 * Adds an item to the customer's cart. If the item is already in the cart, it will be removed.
 * If the restaurantId is different from the current cart's restaurantId, the cart will be cleared
 * and the new item will be added.
 *
 * @param {string} userEmail - The email of the user.
 * @param {string} restaurantId - The ID of the restaurant.
 * @param {string} itemId - The ID of the item to add to the cart.
 * @returns {Promise<any>} - The updated cart.
 * @throws {Error} - If the user, customer, cart, item, or restaurant is not found.
 */
export const addItemToCartService = async (
  userEmail: string,
  restaurantId: string,
  itemId: string
) => {
  const user = await userSchema.findOne({ email: userEmail });
  if (!user) {
    throw new Error("User not found");
  }

  const customer = await customerSchema.findById(user.additionalInfo);
  if (!customer) {
    throw createHttpError(404, "Customer not found");
  }

  const cart = await customerCartSchema.findById(customer.cart);
  if (!cart) {
    throw createHttpError(404, "Cart not found");
  }

  const item = await restaurantMenuSchema.findById(itemId);
  if (!item) {
    throw createHttpError(404, "Item not found");
  }
  const restaurant = await restaurentSchema.findById(restaurantId);
  if (!restaurant) {
    throw createHttpError(404, "Restaurant not found");
  }

  // If restaurantId is different, clear cart and add the new item
  if (cart.restaurantId && cart.restaurantId.toString() !== restaurantId) {
    cart.items = [];
    cart.totalAmount = 0;
    cart.restaurantId = restaurant._id;
  }
  console.log(cart.restaurantId);

  // Check if the item is already in the cart
  const itemIndex = cart.items.findIndex(
    (cartItemId) => cartItemId.toString() === itemId
  );

  if (itemIndex >= 0) {
    // Item already in cart, remove it
    cart.items.splice(itemIndex, 1);
    cart.totalAmount -= item.price;
    if (cart.totalAmount < 0) {
      cart.totalAmount = 0;
    }
  } else {
    // Add item to cart
    cart.items.push(new mongoose.Types.ObjectId(itemId));
    cart.totalAmount += item.price;
  }

  // Save cart
  await cart.save();

  return cart;
};

/**
 * Places an order for the items in the user's cart and clears the cart.
 *
 * @param {string} userEmail - The email of the user.
 * @returns {Promise<any>} - The order details.
 * @throws {Error} - If the user, customer, cart, or order placement fails.
 */
export const placeOrderService = async (userEmail: string) => {
  const user = await userSchema.findOne({ email: userEmail });
  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const customerDetails = await customerSchema.findById(user.additionalInfo);
  if (!customerDetails || !customerDetails.cart) {
    throw createHttpError(404, "Customer or cart not found");
  }

  // Fetching cart details
  const cart = await customerCartSchema.findById(customerDetails.cart);
  if (!cart || cart.items.length === 0) {
    throw createHttpError(400, "Cart is empty, cannot place order");
  }

  // Create order directly from cart
  const order = new orderSchema({
    userId: cart.userId,
    restaurentId: cart.restaurantId,
    items: cart.items,
    totalAmount: cart.totalAmount,
    deliveryAddress: customerDetails.addresses,
  });

  const savedOrder = await order.save();

  // Update customer's order history and clear the cart
  customerDetails.orders.push(savedOrder._id);
  cart.items = [];
  cart.restaurantId = new mongoose.Types.ObjectId();
  cart.totalAmount = 0;

  await customerDetails.save();
  await cart.save();

  return savedOrder;
};
