/* eslint-disable */
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("env", process.env.BASE_API_URL);
          console.log("login", process.env.LOGIN);
          console.log("nextsecret", process.env.NEXTAUTH_SECRET);
          const currentOrigin = req?.headers?.origin;
          const res = await fetch(
            `${process.env.BASE_API_URL}${process.env.LOGIN}`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: {
                "Content-Type": "application/json",
                Origin: currentOrigin,
              },
            }
          );
          const user = await res.json();
          console.log("res111:", user);

          if (!res.ok) {
            throw new Error(user.errors.message);
          }

          if (res.ok && user) {
            return user;
          }
        } catch (e) {
          console.log("error", e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async session({ session, token, user }) {
      session.user.token = token;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Set the debug option to true
});

export { handler as GET, handler as POST };
