import { createAccessToken, createRefreshToken } from "lib/server/utils/createJWT";
import User from "lib/server/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const updateUser = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<updateUser>`);
  console.log({ "req.body": req.body });

  // get
  const { _id, username, email, role, image } = req.body;

  return res.status(200).json({ message: "test..." });
};
