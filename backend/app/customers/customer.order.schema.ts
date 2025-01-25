import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    restaurentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      // required: true,
      default: null,
    },
    deliveryStaffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryStaff",
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["placed", "accepted","rejected", "prepared", "dispatched", "delivered"],
      default: "placed",
    },
    deliveryAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);