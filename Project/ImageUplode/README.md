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

---

**পদ্ধতি ২: SVG Vector File (কাস্টম ডিজাইন)**

তুমি চাইলে নিচের SVG কোডটি নিয়ে তোমার প্রজেক্টে `architecture.svg` নামে একটি ফাইল বানিয়ে সেভ করতে পারো। তারপর গিটহাবে আপলোড করে `README.md`-এ এভাবে লিংক করতে পারো: `![Architecture](./architecture.svg)`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="100%" height="100%">
  <style>
    .bg { fill: #0d1117; }
    .box { fill: #161b22; stroke: #30363d; stroke-width: 2; rx: 10; }
    .text-title { fill: #58a6ff; font-family: monospace; font-size: 14px; font-weight: bold; }
    .text-sub { fill: #8b949e; font-family: monospace; font-size: 11px; }
    .arrow { stroke: #238636; stroke-width: 2; marker-end: url(#arrowhead); }
    .arrow-sec { stroke: #d29922; stroke-width: 2; marker-end: url(#arrowhead-sec); }
  </style>
  
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#238636" />
    </marker>
    <marker id="arrowhead-sec" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#d29922" />
    </marker>
  </defs>

  <rect width="100%" height="100%" class="bg" />

  <!-- Nodes -->
  <!-- Client -->
  <rect x="40" y="160" width="140" height="80" class="box" />
  <text x="60" y="195" class="text-title">💻 Client</text>
  <text x="60" y="215" class="text-sub">Browser / App</text>

  <!-- Server -->
  <rect x="280" y="160" width="160" height="80" class="box" stroke="#58a6ff" />
  <text x="295" y="195" class="text-title">🖥️ Next.js Server</text>
  <text x="295" y="215" class="text-sub">Auth &amp; Ownership</text>

  <!-- Database -->
  <rect x="560" y="60" width="160" height="80" class="box" />
  <text x="580" y="95" class="text-title">🗄️ MongoDB</text>
  <text x="580" y="115" class="text-sub">Database Storage</text>

  <!-- Cloudinary -->
  <rect x="560" y="260" width="160" height="80" class="box" />
  <text x="575" y="295" class="text-title">☁️ Cloudinary</text>
  <text x="575" y="315" class="text-sub">Image CDN</text>

  <!-- Connections -->
  <path d="M 180 180 L 270 180" class="arrow" />
  <path d="M 180 210 L 270 210" class="arrow-sec" />
  
  <path d="M 440 180 L 550 100" class="arrow" />
  <path d="M 440 210 L 550 280" class="arrow" />
</svg>
