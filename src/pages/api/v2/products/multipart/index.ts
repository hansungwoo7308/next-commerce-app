import connectDB from "lib/server/config/connectDB";
import { createRouter } from "next-connect";
import { checkAuth, checkRoles } from "lib/server/middlewares/authMiddlewares";
import {
  uploadImagesToServer,
  uploadImagesToCloudinary,
} from "lib/server/middlewares/uploadMiddlewares";
import { newProduct } from "lib/server/controllers/productControllers";
import { PageConfig } from "next";

connectDB();
const router = createRouter();
router
  .use(async (req: any, res, next) => {
    console.log(`\x1b[33m\n[api/v2/products/multipart]:::[${req.method}]`);
    await next();
  })

  // protected routes
  .use(checkAuth, checkRoles(["admin"]))

  // handle the multipart data
  // Not need to parse
  .use(uploadImagesToServer)
  .post(uploadImagesToCloudinary)
  .post(newProduct);

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
export default router.handler();
