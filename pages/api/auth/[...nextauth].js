import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/helpers/connectMongo";
import User from "@/models/userModel";

export const authOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: { type: "password" },
      },
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({ email: credentials.email });
        await db.disconnect();
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export default handler;
