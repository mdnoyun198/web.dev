'use client'
import { useState } from "react";
import DropWown from "@/components/DropWown";

export default function Home() {
  const arr = ['noyun', 'rokey', 'robin']
  const [name, setname] = useState('hello')

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <div className="w-50">
        <p>{name}</p>



        <DropWown
          options={arr}
          value={name}
          onChange={(value) => { setname(value) }}
        />


      </div>

    </div>
  );
}
