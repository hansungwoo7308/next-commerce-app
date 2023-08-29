import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

// import cookie from "cookie";
export const checkAuth = async (req: any, res: any, next: any) => {
  console.log("\x1b[32m\n<middleware/checkAuth>");
  // console.log(Object.keys(req));

  // get the accessToken
  const authorization = req.headers.authorization || req.headers.Authorization;
  const accessToken = authorization?.split(" ")[1];
  // console.log({ accessToken });

  // verify
  const verified: any = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (!verified) return res.status(401).json({ message: "Unauthorized" });
  console.log({ verified });

  // inject the role
  const { role } = verified;
  // console.log({ "req.user": req.user });
  const user = { role };
  req.user = user;
  // console.log({ "req.user": req.user });

  return await next();

  // get the credentials from session and cookies
  // const cookies = cookie.parse(req.headers.cookie)
  const session: any = await getSession({ req });
  const token = await getToken({ req });
  const { refreshToken } = req.cookies;
  console.log({ session });
  // console.log({ token, session, refreshToken });
  if (!session) throw new Error("No session");
  if (session.user?.role !== "admin") throw new Error("No admin");
  // if (!refreshToken) throw new Error("No refreshToken");

  // add a property
  req.user = session.user;

  // out
  await next();
};
export const checkRoles = (roles: any) => {
  return async (req: any, res: any, next: any) => {
    console.log("\x1b[32m\n<middleware/checkRoles>");
    console.log({ "req.user.role": req.user.role });
    // await next();
    // return;

    if (!roles.includes(req.user.role)) {
      throw new Error(`Role (${req.user.role}) is not allowed to access this resource.`);
    }
    await next();
  };
};
