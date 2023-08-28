import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { getProducts, newProduct } from "lib/server/controllers/productControllers";
import { checkAuth, checkRoles } from "lib/server/middleware/auth";
connectDB();
const router = createRouter();
router.use(async (req: any, res, next) => {
  console.log(`\x1b[32m\n[api/v2/products]:::[${req.method}]`);
  await next();
});
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[32m<getProduct>`);
    console.log({ auth: req.headers.authorization });
    await next();
  })
  // read
  .get(getProducts);
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[32m<newProduct>`);
    await next();
  })
  // verify
  .use(checkAuth, checkRoles(["admin"]))
  // create
  .post(newProduct);
export default router.handler();
