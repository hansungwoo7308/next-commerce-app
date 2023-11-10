import Product from "lib/server/models/Product";
import APIfeatures from "lib/server/utils/APIfeatures";

// single
export const createProduct = async (req: any, res: any, next: any) => {
  console.log(`\x1b[32m\n<createProduct>`);
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};
export const createProductReview = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<createProductReview>`);

  // get
  const { id } = req.query;
  // const { review } = req.body;

  // update
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $push: { reviews: req.body } },
    // { $push: { reviews: review } },
    { new: true }
  );

  // out
  console.log({ updatedProduct });
  return res.status(200).json({ updatedProduct });
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
  console.log({ deletedProduct });
  return res.status(200).json({ deletedProduct });
};

// multiple
export const getProducts = async (req: any, res: any, next: any) => {
  // log
  console.log(`\x1b[32m\n<getProducts>`);
  console.log({ query: req.query });

  // create a instance
  const queryInstance = new APIfeatures(Product.find({}), req.query);

  // apply filtering and paginating
  // 쿼리의 필터조건설정
  await queryInstance.filter().paginate();

  // excute the query
  const products = await queryInstance.queryProducts; // 쿼리
  const totalPages = queryInstance.totalPages;

  // paginate
  // 완전히 새로운 작업을 할 때 clone method를 사용한다.
  // 이 메서드는 쿼리객체(queryInstance.queryProducts===Product.find().filter())의 복사본을 생성한다.
  // const paginatedProducts = await queryInstance.queryProducts.clone(); // 쿼리 - 복사본(중복조회회피)

  // out
  console.log({ totalPages });
  console.log({ products });
  res.status(200).json({ products, pages: totalPages });
};
// export const getProductsWithPagination = async (req: any, res: any, next: any) => {
//   console.log(`\x1b[32m\n<getProducts>`);
//   // log
//   console.log({ query: req.query });

//   // get the total count of products
//   const totalProductCount = await Product.countDocuments();
//   console.log({ totalProductCount });

//   // make the queryInstance = Product.find({})
//   const queryInstance = new APIfeatures(Product.find({}), req.query);

//   // filter
//   queryInstance.filter(); // 쿼리의 필터조건설정
//   const filteredProducts = await queryInstance.queryProducts; // 쿼리
//   const filteredProductCount = filteredProducts.length; // 필터링한 총 제품의 수
//   // console.log({ filteredProductCount });

//   // paginate
//   queryInstance.paginate(); // 쿼리의 페이지네이션설정
//   // 완전히 새로운 작업을 할 때 clone method를 사용한다.
//   // 이 메서드는 쿼리객체(queryInstance.queryProducts===Product.find().filter())의 복사본을 생성한다.
//   const paginatedProducts = await queryInstance.queryProducts.clone(); // 쿼리 - 복사본(중복조회회피)
//   const totalPages = Math.ceil(filteredProductCount / 3);
//   console.log({ paginatedProducts });
//   console.log({ totalPages });

//   // out
//   res.status(200).json({ products: paginatedProducts, pages: totalPages });
// };
export const deleteProducts = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteProducts>`);
  const { ids } = req.body;
  const deletedProducts = await Product.deleteMany({ _id: { $in: ids } });
  res.status(200).json({ deletedProducts });
};
export const deleteProductReviews = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<deleteProductReview>`);
  // get
  const { id } = req.query;
  const { ids } = req.body;
  console.log({ id, ids });
  // delete
  const updatedProducts = await Product.findByIdAndUpdate(
    id,
    { $pull: { reviews: { _id: { $in: ids } } } },
    { new: true }
  );
  // const updatedProducts = await Product.deleteMany({ reviews: { _id: { $in: ids } } });
  // out
  console.log({ updatedProducts });
  return res.status(200).json({ updatedProducts });
};
