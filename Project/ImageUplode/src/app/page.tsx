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



    </div>
  );
}
