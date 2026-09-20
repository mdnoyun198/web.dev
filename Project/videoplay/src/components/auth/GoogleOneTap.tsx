"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Script from "next/script";
import { toast } from "react-toastify"; // <-- টোস্ট ইমপোর্ট করা হলো

export default function GoogleOneTap() {
    const { status } = useSession();
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

    useEffect(() => {
        // যদি সেশন লোডিং অবস্থায় থাকে বা ইউজার লগড-ইন থাকে, তবে রিটার্ন করবে
        if (status === "loading" || status === "authenticated") return;

        // যদি ইউজার unauthenticated হয় এবং গুগলের স্ক্রিপ্ট লোড হয়ে থাকে
        if (status === "unauthenticated" && isGoogleLoaded && typeof window !== "undefined") {
            
            // ম্যাজিক ট্রিক: লগআউট করার পর বা প্রম্পট ক্লোজ করার পর গুগলের সেভ করা 
            // 'g_state' কুকি ডিলিট করে দেওয়া হচ্ছে, যাতে প্রম্পটটি সবসময় শো করে।
            document.cookie = "g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";

            const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
            const google = window.google;

            if (!clientId || !google?.accounts?.id) return;

            google.accounts.id.initialize({
                client_id: clientId,
                context: "signin",
                ux_mode: "popup",
                callback: async (response: { credential?: string }) => {
                    if (!response?.credential) return;

                    // এখানে redirect: false দিয়ে কল করা হয়েছে যাতে পেজ রিডাইরেক্ট না হয়
                    const res = await signIn("google-one-tap", {
                        credential: response.credential,
                        redirect: false,
                    });

                    // রেসপন্স চেক করে টোস্ট মেসেজ দেখানোর ব্যবস্থা
                    if (res?.error) {
                        if (res.error === "UserBlocked") {
                            toast.error("Your account has been suspended or blocked.");
                        } else {
                            toast.error("Something went wrong. Please try again.");
                        }
                    } else if (res?.ok) {
                        toast.success("Login successful!");
                        // কোনো রিডাইরেক্ট করা হয়নি, ইউজার যে পেজে আছে সেখানেই থাকবে
                    }
                },
                auto_select: false,
                cancel_on_tap_outside: false,
                // FedCM বর্তমানে গুগলের স্ট্যান্ডার্ড, তাই এটি ডিফল্ট থাকাই ভালো
            });

            // সামান্য ডিলে (delay) দেওয়া হলো যাতে DOM পুরোপুরি রেডি থাকে
            setTimeout(() => {
                google.accounts.id.prompt((notification: any) => {
                    if (notification?.isNotDisplayed?.()) {
                        console.debug(
                            "Google One Tap not displayed:",
                            notification.getNotDisplayedReason?.()
                        );
                    }
                });
            }, 100);
        }
    }, [status, isGoogleLoaded]);

    return (
        <>
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={() => setIsGoogleLoaded(true)} // স্ক্রিপ্ট লোড হলে স্টেট ট্রু হবে
            />
        </>
    );
}

declare global {
    interface Window {
        google?: any;
    }
}