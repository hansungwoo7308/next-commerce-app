import jwt from "jsonwebtoken";
export default async function (req: any, res: any) {
  console.log("\x1b[32m[lib/server/verifyJWT]");
  // get the accessToken
  const authorization = req.headers.authorization || req.headers.Authorization;
  const accessToken = authorization?.split(" ")[1];
  if (!accessToken) {
    console.log("\x1b[31mNo accessToken");
    // return res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  // console.log("accessToken : ", accessToken?.slice(-5));
  // verify the tokens
  try {
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    // console.log("\x1b[32mverified : ", verified);
    // console.log("verified");
    return verified;
  } catch (error: any) {
    console.log(`\x1b[31merror : ${error}`);
    // res.status(403).json({ error });
    return false;
  }
}
