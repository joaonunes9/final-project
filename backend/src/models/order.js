import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        iva: Number,
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
    },
    stripePaymentId: {
      type: String,
      require: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["processing", "completed", "shipped", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);
