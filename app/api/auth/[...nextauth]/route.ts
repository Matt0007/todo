import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import { authConfig } from "@/lib/google/auth/config";
const handler = NextAuth(authConfig as AuthOptions);
export { handler as GET, handler as POST };
