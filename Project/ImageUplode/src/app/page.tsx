"use client"

import { useState } from "react";
import Image from "next/image";

export default function Home() {

  const [img, setImg] = useState<File | null | undefined>(null)

  console.log(img)

  async function sendImage(e: React.ChangeEvent<HTMLInputElement>) {

    const selectFile = e.target.files?.[0]

    console.log(selectFile)

    setImg(selectFile)

  }




  const [image, setImage] = useState<File | null>(null)

  async function imageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  }







  
  return (
    <div className="w-full bg-red-500 p-5 flex justify-center">

      {img && <Image
        width={100}
        height={100}
        src={URL.createObjectURL(img)}
        alt="img"
      />

      }

      <input
        className="bg-amber-600 border"
        type="file"
        onChange={sendImage}
        multiple
      />


        <div className="relative cursor-pointer">
          <label>
            <input
              onChange={(e) => { e.target.files && setImage(e.target.files[0]) }}
              type="file" className="hidden" />

            <div className="h-20 w-20 flex items-center justify-center rounded-full border">
             
            </div>

            <div className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full border">
              
            </div>
          </label>
        </div>

    </div>
  );
}
