import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import client from "@/db";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(client),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin"
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "abc@xyz.com"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials.password) {
                return null;
            }
            const existingUser = await client.user.findFirst({
                where: {
                    email: credentials.email
                }
            });
            if(existingUser) {
                const user = await bcrypt.compare(credentials.password, existingUser.password);
                if(user) {
                    return {
                        id: existingUser.id.toString(),
                        username: existingUser.username,
                        email: existingUser.email
                    }
                }else{
                    return null
                }
            }else{
                return null
            }
          }
        })
    ]
}