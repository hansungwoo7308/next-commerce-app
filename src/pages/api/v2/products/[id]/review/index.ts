import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import {
  createProductReview,
  deleteProductReviews,
} from "lib/server/controllers/productControllers";
import { checkRoles, checkAuth } from "lib/server/middlewares/authMiddlewares";

connectDB();

// const postRouter = createRouter()
//   .post(checkAuth, checkRoles(["user"]))
//   .post(createProductReview);

// const deleteRouter = createRouter()
//   .delete(checkAuth, checkRoles(["admin"]))
//   .delete(deleteProductReview);

const router = createRouter()
  .use(async (req: any, res: any, next: any) => {
    console.log(`\x1b[33m\n[api/v2/products/${req.query.id}/review]:::[${req.method}]`);
    await next();
  })
  .post(checkAuth, checkRoles(["user"]))
  .post(createProductReview)
  .delete(checkAuth, checkRoles(["admin"]))
  .delete(deleteProductReviews);
// .use(postRouter, deleteRouter);

export default router.handler();
