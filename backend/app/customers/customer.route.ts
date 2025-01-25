import express from 'express';
import { catchError } from '../common/middleware/cath-error.middleware';
import * as authMiddlerware from '../common/middleware/auth.middleware';
import * as customerController from './customer.controller';
import * as customerValidator from './customer.validation';

const router = express.Router();

router
      .post("/addItemToCart/:restaurantId/:itemId", authMiddlerware.auth, authMiddlerware.isCustomer, customerValidator.addToCartvalidator, catchError, customerController.addItemToCart)
      .get("/restaurantList", customerController.getRestaurants)
      .post("/placeOrder", authMiddlerware.auth, authMiddlerware.isCustomer, customerController.placeOrder)
      .get("/:restaurantId", authMiddlerware.auth, authMiddlerware.isCustomer,customerValidator.getMenuItemsValidator, customerController.getMenuItems)
      

export default router;