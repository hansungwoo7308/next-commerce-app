import Product from "lib/server/models/Product";
import Order from "lib/server/models/Order";
import User from "lib/server/models/User";

export const createOrder = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<createOrder>`);
  try {
    // get the order information
    console.log({ "req.body": req.body });
    const { ordererInfo, productInfo, deliveryInfo, payInfo } = req.body.order;

    // check the stock
    console.log("checking stock...");
    const { _id }: any = productInfo.product;
    const { quantity } = productInfo.product.options[0];
    // console.log({ product: productInfo.product });
    console.log({ quantity });
    const foundProduct: any = await Product.findOne({ _id }).exec();
    if (!foundProduct) throw new Error("No found product");
    if (foundProduct.stock < quantity)
      throw new Error("The quantity in stock is less than what was ordered.");
    if (!foundProduct.stock) throw new Error("Out stock");
    // if(!foundProduct) return res.status(404).json({message:'No found product'})

    // update
    foundProduct.stock -= quantity;
    foundProduct.sold += quantity;
    const savedProduct = await foundProduct.save();
    console.log({ savedProduct });

    // create an order
    const order = await Order.create(req.body.order);
    // paid: true,
    // dateOfPayment: details.create_time,
    // paymentId: details.paymentId,
    // method: "paypal",

    // out
    console.log({ order });
    return res.status(200).json({ order });
    // return res.status(200).json({ order });
  } catch (error: any) {
    console.log({ error });
    return res.status(500).json({ error: error.message });
  }
};
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
          model: "User",
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
