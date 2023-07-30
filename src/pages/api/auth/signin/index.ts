import connectDB from "lib/server/config/connectDB";
import User from "lib/server/model/User";
import { createAccessToken, createRefreshToken } from "lib/server/createJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/auth/signin]");
  // get
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and Password are required." });
  // find
  const foundUser = await User.findOne({ email }).exec();
  // console.log("foundUser : ", foundUser);
  if (!foundUser) return res.status(401).json({ message: "Your email was not found in database." });
  // evaluate
  if (foundUser.password !== password)
    return res.status(401).json({ message: "Your password did not match" });
  // issue the tokens
  const payload = {
    id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
    role: foundUser.role,
    image: foundUser.image,
  };
  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);
  // out
  foundUser.refreshToken = refreshToken;
  await foundUser.save();
  // `refreshToken=${refreshToken};HttpOnly;SameSite=None`
  res.setHeader("Set-Cookie", [`refreshToken=${refreshToken};path=/`]);
  res.status(200).json({
    username: foundUser.username,
    role: foundUser.role,
    image: foundUser.image,
    accessToken: accessToken,
    slicedTokens: {
      accessToken: accessToken.slice(-5),
      refreshToken: refreshToken.slice(-5),
    },
  });
  console.log(`\x1b[33maccessToken : ${accessToken.slice(-5)}\x1b[0m`);
  console.log(`\x1b[33mrefreshToken : ${refreshToken.slice(-5)}\x1b[0m`);
}
