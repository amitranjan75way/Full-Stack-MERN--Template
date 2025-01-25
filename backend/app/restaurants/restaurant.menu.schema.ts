import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
  }
);

export default mongoose.model("Menu", MenuSchema);