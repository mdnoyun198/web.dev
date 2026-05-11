"use client"
import Image from "next/image";

export default function Home() {
  const handleClick = async () => {


    let data = {
      name: "rokey",
      role: "Coder"
    }


    let a = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })


    let res = await a.json()

    console.log(res)

  }


  return (
    <div>
      <h1 className="text-xl font-bold">Nextjs api route demo</h1>
      <button className="bg-amber-500" onClick={handleClick}>click me</button>
    </div>
  );
}
