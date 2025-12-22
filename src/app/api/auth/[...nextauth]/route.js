import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Hardcoded generic admin for this simplified no-auth-db-check requirement
                if (
                    credentials?.username === process.env.ADMIN_USERNAME &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    return { id: "admin", name: "Administrator", email: "admin@prebuiltuix.com", role: "ADMIN" };
                }
                return null;
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "mock-id",
            clientSecret: process.env.GITHUB_SECRET || "mock-secret",
        }),
        // Add GoogleProvider similarly if env vars exist
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (token?.role) {
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
