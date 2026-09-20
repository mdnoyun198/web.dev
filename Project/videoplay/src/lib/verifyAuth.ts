import { auth } from "@/auth";
import { connectDB } from "@/lib/mongoDB";
import UserModel from "@/models/auth/user";
import sessionModel from "@/models/auth/sessions";
import { cookies } from "next/headers";


interface VerifyAuthResult {
  isValid: boolean;
  user: any | null;
  session: any | null;
  message: string;
}

// Auth.js v5 default cookie নামগুলো — dev এ plain, prod এ __Secure-/__Host- prefix থাকে
const AUTH_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "__Host-authjs.session-token",
  // পুরনো next-auth (v4) নাম রাখলাম safety-র জন্য, লাগলে রাখো নাহলে বাদ দাও
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

/**
 * Auth.js-এর httpOnly session cookie ইনস্ট্যান্টলি ক্লিয়ার করে দেয়।
 * শুধুমাত্র Server Action / Route Handler কনটেক্সটে কাজ করবে।
 * ভুল কনটেক্সটে কল হলে silently fail করবে (crash করবে না)।
 */
async function clearAuthCookie() {
  try {
    const cookieStore = await cookies();
    for (const name of AUTH_COOKIE_NAMES) {
      if (cookieStore.get(name)) {
        cookieStore.delete(name);
      }
    }
  } catch (err) {
    // Server Component context-এ cookies().delete() throw করতে পারে —
    // এটা ইচ্ছাকৃতভাবে ignore করা হচ্ছে যাতে verifyAuth crash না করে
    console.warn("clearAuthCookie: could not clear cookie in this context", err);
  }
}

export async function verifyAuth(): Promise<VerifyAuthResult> {
  try {
    // ১. Auth.js-এর মাধ্যমে বর্তমান রিকোয়েস্টের কুকি/JWT চেক করা
    const authSession = await auth();
    const sessionId = (authSession?.user as any)?.sessionId;

    if (!authSession?.user || !sessionId) {
      await clearAuthCookie();
      return {
        isValid: false,
        user: null,
        session: null,
        message: "Unauthenticated: No session token found",
      };
    }

    await connectDB();

    // ২. ডাটাবেজে সেশনটি আছে কিনা এবং মেয়াদ আছে কিনা চেক করা
    // (dbSession === null মানে হয় sessionId ভুয়া/টেম্পার করা, অথবা TTL index
    // দিয়ে MongoDB নিজে থেকেই ডকুমেন্টটা delete করে ফেলেছে — দুই ক্ষেত্রেই cookie clear করা হবে)
    const dbSession = await sessionModel.findOne({ sessionId });

    if (!dbSession || new Date() > new Date(dbSession.expiresAt)) {
      if (dbSession) {
        await sessionModel.deleteOne({ sessionId });
      }
      await clearAuthCookie();
      return {
        isValid: false,
        user: null,
        session: null,
        message: !dbSession
          ? "Session not found in database"
          : "Session has expired",
      };
    }

    // ৩. সেশনের অধীনে থাকা ইউজার অ্যাকাউন্ট বাস্তবে আছে কিনা চেক করা
    const user = await UserModel.findById(dbSession.userId).select("-password");

    if (!user) {
      await sessionModel.deleteOne({ sessionId });
      await clearAuthCookie();
      return {
        isValid: false,
        user: null,
        session: null,
        message: "Associated user account no longer exists",
      };
    }

    // ৪. সেশন এবং ইউজার দুটিই একদম ভ্যালিড
    return {
      isValid: true,
      user,
      session: dbSession,
      message: "Authenticated successfully",
    };
  } catch (error) {
    // DB কানেকশন ফেইল, অথবা auth() থ্রো করলে যাতে পুরো রিকোয়েস্ট ক্র্যাশ না করে।
    // এখানেও cookie clear করা হচ্ছে, কারণ isValid: false রিটার্ন হওয়ার পরও যদি
    // browser-এ cookie থেকে যায়, তাহলে client-side state আর server-side result
    // মিসম্যাচ হয়ে যেতে পারে (যেমন পরের রিকোয়েস্টেও একই ভুল cookie পাঠাতে থাকবে)।
    console.error("verifyAuth error:", error);
    await clearAuthCookie();
    return {
      isValid: false,
      user: null,
      session: null,
      message: "Something went wrong while verifying authentication",
    };
  }
}


/**
 * ২. মোবাইল অ্যাপের জন্য (Bearer Token Based Authentication)
 * সরাসরি টোকেন (sessionId) প্রপস আকারে গ্রহণ করে ডাটাবেজ যাচাই করবে।
 */
export async function verifyMobileAuth(token: string | null): Promise<VerifyAuthResult> {
  try {
    if (!token) {
      return {
        isValid: false,
        user: null,
        session: null,
        message: "Unauthenticated: Token is missing or invalid format",
      };
    }

    await connectDB();

    // ডাটাবেজে সেশন চেক
    const dbSession = await sessionModel.findOne({ sessionId: token });

    if (!dbSession || new Date() > new Date(dbSession.expiresAt)) {
      if (dbSession) {
        await sessionModel.deleteOne({ sessionId: token });
      }
      return {
        isValid: false,
        user: null,
        session: null,
        message: !dbSession ? "Session not found in database" : "Session has expired",
      };
    }

    // ইউজার ও তার স্ট্যাটাস চেক
    const user = await UserModel.findById(dbSession.userId).select("-password");

    if (!user) {
      await sessionModel.deleteOne({ sessionId: token });
      return {
        isValid: false,
        user: null,
        session: null,
        message: "Associated user account no longer exists",
      };
    }

    if (user.status !== "active") {
      await sessionModel.deleteOne({ sessionId: token });
      return {
        isValid: false,
        user: null,
        session: null,
        message: `Account is ${user.status}`,
      };
    }

    return {
      isValid: true,
      user,
      session: dbSession,
      message: "Authenticated successfully",
    };
  } catch (error) {
    console.error("verifyMobileAuth error:", error);
    return {
      isValid: false,
      user: null,
      session: null,
      message: "Something went wrong while verifying mobile authentication",
    };
  }
}