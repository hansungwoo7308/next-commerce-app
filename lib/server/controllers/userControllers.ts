import User from "lib/server/models/User";

export const updateUser = async (req: any, res: any) => {
  console.log(`\x1b[32m\n<updateUser>`);
  // console.log({ "req.body": req.body });

  // get
  const { id } = req.user;
  console.log({ user: req.user, body: req.body });

  // find
  const foundUser = await User.findById(id).exec();
  console.log({ foundUser });
  for (let key in req.body) {
    // if (req.body[key]) console.log({ key, value: req.body[key] });
    if (req.body[key]) {
      // console.log({ [key]: req.body[key] });
      if (key === "images") {
        foundUser.image = req.body[key][0].url;
        continue;
      }
      foundUser[key] = req.body[key];
    }
  }

  // save
  const savedUser = await foundUser.save();
  console.log({ savedUser });

  // out
  return res.status(200).json({ savedUser });
};
