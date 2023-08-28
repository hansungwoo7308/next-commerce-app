import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { deleteProduct, getProduct } from "lib/server/controllers/productControllers";
import { checkRoles, checkAuth } from "lib/server/middleware/auth";
connectDB();
const router = createRouter();
router.use(async (req: any, res, next) => {
  console.log(`\x1b[32m\n[api/v2/products/${req.query.id}]:::[${req.method}]`);
  await next();
});
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[32m<getProduct>`);
    await next();
  })
  .get(getProduct);
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[32m<deleteProduct>`);
    await next();
  })
  // verify
  .use(checkAuth, checkRoles(["admin"]))
  // delete
  .delete(deleteProduct);
// .delete((req: any, res: any) => {
//   res.status(200).json({ message: "deleteProduct" });
// })
export default router.handler();
