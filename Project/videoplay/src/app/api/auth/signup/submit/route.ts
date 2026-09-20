import { connectDB } from "@/lib/mongoDB";
import user from "@/models/auth/user";
import TempUser from "@/models/auth/TempUser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/lib/cnd/sendMail";
import { otpMail } from '@/utils/email/signupFormOTP';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // ১. ফিল্ড ভ্যালিডেশন
        if (!body.name || !body.email || !body.password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // ২. মেইন ইউজার চেক
        const checkUser = await user.findOne({ email: body.email });
        if (checkUser) { 
            return NextResponse.json({ message: "This email is already used" }, { status: 400 }); 
        }

        // ৩. টেম্পোরারি ইউজার ও ট্রাই লিমিট চেক (কোনো ভারী কাজ করার আগেই)
        const chakTempUser = await TempUser.findOne({ email: body.email });
        if (chakTempUser && chakTempUser.try >= 3) {
            return NextResponse.json({ message: 'Something wrong, try again later' }, { status: 400 });
        }

        // ৪. ওটিপি ও পাসওয়ার্ড হ্যাশিং (চেক পার হওয়ার পর)
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpHash = await bcrypt.hash(otp.toString(), 10);
        const passwordHash = await bcrypt.hash(body.password, 12);

        // ৫. ইমেইল সেন্ড
        const mail = otpMail(body.name, otp);
        await sendMail({
            to: body.email,
            subject: mail.subject,
            html: mail.html
        });

        // ৬. নতুন ইউজার হলে সেভ করে সরাসরি রিটার্ন
        if (!chakTempUser) {
            const createUser = new TempUser({
                name: body.name,
                email: body.email,
                password: passwordHash,
                otp: otpHash,
                try: 1
            });
            await createUser.save();
            return NextResponse.json({ message: 'Submit successfully' },{ status: 200 });
        }

        // ৭. আগের ইউজার হলে আপডেট করে রিটার্ন (এখানে আলাদা else-এর প্রয়োজন নেই)
        chakTempUser.name = body.name;
        chakTempUser.email = body.email;
        chakTempUser.password = passwordHash;
        chakTempUser.otp = otpHash;
        chakTempUser.try = chakTempUser.try + 1;

        await chakTempUser.save();
        return NextResponse.json({ message: "OTP sent again" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}