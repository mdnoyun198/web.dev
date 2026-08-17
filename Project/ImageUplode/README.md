# 🚀 Image Upload & Security Architecture

Next.js, MongoDB এবং Cloudinary ব্যবহার করে তৈরি করা স্কেলেবল ও সিকিউরড ইমেজ আপলোড আর্কিটেকচার স্ট্র্যাটেজি।

---

## 📌 Architecture Overview

আমাদের সিস্টেমে ২ ধরণের ইমেজ আপলোড ফ্লো কাজ করে:
1. **Profile Picture:** সিঙ্গেল এপিআই কলে ইউজার আইডি দিয়ে ডিরেক্ট আপলোড ও অটো-ওভাররাইট।
2. **Post Image:** টু-স্টেপ (Two-Step) সিকিউরড আপলোড এবং ওনারশিপ ভেরিফিকেশন।

---

## 🔄 Flow 1: Profile Picture Upload

⚡ **প্রসেস:** সিঙ্গেল স্টেপ অটো-ওভাররাইট

`[User Selects Photo]` ➡️ `[onChange Event]` ➡️ `[POST /api/upload]` ➡️ `[Cloudinary Overwrite]`

### ⚙️ Step-by-Step:
* 1️⃣ ইউজার পিকচার সিলেক্ট করার সাথে সাথেই `onChange` ইভেন্ট ট্রিগার হবে।
* 2️⃣ ফাইল নিয়ে `/api/upload` রাউটে যাবে (`type: "profile"` সহ)।
* 3️⃣ ব্যাকএন্ড সেশন ভেরিফাই করে `public_id: user_<userId>` নাম দিয়ে ক্লাউডিনারিতে আপলোড করবে।
* 4️⃣ পুরনো ছবি থাকলে সেটা ক্লাউডিনারিতে অটোমেটিক রিপ্লেস হয়ে যাবে।

---

## 🛡️ Flow 2: Post Image Upload (Two-Step Process)

⚡ **প্রসেস:** টেক্সট সেভ ➡️ ওনারশিপ ভেরিফাই ➡️ ইমেজ আপলোড
