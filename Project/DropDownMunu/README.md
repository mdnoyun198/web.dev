This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```
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

```

```
'use client'

import { useState, useEffect, useRef } from "react";

interface DropdownProps {
    options: string[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
}

export default function Dropdown({ options, value, onChange }: DropdownProps) {



    const [isOpen, setIsOpen] = useState(false);


    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutSide(event: MouseEvent) {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [])

    return (
        <div ref={dropdownRef} className="relative w-full">

            <button onClick={() => setIsOpen(!isOpen)} className="w-full border p-2 rounded-lg text-center">
                {value}
            </button>


            {isOpen && (
                <ul className="absolute top-full left-0 w-full border rounded-lg mt-1">

                    {options.map((item, index) => (
                        <li key={index}
                            onClick={() => { onChange(item); setIsOpen(false); }}
                            className="p-2 cursor-pointer text-center">
                            {item}
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}
```
