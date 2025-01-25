import express from "express";
import userRoutes from "./user/user.route";
import restaurantRoutes from "./restaurants/restaurant.route";
import customerRoutes from "./customers/customer.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/restaurant", restaurantRoutes);
router.use("/customer", customerRoutes);

export default router;