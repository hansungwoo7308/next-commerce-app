import connectDB from "lib/server/config/connectDB";
import { getProducts, newProduct } from "lib/server/controllers/productControllers";
import { createRouter } from "next-connect";
const router = createRouter();
connectDB();
router.get(getProducts);
router.post(newProduct);
export default router.handler();
