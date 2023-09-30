import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { createProductReview } from "lib/server/controllers/productControllers";
import { checkRoles, checkAuth } from "lib/server/middlewares/authMiddlewares";
connectDB();
const router = createRouter();
router
  .use(async (req: any, res: any, next: any) => {
    console.log(`\x1b[33m\n[api/v2/products/${req.query.id}]/review:::[${req.method}]`);
    await next();
  })
  // .get(getProduct)
  // protected routes
  .use(checkAuth, checkRoles(["user", "admin"]))
  .post(createProductReview);
// .use(checkAuth, checkRoles(["admin"]))
// .delete(deleteProduct);

export default router.handler();