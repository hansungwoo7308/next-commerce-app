import connectDB from "lib/server/config/connectDB";
import User from "lib/server/models/User";
import verifyJWT from "lib/server/verifyJWT";
connectDB();
export default async function (req: any, res: any) {
  console.log(`\x1b[32m\n[api/user]:::[${req.method}]`);
  switch (req.method) {
    case "GET":
      await getUser(req, res);
      break;
    case "PATCH":
      await updateUser(req, res);
      break;
    default:
      break;
  }
}
const getUser = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // find
    const { _id } = req.query;
    const foundUser = await User.findById(_id).exec();
    if (!foundUser) return res.status(404).json({ message: "Not found" });
    // out
    console.log({ foundUser });
    return res.status(200).json({ user: foundUser });
  } catch (error) {
    console.log({ error });
  }
};
const updateUser = async (req: any, res: any) => {
  try {
    // verify
    const verified: any = await verifyJWT(req, res);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });
    // update
    const { _id, username, email, role, image } = req.body;
    // console.log({ body: req.body });
    const foundUser = await User.findById(_id).exec();
    if (!foundUser) return res.status(404).json({ message: "Not found" });
    if (username) foundUser.username = username;
    if (email) foundUser.email = email;
    if (role) foundUser.role = role;
    if (image) foundUser.image = image;
    const savedUser = await foundUser.save();
    // out
    console.log({ savedUser });
    return res.status(200).json({ updatedUser: savedUser });
  } catch (error) {
    console.log({ error });
  }
};
