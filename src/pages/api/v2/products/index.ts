import connectDB from "lib/server/config/connectDB";
import { getProducts, newProduct } from "lib/server/controllers/productControllers";
import { createRouter } from "next-connect";
const router = createRouter();
connectDB();
console.log("\x1b[32m\n[api/v2/products]");
router.get(getProducts);
router.post(newProduct);
export default router.handler();
