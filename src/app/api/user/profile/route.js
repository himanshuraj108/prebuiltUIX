import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function GET(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await User.findById(session.user.id).select("-password");

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            console.log("Profile API: No session found");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const data = await req.json();
        const userId = session.user.id;
        console.log("Profile API: Updating user", userId);

        if (!userId) {
            console.log("Profile API: Session missing User ID");
            return new NextResponse("Session missing User ID - Try Relogin", { status: 404 });
        }

        const user = await User.findById(userId);

        if (!user) {
            console.log("Profile API: User not found in DB");
            return new NextResponse("User not found in DB", { status: 404 });
        }

        // 1. Update Basic Info (Name, Image)
        if (data.name) user.name = data.name;
        if (data.image) user.image = data.image;

        // 2. Change Password
        if (data.newPassword) {
            // If user has a password (credentials user), verify old password
            if (user.password) {
                if (!data.currentPassword) {
                    return new NextResponse("Current password is required", { status: 400 });
                }
                const isValid = await bcrypt.compare(data.currentPassword, user.password);
                if (!isValid) {
                    return new NextResponse("Incorrect current password", { status: 400 });
                }
            }
            // Hash and set new password
            const hashedPassword = await bcrypt.hash(data.newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully", user: { name: user.name, image: user.image } });

    } catch (error) {
        console.error("Profile Update Error:", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const userId = session.user.id;

        // Safety check handled by UI, but could double check here if needed? 
        // For now, simple delete.
        await User.findByIdAndDelete(userId);

        return new NextResponse("Account deleted", { status: 200 });

    } catch (error) {
        console.error("Delete Account Error:", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}
