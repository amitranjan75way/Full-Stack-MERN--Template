import asyncHandler from "express-async-handler";
import { Request, Response } from "express";


export const acceptOrRejectOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const status = req.body.status;
  const deliveryStaffId = req.user.id;

  const order = await deliveryStaffService.acceptOrRejectOrder(orderId, status, deliveryStaffId);
  res.send(createResponse(order, "Order status updated successfully"));
});
