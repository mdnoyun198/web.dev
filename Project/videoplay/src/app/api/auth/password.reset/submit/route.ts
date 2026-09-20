import { connectDB } from "@/lib/mongoDB";
import user from "@/models/auth/user"; // Main User Model
import PasswordReset from "@/models/auth/PasswordReset";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/lib/cnd/sendMail";
import { otpMail } from '@/utils/email/passwordResetOTP';

// GET: Check if the email exists in the main user collection (Step 1)
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        
        // URL থেকে email প্যারামিটার নেওয়া হচ্ছে
        const searchParams = req.nextUrl.searchParams;
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const requestedEmail = email.toLowerCase();
        const checkUser = await user.findOne({ email: requestedEmail });

        if (!checkUser) { 
            return NextResponse.json({ message: "No account found with this email" }, { status: 404 }); 
        }

        return NextResponse.json({ message: "User verified successfully" }, { status: 200 });

    } catch (error) {
        console.error("GET Submit Error:", error);
        return NextResponse.json({ message: 'Server error, please try again later' }, { status: 500 });
    }
}

// POST: Save hashed password, generate OTP, and send email (Step 2)
export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        if (!body.email || !body.password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const requestedEmail = body.email.toLowerCase();

        // Security check: Check again if user exists to prevent direct API hitting
        const checkUser = await user.findOne({ email: requestedEmail });
        if (!checkUser) { 
            return NextResponse.json({ message: "No account found with this email" }, { status: 404 }); 
        }

        // Generate OTP and hashes
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpHash = await bcrypt.hash(otp.toString(), 10);
        const passwordHash = await bcrypt.hash(body.password, 12);

        // Check if a reset request already exists
        const existingReset = await PasswordReset.findOne({ email: requestedEmail });

        if (existingReset) {
            existingReset.otp = otpHash;
            existingReset.password = passwordHash;
            existingReset.try = 0; // Reset try limit
            await existingReset.save();
        } else {
            const createReset = new PasswordReset({
                email: requestedEmail,
                otp: otpHash,
                password: passwordHash, // Saving new password in the temporary collection
                try: 0
            });
            await createReset.save();
        }

        // Send OTP via email
        const mail = otpMail(checkUser.name || "User", otp); 
        await sendMail({
            to: requestedEmail,
            subject: "Password Reset OTP",
            html: mail.html 
        });

        return NextResponse.json({ message: "OTP sent successfully to your email" }, { status: 200 });

    } catch (error) {
        console.error("POST Submit Error:", error);
        return NextResponse.json({ message: 'Server error, please try again later' }, { status: 500 });
    }
}