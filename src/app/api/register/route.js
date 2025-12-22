import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "USER"
        });

        // Remove password from response
        const { password: _, ...userWithoutPass } = user.toObject();

        return NextResponse.json(userWithoutPass);
    } catch (error) {
        console.error("Registration Error", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
