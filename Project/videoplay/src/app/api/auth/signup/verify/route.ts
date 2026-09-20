import { connectDB } from "@/lib/mongoDB";
import TempUser from "@/models/auth/TempUser";
import User from "@/models/auth/user";
import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        console.log(body)

        const checkTempUser = await TempUser.findOne({ email: body.email, });


        if (!checkTempUser) {
            return NextResponse.json({ message: "Email not found", });
        }


        const isOtpMatch = await bcrypt.compare(body.otp.toString(), checkTempUser.otp);

        if (!isOtpMatch) {
            return NextResponse.json({ message: "Invalid OTP", });
        }


        const createUser = new User({
            name: checkTempUser.name,
            email: checkTempUser.email,
            password: checkTempUser.password,
        });

        await createUser.save();

        await TempUser.findByIdAndDelete(checkTempUser._id);

        return NextResponse.json({ message: "Signup successfully", },{ status: 200, });


    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server Error", }, { status: 500, });
    }


}