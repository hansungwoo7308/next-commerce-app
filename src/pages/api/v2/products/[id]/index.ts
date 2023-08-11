import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { deleteProduct, getProduct } from "lib/server/controllers/productControllers";
connectDB();
console.log("\x1b[32m\n[api/v2/product/[id]]");
const router = createRouter();
router.get(getProduct);
router.delete(deleteProduct);
export default router.handler();
