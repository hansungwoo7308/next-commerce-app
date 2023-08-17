import connectDB from "lib/server/config/connectDB";
import { signupUser } from "lib/server/controllers/authControllers";
import { createRouter } from "next-connect";
connectDB();
console.log("\x1b[32m\n[api/v2/products]");
const router = createRouter();
router.post(signupUser);
export default router.handler();
