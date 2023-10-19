import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    ordererInfo: {
      User: {
        // type: mongoose.Types.ObjectId,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    productInfo: {
      product: {},
    },
    deleveryInfo: {
      name: String,
      email: String,
      address: String,
      mobile: String,
      delivered: {
        type: Boolean,
        default: false,
      },
    },
    payInfo: {
      paymentId: String,
      total: Number,
      method: String,
      paid: {
        type: Boolean,
        default: false,
      },
      dateOfPayment: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
