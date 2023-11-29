import { nextOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
