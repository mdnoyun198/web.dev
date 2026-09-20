'use client'

export default function ReactPromoCard() {
    return (
        <div className="w-full h-full   rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-background/40 backdrop-blur-sm">
            {/* Spinning React Logo */}
            <div className="mb-5">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                    alt="React Logo"
                    className="w-20 h-20 animate-[spin_15s_linear_infinite]"
                />
            </div>

            {/* Content */}
            <div className="space-y-3 max-w-sm">
                <h3 className="text-lg font-bold text-black dark:text-white">
                    Next.js & React Native Secure Video Marketing Platform
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    এটি মূলত একটি সিকিউর (Secure) ভিডিও মার্কেটিং প্ল্যাটফর্ম। ওয়েব অ্যাপ্লিকেশনের জন্য এতে Next.js এবং অ্যান্ড্রয়েড ও আইওএস (iOS) মোবাইল অ্যাপ্লিকেশনের জন্য React Native ব্যবহার করা হয়েছে।
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-(--theme-border) pt-3">
                    💡 এটি শুধুমাত্র একটি ডেমো টেমপ্লেট, এখানে কোনো অর্ডার গ্রহণ করা হয় না। ক্লায়েন্ট প্রয়োজন অনুযায়ী পরবর্তীতে এতে নতুন ফিচার ও ডিটেইলস যুক্ত করা হবে
                </p>
            </div>
        </div>
    )
}