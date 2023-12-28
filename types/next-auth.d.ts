import { NextAuth, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token: JWT;
    };
  }
}
