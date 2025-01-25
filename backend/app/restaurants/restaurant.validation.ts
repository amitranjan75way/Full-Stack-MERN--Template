import { body, param } from 'express-validator';


export const addItemValidator = [
    body('name').notEmpty().withMessage('name is required').isString().withMessage('name must be a string'),
    body('description').notEmpty().withMessage('description is required').isString().withMessage('description must be a string'),
    body('price').notEmpty().withMessage('price is required').isNumeric().withMessage('price must be a number'),
]

export const updateOrderStatusvalidator = [
    param('orderId').notEmpty().withMessage('Order id is required').isString().withMessage('Order id must be a string'),
    body('status').notEmpty().withMessage('Status is required').isString().withMessage('Status must be a string').isIn(["accepted","rejected", "prepared", "dispatched"]).withMessage('Invalid status'),
    param('restaurantId').notEmpty().withMessage('Restaurant id is required').isString().withMessage('Restaurant id must be a string'),
]