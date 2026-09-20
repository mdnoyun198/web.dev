import "server-only";
import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "./lib/mongoDB";
import UserModel from "./models/auth/user";
import session from "./models/auth/sessions";
import { OAuth2Client } from "google-auth-library";

export const runtime = "nodejs";

// এনভায়রনমেন্ট ভ্যারিয়েবল ভ্যালিডেশন হেল্পার (undefined হলে সার্ভার স্টার্টেই এরর দিবে)
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

// Google Client ইনিশিয়ালাইজ করা হলো
const googleAuthClient = new OAuth2Client(requireEnv("AUTH_GOOGLE_ID"));

export class CustomAuthError extends CredentialsSignin {
  code: string;
  constructor(code: string) {
    super();
    this.code = code;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: requireEnv("AUTH_GOOGLE_ID"),
      clientSecret: requireEnv("AUTH_GOOGLE_SECRET"),
    }),

    // আপনার আগের ইমেইল/পাসওয়ার্ড প্রোভাইডার (একদম অক্ষত আছে)
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new CustomAuthError("MissingFields");
        }

        await connectDB();
        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) throw new CustomAuthError("NoUserFound");

        if (user.status === "blocked") throw new CustomAuthError("UserBlocked");

        if (!user.password) throw new CustomAuthError("GoogleAccountNoPassword");

        const isPasswordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );
        if (!isPasswordMatch) throw new CustomAuthError("WrongPassword");

        const userAgent = req?.headers?.get("user-agent") || "Unknown Device";
        const ipAddress =
          req?.headers?.get("x-forwarded-for") ||
          req?.headers?.get("x-real-ip") ||
          "Unknown IP";
        const sessionId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

        await session.create({ userId: user._id.toString(), sessionId, userAgent, ipAddress, expiresAt });

        return { id: user._id.toString(), name: user.name, email: user.email, sessionId };
      },
    }),

    // Google One Tap এর জন্য আলাদা প্রোভাইডার
    Credentials({
      id: "google-one-tap",
      name: "Google One Tap",
      credentials: {
        credential: { type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.credential) {
          throw new CustomAuthError("MissingGoogleToken");
        }

        try {
          const ticket = await googleAuthClient.verifyIdToken({
            idToken: credentials.credential as string,
            audience: requireEnv("AUTH_GOOGLE_ID"),
          });

          const payload = ticket.getPayload();
          if (!payload) throw new CustomAuthError("InvalidGoogleToken");

          await connectDB();
          let user = await UserModel.findOne({ email: payload.email });

          if (user && user.status === "blocked") {
            throw new CustomAuthError("UserBlocked");
          }

          if (!user) {
            user = await UserModel.create({
              name: payload.name,
              email: payload.email,
              image: payload.picture,
            });
          }

          const userAgent = req?.headers?.get("user-agent") || "Unknown Device";
          const ipAddress =
            req?.headers?.get("x-forwarded-for") ||
            req?.headers?.get("x-real-ip") ||
            "Unknown IP";
          const sessionId = crypto.randomUUID();
          const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

          await session.create({
            userId: user._id.toString(),
            sessionId,
            userAgent: "Google One Tap",
            ipAddress,
            expiresAt,
          });

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            sessionId,
          };
        } catch (error) {
          console.error("One Tap Error:", error);
          if (error instanceof CustomAuthError) throw error;
          throw new CustomAuthError("GoogleOneTapFailed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials" || account?.provider === "google-one-tap") {
        return true;
      }

      await connectDB();
      let existingUser = await UserModel.findOne({ email: user.email });

      if (existingUser && existingUser.status === "blocked") {
        throw new CustomAuthError("UserBlocked");
      }

      if (!existingUser) {
        existingUser = await UserModel.create({ name: user.name, email: user.email, image: user.image });
      }

      if (account?.provider === "google") {
        const sessionId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
        await session.create({ userId: existingUser._id.toString(), sessionId, userAgent: "Google OAuth", ipAddress: "Unknown IP", expiresAt });

        (user as any).sessionId = sessionId;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.sessionId = (user as any).sessionId;
      return token;
    },
    async session({ session, token }) {
      if (token?.sessionId) (session.user as any).sessionId = token.sessionId;
      return session;
    },
  },

  events: {
    async signOut(message) {
      const sessionId = (message as any)?.token?.sessionId;
      if (sessionId) {
        await connectDB();
        await session.deleteOne({ sessionId });
      }
    },
  },
});