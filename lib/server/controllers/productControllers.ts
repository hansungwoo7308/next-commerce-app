import Product from "lib/server/models/Product";
import APIfeatures from "lib/server/utils/APIfeatures";
import verifyJWT from "lib/server/utils/verifyJWT";
export const newProduct = async (req: any, res: any, next: any) => {
  // // verify
  // const verified: any = await verifyJWT(req, res);
  // if (verified.role !== "user") return res.status(403).json({ message: "Forbidden" });
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};
export const getProducts = async (req: any, res: any, next: any) => {
  console.log({ query: req.query });
  // get the total count of products
  const totalProductCount = await Product.countDocuments();
  // const totalPages = Math.ceil(productCount / 3);
  // make the queryInstance = Product.find({})
  const queryInstance = new APIfeatures(Product.find({}), req.query);
  // filter
  queryInstance.filter(); // 쿼리의 필터조건설정
  const filteredProducts = await queryInstance.queryProducts; // 쿼리
  const filteredProductCount = filteredProducts.length; // 필터링한 총 제품의 수
  // paginate
  queryInstance.paginate(); // 쿼리의 페이지네이션설정
  // 완전히 새로운 작업을 할 때 clone method를 사용한다.
  // 이 메서드는 쿼리객체(queryInstance.queryProducts===Product.find().filter())의 복사본을 생성한다.
  const paginatedProducts = await queryInstance.queryProducts.clone(); // 쿼리 - 복사본(중복조회회피)
  // out
  res.status(200).json({ products: paginatedProducts, pages: Math.ceil(filteredProductCount / 3) });
};
export const getProduct = async (req: any, res: any, next: any) => {
  const product = await Product.findById(req.query.id);
  if (!product) res.status(404).json({ message: "Not found" });
  res.status(200).json({ product });
};
export const deleteProduct = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (verified.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    // delete
    const { id } = req.query;
    const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
    // out
    console.log({ deletedProduct: deletedProduct });
    return res.status(200).json({ deleteProduct });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
