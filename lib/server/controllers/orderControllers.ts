import Product from "lib/server/models/Product";
import Order from "lib/server/models/Order";
import User from "lib/server/models/User";

// single
export const createOrder = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<createOrder>\x1b[30m`);

  try {
    // get the order
    console.log({ "req.body": req.body });
    const { ordererInfo, productInfo, deliveryInfo, payInfo } = req.body;
    const { payType } = payInfo;

    const handleOrderWithPrepay = async () => {
      // get the id and quantity of product
      console.log("checking stock...");
      const { productId, options }: any = productInfo;
      const { quantity } = options[0];

      // fint the product
      const foundProduct: any = await Product.findById(productId).exec();
      if (!foundProduct) throw new Error("No found product");
      if (foundProduct.stock < quantity)
        throw new Error("The quantity in stock is less than what was ordered.");
      if (!foundProduct.stock) throw new Error("Out stock");

      // update the product properties
      foundProduct.stock -= quantity;
      foundProduct.sold += quantity;
      const savedProduct = await foundProduct.save();
      console.log({ savedProduct });

      // create an order
      const orderSheet = { ordererInfo, productInfo, deliveryInfo, payInfo };
      console.log({ orderSheet });
      const order = await Order.create(orderSheet);
      console.log({ order });
      // paid: true,
      // dateOfPayment: details.create_time,
      // paymentId: details.paymentId,
      // method: "paypal",

      // out
      return res.status(200).json({ order });
    };

    const handleOrderWithPostpay = async () => {
      // create an order
      const orderSheet = { ordererInfo, productInfo, deliveryInfo, payInfo };
      console.log({ orderSheet });
      const order = await Order.create(orderSheet);
      console.log({ order });

      // out
      return res.status(200).json({ order });
    };

    // payInfo에서 선결제인지 후결제인지 확인하여 분기한다.
    switch (payType) {
      case "prepay":
        handleOrderWithPrepay();
        break;
      case "postpay":
        handleOrderWithPostpay();
        break;

      default:
        break;
    }
  } catch (error: any) {
    console.log({ error });
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteOrder>`);
  const { id } = req.query;
  const deletedOrder = await Order.findByIdAndDelete(id);
  console.log({ deletedOrder });
  return res.status(200).json({ deletedOrder });
};

// multiple
export const getOrders = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<getOrders>`);
  try {
    // find the User
    const { id }: any = req.user;
    const foundUser = await User.findOne({ _id: id }).exec();
    console.log({ foundUser });
    if (foundUser.role !== "user") return res.status(403).json({ message: "Forbidden" });

    // find the Orders by User ID
    // const foundOrders = await Order.findOne({ user: foundUser._id });
    const foundOrders = await Order.find({ ordererInfo: { User: foundUser._id } })
      .populate({
        path: "ordererInfo",
        populate: {
          path: "User",
          // model: "User",
        },
      })
      // .populate("ordererInfo")
      .exec();

    // out
    console.log({ foundOrders });
    return res.status(200).json({ orders: foundOrders });
  } catch (error: any) {
    console.log("error : ", error);
    return res.status(500).json({ error: error.message });
  }
};
