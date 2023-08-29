import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { deleteProducts, getProducts, newProduct } from "lib/server/controllers/productControllers";
import { checkAuth, checkRoles } from "lib/server/middleware/auth";
connectDB();
const router = createRouter();

// routes
router.use(async (req: any, res, next) => {
  console.log(`\x1b[32m\n[api/v2/products]:::[${req.method}]`);
  await next();
});
router.get(getProducts);

// protected routes
router.use(checkAuth, checkRoles(["admin"]));
router.post(newProduct);
router.delete(deleteProducts);

// router
//   .use(async (req: any, res, next) => {
//     console.log(`\x1b[32m<getProduct>`);
//     console.log({ auth: req.headers.authorization });
//     await next();
//   })
//   // read
//   .get(getProducts);
// router
//   .use(async (req: any, res, next) => {
//     console.log(`\x1b[32m<newProduct>`);
//     await next();
//   })
//   // verify
//   .use(checkAuth, checkRoles(["admin"]))
//   // create
//   .post(newProduct);

export default router.handler();
