import connectDB from "lib/server/config/connectDB";
import User from "lib/server/models/User";
connectDB();
export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/auth/signup]");
  // check the method
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Your request is not POST method." });
  }
  // get
  const { username, email, password, passwordConfirm }: any = req.body;
  // find
  const duplicatedUser = await User.findOne({ username }).exec();
  if (duplicatedUser) {
    // Conflict(충돌)
    console.log("\x1b[31mduplicatedUser exist.\x1b[0m");
    return res.status(409).json({ message: "duplicatedUser" });
  }
  // create
  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });
    // console.log("\x1b[33mnewUser : ", newUser);
    console.log("\x1b[33m", { newUser });
    res.status(201).json({ newUser });
  } catch (error: any) {
    console.error(`\x1b[31mCreation Error : \x1b[0m`, error);
    res.status(500).json(error);
  }
}
