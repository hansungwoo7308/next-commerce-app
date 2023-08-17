export default async function (req: any, res: any) {
  console.log("\x1b[32m\n[api/auth/signout]");
  res.setHeader("Set-Cookie", [`refreshToken=;Max-Age=-1;path=/`]);
  res.status(200).json({ message: "Logged Out." });
  console.log("\x1b[34mLogged Out.\x1b[0m");
}
