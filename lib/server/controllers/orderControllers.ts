import Product from "lib/server/models/Product";
import Order from "lib/server/models/Order";

export const createOrder = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<createOrder>`);
  try {
    // get the order information
    console.log({ "req.body": req.body });
    const order = req.body;
    const { ordererInfo, productInfo, deliveryInfo, payInfo } = order;

    // check the product stock
    // 주문가능한지, 재고를 확인해본다.
    // flag 변수 : 재고가 있으면 count, 없으면 no count
    console.log("checking stock...");
    const { _id, quantity }: any = productInfo.product;
    const foundProduct: any = await Product.findOne({ _id }).exec();
    if (!foundProduct) throw new Error("No found product");
    if (!foundProduct.stock < quantity)
      throw new Error("The quantity in stock is less than what was ordered.");
    if (!foundProduct.stock) throw new Error("Out stock");
    // if(!foundProduct) return res.status(404).json({message:'No found product'})

    // // update the product in database
    // let updatedProducts = [];
    // for (const item of cart) {
    //   const { _id, quantity } = item;
    //   const updated = await updateProduct({ _id, quantity });
    //   updatedProducts.push(updated);
    // }

    // // create an order
    // const order = await Order.create({
    //   User: verified.id,
    //   address,
    //   mobile,
    //   cart,
    //   total,
    //   // paid: true,
    //   // dateOfPayment: details.create_time,
    //   // paymentId: details.paymentId,
    //   // method: "paypal",
    // });

    // out
    // console.log({ order });
    return res.status(200).json({ order: "completed." });
    // return res.status(200).json({ order });
  } catch (error: any) {
    console.log({ error });
    return res.status(500).json({ error: error.message });
  }
};
