import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    // orderer information
    User: {
      // type: mongoose.Types.ObjectId,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // delivery information
    address: String,
    mobile: String,
    cart: Array,
    delivered: {
      type: Boolean,
      default: false,
    },
    // payment information
    total: Number,
    paymentId: String,
    method: String,
    paid: {
      type: Boolean,
      default: false,
    },
    dateOfPayment: Date,
  },
  { timestamps: true }
);
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;