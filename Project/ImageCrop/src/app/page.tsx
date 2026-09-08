'use client'

import Image from "next/image";
import { useState } from "react";
import ImageCropperModal from "@/components/ImageCropperModal";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);         // সার্ভারে পাঠানোর ফাইল
  const [url, setUrl] = useState<string | null>(null);           // ফাইনাল প্রিভিউ URL
  const [tempUrl, setTempUrl] = useState<string | null>(null);   // ক্রপারকে দেওয়ার জন্য অস্থায়ী URL

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedUrl = URL.createObjectURL(e.target.files[0]);
      setTempUrl(selectedUrl); // টেম্পোরারি URL সেট করলে মডাল ওপেন হবে
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-4">

      {/* ফাইনাল প্রিভিউ বক্স */}
      <div className="relative w-96 aspect-square overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
        {url && (
          <Image
            src={url}
            alt="Cropped Preview"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* ফাইল ইনপুট */}
      <input type="file" accept="image/*" onChange={handleImageSelect} />

      {/* যদি tempUrl থাকে তবে ক্রপ করার মডালটি চালু হবে */}
      {tempUrl && (
        <ImageCropperModal
          imageSrc={tempUrl}
          onCropDone={(croppedFile, croppedUrl) => {
            setImage(croppedFile); // ১. ফাইনাল ফাইল পেয়ে গেলাম (সার্ভারের জন্য)
            setUrl(croppedUrl);     // ২. ফাইনাল URL পেয়ে গেলাম (Next.js Image-এর জন্য)
            setTempUrl(null);       // ৩. মডাল বন্ধ করলাম
          }}
          onCancel={() => setTempUrl(null)}
        />
      )}

    </div>
  );
}