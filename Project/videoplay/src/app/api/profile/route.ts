import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "@/lib/verifyAuth";
import { connectDB } from "@/lib/mongoDB";
import userModel from "@/models/auth/user";

export async function GET() {
    try {
        const { isValid, user } = await verifyAuth();

        if (!isValid) {
            return NextResponse.json({ message: 'not valid' }, { status: 401 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'server error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { isValid, user } = await verifyAuth();

        if (!isValid) {
            return NextResponse.json({ message: 'not valid' }, { status: 401 });
        }

        const data = await request.json();
        const updateFields: Record<string, any> = {};

    
        if (data.name && data.name !== user.name) {
            updateFields.name = data.name;
        }
        if (data.email && data.email !== user.email) {
            updateFields.email = data.email;
        }
        if (data.address && data.address !== user.address) {
            updateFields.address = data.address;
        }
        if (data.phone && data.phone !== user.phone) {
            updateFields.phone = data.phone;
        }
        if (data.image && data.image !== user.image) {
            updateFields.image = data.image;
        }


        if (Object.keys(updateFields).length === 0) {
            return NextResponse.json({ message: 'No changes found' }, { status: 400 });
        }

        await connectDB();

        const updateUser = await userModel.findByIdAndUpdate(user._id, { $set: updateFields },  { new: true }).select("-password");

        return NextResponse.json( { message: "Profile update successfully", user: updateUser }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'server error' }, { status: 500 });
    }
}