import Product from "lib/server/models/Product";
import APIfeatures from "lib/server/utils/APIfeatures";
import verifyJWT from "lib/server/utils/verifyJWT";
export const newProduct = async (req: any, res: any, next: any) => {
  console.log(`\x1b[32m\n<newProduct>`);
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};
export const getProducts = async (req: any, res: any, next: any) => {
  console.log(`\x1b[32m\n<getProducts>`);
  // log
  console.log({ query: req.query });

  // get the total count of products
  const totalProductCount = await Product.countDocuments();
  console.log({ totalProductCount });

  // make the queryInstance = Product.find({})
  const queryInstance = new APIfeatures(Product.find({}), req.query);

  // filter
  queryInstance.filter(); // 쿼리의 필터조건설정
  const filteredProducts = await queryInstance.queryProducts; // 쿼리
  const filteredProductCount = filteredProducts.length; // 필터링한 총 제품의 수
  // console.log({ filteredProductCount });

  // paginate
  queryInstance.paginate(); // 쿼리의 페이지네이션설정
  // 완전히 새로운 작업을 할 때 clone method를 사용한다.
  // 이 메서드는 쿼리객체(queryInstance.queryProducts===Product.find().filter())의 복사본을 생성한다.
  const paginatedProducts = await queryInstance.queryProducts.clone(); // 쿼리 - 복사본(중복조회회피)
  const totalPages = Math.ceil(filteredProductCount / 3);
  console.log({ paginatedProducts });
  console.log({ totalPages });

  // out
  res.status(200).json({ products: paginatedProducts, pages: totalPages });
};
export const getProduct = async (req: any, res: any, next: any) => {
  console.log(`\x1b[32m\n<getProduct>`);

  const product = await Product.findById(req.query.id);
  if (!product) res.status(404).json({ message: "Not found" });
  res.status(200).json({ product });
};
export const deleteProduct = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteProduct>`);
  // get
  const { id } = req.query;
  // delete
  const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
  // out
  console.log({ deletedProduct: deletedProduct });
  return res.status(200).json({ deleteProduct });
};
export const deleteProducts = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteProducts>`);
  const { ids } = req.body;
  const deletedProducts = await Product.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ deletedProducts });
};
