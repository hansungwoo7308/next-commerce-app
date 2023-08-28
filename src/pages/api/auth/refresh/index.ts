import User from "lib/server/models/User";
import jwt from "jsonwebtoken";
import connectDB from "lib/server/config/connectDB";
import { createAccessToken, createRefreshToken } from "lib/server/utils/createJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/auth/refresh]");

  // get the refreshToken
  const { refreshToken } = req.cookies;
  // console.log("refreshToken : ", refreshToken?.slice(-5));
  // console.log({ refreshToken: refreshToken?.slice(-5) });
  if (!refreshToken) {
    console.log(`\x1b[31mNo refreshToken.\x1b[0m`);
    return res.status(401).json({ message: "Unauthorized" });
  }
  // find the User
  const foundUser = await User.findOne({ refreshToken }).exec();
  // console.log("foundUser : ", foundUser);
  if (!foundUser) {
    console.log(`\x1b[31mThe foundUser do not exist.\x1b[0m`);
    return res.status(401).json({ message: "The foundUser do not exist." });
  }
  // verify the refreshToken
  // let verified: any;
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    if (error) {
      console.log(`\x1b[31mThe refreshToken was expired.\x1b[0m`);
      return res.status(403).json({ error });
      // foundUser.refreshToken = [...newRefreshTokenArray];
      // const result = await foundUser.save();
      // console.log(`result : `, result);
    }
  }
  // issue the new tokens
  const payload = {
    id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
    role: foundUser.role,
    image: foundUser.image,
  };
  const newAccessToken = createAccessToken(payload);
  const newRefreshToken = createRefreshToken(payload);
  // save
  foundUser.refreshToken = newRefreshToken;
  await foundUser.save();
  // out
  res.setHeader("Set-Cookie", [`refreshToken=${newRefreshToken};path=/`]);
  res.status(200).json({
    user: { ...foundUser._doc, password: null, refreshToken: newRefreshToken.slice(-5) },
    accessToken: newAccessToken,
  });
  // console.log("\x1b[33m", {
  //   newAccessToken: newAccessToken.slice(-5),
  //   newRefreshToken: newRefreshToken.slice(-5),
  // });
}
