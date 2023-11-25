import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

import connectDB from "lib/server/config/connectDB";
import User from "lib/server/models/User";
import bcrypt from "bcrypt";

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../../lib/server/config/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        console.log("\x1b[34m\n<api/auth/[...nextauth]/authorize>\x1b[30m");
        // check
        // if (!credentials) throw new Error("No credentials");

        await connectDB();

        // get
        const { email, password }: any = credentials;

        // find
        const user = await User.findOne({ email })
          // .select("+username +email +role +image")
          .select("-password -refreshToken -createdAt -updatedAt -__v")
          .exec();
        if (!user) throw new Error("Invalid Email");
        console.log({ user });

        // compare
        const salt = 10; // 이동이 필요(서버 회원가입 핸들러에서 처리)
        const hashedPassword = await bcrypt.hash(user.password, salt); // 이동이 필요(서버 회원가입 핸들러에서 처리)
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordMatched) throw new Error("Invalid Password");

        // out
        return user; // 리턴값은 jwt의 user property에 저장한다.
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    NaverProvider({
      // clientId: process.env.NAVER_CLIENT_ID_LOCAL as string,
      // clientSecret: process.env.NAVER_CLIENT_SECRET_LOCAL as string,
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    signIn({ user, account, profile }) {
      console.log("\x1b[34m\n<api/auth/[...nextauth]/signIn>\x1b[30m");
      console.log({ user, account });
      if (account?.provider === "naver") return true;
      return true;
    },

    // client token (jwt)
    async jwt({ token, user, account, trigger, session }: any) {
      console.log("\x1b[34m\n<api/auth/[...nextauth]/jwt>\x1b[30m");

      // client token 에 user 데이터를 저장한다.
      // user : returned value from authorize function
      if (user) token.user = user;
      if (account) token.account = account;

      // client에서 update를 trigger한 경우, 토큰을 업데이트한다.
      // console.log({ trigger, session });
      if (trigger === "update") {
        // console.log({ token });
        token.user = session.user;
        // console.log({ token });
        return token;
        // return {...token,...session.user}
      }

      // console.log({ token });
      return token;
    },

    // server session
    async session({ session, token }: any) {
      console.log("\x1b[34m\n<api/auth/[...nextauth]/session>\x1b[30m");

      // server session 에 user 데이터를 저장한다.
      // token : returned value from jwt function
      if (token.user) session.user = token.user;
      if (token.account) session.account = token.account;

      // console.log({ user: session.user });
      // console.log({ account: session.account });
      console.log({ session });
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
