import Product from "lib/server/models/Product";

export async function newProduct(req: any, res: any, next: any) {
  const product = await Product.create(req.body);
  res.status(200).json({ product });
}
