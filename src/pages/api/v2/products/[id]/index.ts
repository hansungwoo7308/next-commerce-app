import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import {
  deleteProduct,
  getProduct,
  updateProductReview,
} from "lib/server/controllers/productControllers";
import { checkRoles, checkAuth } from "lib/server/middleware/auth";
connectDB();
const router = createRouter();
router
  .use(async (req: any, res: any, next: any) => {
    console.log(`\x1b[33m\n[api/v2/products/${req.query.id}]:::[${req.method}]`);
    await next();
  })
  .get(getProduct)
  // protected routes
  .use(checkAuth, checkRoles(["user", "admin"]))
  .patch(updateProductReview)
  .use(checkAuth, checkRoles(["admin"]))
  .delete(deleteProduct);

export default router.handler();
