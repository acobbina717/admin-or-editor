import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const passwordMatches = await bcrypt.compare(
          password,
          user.password as string
        );

        if (!passwordMatches) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          id: true,
          image: true,
          roles: true,
        },
      });

      if (user) {
        session.user = user;
      }

      return session;
    },
  },
});
