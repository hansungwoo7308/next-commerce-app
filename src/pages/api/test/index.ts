import connectDB from "lib/server/config/connectDB";
import { newProduct } from "lib/server/controllers/productControllers";
import { createRouter } from "next-connect";
const router = createRouter();
connectDB();
router.post(newProduct);
export default router.handler();
