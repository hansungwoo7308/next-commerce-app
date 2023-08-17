import User from "lib/server/models/User";
export const signupUser = async (req: any, res: any) => {
  // get
  const { username, email, password } = req.body;
  // find
  const duplicatedUser = await User.findOne({ username }).exec();
  if (duplicatedUser) return res.status(409).json({ message: "Duplicated username" });
  // create
  const user = await User.create({ username, email, password });
  // out
  res.status(201).json({ user });
};
