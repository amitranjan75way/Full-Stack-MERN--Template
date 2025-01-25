import { param } from "express-validator";

export const addToCartvalidator = [
    param('restaurantId').notEmpty().withMessage('restaurantId is required').isString().withMessage('restaurantId must be a string'),
    param('itemId').notEmpty().withMessage('itemId is required').isString().withMessage('itemId must be a string'),
];

export const getMenuItemsValidator = [
    param('restaurantId').notEmpty().withMessage('restaurantId is required').isString().withMessage('restaurantId must be a string'),
];