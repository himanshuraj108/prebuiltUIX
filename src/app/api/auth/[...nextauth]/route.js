import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Hardcoded generic admin for now
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
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (token?.role) {
                session.user.role = token.role;
            }
            // For database sessions (if not using JWT strategy, though we are)
            if (user?.role) {
                session.user.role = user.role;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role;
            }
            // If user updates session, we can update token here
            return token;
        },
        async signIn({ user, account, profile }) {
            // Ensure connection for any side effects if needed
            await connectDB();
            return true;
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
