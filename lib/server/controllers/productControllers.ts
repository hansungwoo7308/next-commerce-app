import Product from "lib/server/models/Product";
import APIfeatures from "lib/server/utils/APIfeatures";
export const newProduct = async (req: any, res: any, next: any) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};
export const getProducts = async (req: any, res: any, next: any) => {
  console.log(`:::[${req.method}]`);
  console.log({ query: req.query });
  // get the total count of products and pages
  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / 3);
  console.log({
    totalProducts,
    totalPages,
  });
  // console.log({ totalPages });
  // query by APIfeatures
  const instance = new APIfeatures(Product.find(), req.query).filter().paginate();
  const products = await instance.queryProducts;
  // const products = await Product.find();
  // console.log({ products });
  // out
  res.status(200).json({ products, pages: totalPages });
};
export const getProduct = async (req: any, res: any, next: any) => {
  const product = await Product.findById(req.query.id);
  if (!product) res.status(404).json({ message: "Not found" });
  res.status(200).json({ product });
};
