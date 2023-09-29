import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import {
  uploadImagesToServer,
  uploadImagesToCloudinary,
} from "lib/server/middlewares/uploadMiddlewares";
import { deleteProducts, getProducts, newProduct } from "lib/server/controllers/productControllers";
import { PageConfig } from "next";
connectDB();
const router = createRouter();
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[32m\n[api/v2/products]:::[${req.method}]`);
    await next();
  })
  .get(getProducts)
  // protected routes
  .use(checkAuth, checkRoles(["admin"]))
  .use(uploadImagesToServer)
  .post(uploadImagesToCloudinary)
  .post(newProduct)
  .delete(deleteProducts);
export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default router.handler();
