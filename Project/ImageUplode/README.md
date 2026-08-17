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

[Client] ──1. Text Post Data──> [/api/posts] ──> [Save in DB] ──> Returns post_id
│
└──2. Image + post_id──────> [/api/upload] ──> [Verify Ownership] ──> [Cloudinary & DB Link]


### ⚙️ Step-by-Step:

* **Step 1: Create Text Post**
  * ইউজার সাবমিট করলে আগে টেক্সট পোস্টটি `/api/posts`-এ যাবে।
  * মঙ্গোডিবি ডকুমেন্ট ক্রিয়েট করে একটা `post_id` রেসপন্সে ফেরত পাঠাবে।

* **Step 2: Upload Image Request**
  * ফ্রন্টএন্ড `post_id` পাওয়ার পর ইমেজ নিয়ে `/api/upload` রাউটে হিট করবে (`type: "post"` সহ)।

* **Step 3: Ownership & Auth Check**
  * **Auth Check:** `verifyAuth()` সেশন ভেরিফাই করবে।
  * **Payload Check:** `post_id` মিসিং থাকলে ❌ `400 Bad Request` হবে।
  * **Ownership Check:** মঙ্গোডিবিতে চেক করা হবে `post.authorId === session.userId` কি না।
    * আইডি ম্যাচ না করলে (Tampering Attempt) ❌ `403 Forbidden` হবে।

* **Step 4: Save & Link**
  * ক্লাউডিনারিতে `public_id: post_<postId>` নামে ফাইল সেভ হবে।
  * মঙ্গোডিবিতে উক্ত পোস্ট আপডেট করে `imageUrl` সেট করা হবে।

---

## 🔒 Security & Edge Cases

| সিনারিও / এটাক টাইপ | সিস্টেমের রেসপন্স ও একশন |
| :--- | :--- |
| **🎯 Burp Suite ID Tampering** | অন্য ইউজারের `post_id` দিলে **Ownership Check** ফেইল করবে ➡️ `403 Forbidden` |
| **🎯 Orphan Image Request** | পোস্ট আইডি ছাড়া রিকোয়েস্ট মারলে ➡️ `400 Bad Request` |
| **🌐 Network Failure (Drop)** | নেট চলে গেলে টেক্সট পোস্ট মঙ্গোডিবিতে সেভ থাকবে, ইমেজ ছাড়া। ইউজার পরে এডিট অপশন থেকে ছবি আপলোড করতে পারবে। |

---

## 📊 Quick API Reference

* **Endpoint:** `/api/upload`
* **Method:** `POST`
* **Body:** `FormData` (`file`, `type`, `postId?`)

```typescript
// Profile Upload Payload
FormData {
  file: File,
  type: "profile"
}

// Post Upload Payload
FormData {
  file: File,
  type: "post",
  postId: "66b1a23c..."
}

import { verifyAuth } from "@/lib/verifyAuth";
import user from "@/models/auth/user";
import { Uploade, Delete } from "@/lib/cnd/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {

        const verification = await verifyAuth()

        if (verification) {

            const formData = await request.formData()

            const image = formData.get('file')

            const type = formData.get('type')

            if (type === 'profile' && image instanceof File) {

                const resUpload = await Uploade(image, 'profile')

                const URL = resUpload.secure_url

                await user.updateOne({ email: verification.user.email }, { $set: { image: URL } })

            }

        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'upload falied' }, { status: 500 })
    }
    
}
---

