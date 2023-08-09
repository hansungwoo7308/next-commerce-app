import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { getProducts, newProduct } from "lib/server/controllers/productControllers";
connectDB();
console.log("\x1b[32m\n[api/v2/products]");
const router = createRouter();
router.get(getProducts);
router.post(newProduct);
export default router.handler();
