import { NextRequest, NextResponse } from "next/server";
import { verifyMobileAuth } from "@/lib/verifyAuth";

export async function GET(req: NextRequest) {
  // ১. রিকোয়েস্ট থেকে Bearer টোকেন বের করা
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.startsWith("Bearer ") 
    ? authHeader.split(" ")[1] 
    : null;

  // ২. হেল্পার ফাংশনে প্রপস হিসেবে টোকেন পাস করা
  const authResult = await verifyMobileAuth(token);

  // ৩. ভ্যালিড না হলে ৪০১ রেসপন্স পাঠানো
  if (!authResult.isValid) {
    return NextResponse.json(
      { valid: false, message: authResult.message },
      { status: 401 }
    );
  }

  // ৪. ভ্যালিড হলে ২০০ রেসপন্স পাঠানো
  return NextResponse.json(
    {
      valid: true,
      user: authResult.user,
      message: authResult.message,
    },
    { status: 200 }
  );
}