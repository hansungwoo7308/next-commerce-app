import Product from "lib/server/models/Product";

export const newProduct = async (req: any, res: any, next: any) => {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};

export const getProducts = async (req: any, res: any, next: any) => {
  const products = await Product.find();
  res.status(200).json({ products });
};
