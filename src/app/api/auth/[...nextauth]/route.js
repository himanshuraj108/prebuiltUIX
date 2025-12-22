import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Check Admin Hardcoded (Superuser)
                if (
                    credentials?.email === process.env.ADMIN_USERNAME ||
                    credentials?.username === process.env.ADMIN_USERNAME
                ) {
                    if (credentials?.password === process.env.ADMIN_PASSWORD) {
                        return { id: "admin", name: "Administrator", email: "admin@prebuiltuix.com", role: "ADMIN" };
                    }
                }

                // 2. Check Database User
                try {
                    await connectDB();
                    const user = await User.findOne({ email: credentials?.email });

                    if (!user || !user.password) {
                        return null;
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        image: user.image
                    };
                } catch (error) {
                    console.error("Auth Error:", error);
                    return null;
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "mock-id",
            clientSecret: process.env.GITHUB_SECRET || "mock-secret",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                if (token.id) session.user.id = token.id;
                if (token.role) session.user.role = token.role;
                if (token.picture) session.user.image = token.picture; // Ensure image sync
                if (token.name) session.user.name = token.name;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }

            // Handle session update (trigger is "update")
            if (trigger === "update" && session) {
                if (session.name) token.name = session.name;
                if (session.image) token.picture = session.image;
            }

            return token;
        },
        async signIn({ user, account, profile }) {
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
