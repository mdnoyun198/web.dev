import { connectDB } from "@/lib/mongoDB";
import user from "@/models/auth/user";
import PasswordReset from "@/models/auth/PasswordReset";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        if (!body.email || !body.otp) {
            return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
        }

        const requestedEmail = body.email.toLowerCase();

        // 1. Find the temporary reset data
        const resetData = await PasswordReset.findOne({ email: requestedEmail });

        if (!resetData) {
            return NextResponse.json({ message: "OTP expired or invalid request. Please start again." }, { status: 400 });
        }

        // 2. Check maximum try limit (e.g., 3 tries max)
        if (resetData.try >= 3) {
            await PasswordReset.deleteOne({ email: requestedEmail }); // Delete for security
            return NextResponse.json({ message: "Too many failed attempts. Please submit a new request." }, { status: 400 });
        }

        // 3. Verify OTP using bcrypt
        const isOtpValid = await bcrypt.compare(body.otp.toString(), resetData.otp);

        if (!isOtpValid) {
            // Increase try count if OTP is wrong
            resetData.try += 1;
            await resetData.save();
            return NextResponse.json({ message: `Invalid OTP. You have ${3 - resetData.try} attempts left.` }, { status: 400 });
        }

        // 4. OTP is correct: Update the main user's password
        const mainUser = await user.findOne({ email: requestedEmail });
        
        if (!mainUser) {
            return NextResponse.json({ message: "Main user account not found." }, { status: 404 });
        }

        // Transfer the hashed password from PasswordReset to main user
        mainUser.password = resetData.password;
        await mainUser.save();

        // 5. Delete the temporary document after successful password change
        await PasswordReset.deleteOne({ email: requestedEmail });

        return NextResponse.json({ message: "Password updated successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return NextResponse.json({ message: 'Server error, please try again later' }, { status: 500 });
    }
}