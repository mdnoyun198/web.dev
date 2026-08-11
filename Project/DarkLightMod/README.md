
`` 
npm install next-themes

``

components/DarkLightBtn.tsx

```
'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"


function DarkLightBtn() {

    const { theme, setTheme } = useTheme()

    return (
        <>
        
            <button onClick={() => setTheme('dark')}>Dark</button>
            <button onClick={() => setTheme('light')}>Light</button>



        </>
    )
}

export default DarkLightBtn


```


layout.tsx

```

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StartWorkBD",
  description: "Welcome to StartworkBD",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>

      <body className="min-h-full flex flex-row">

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>

          {children}
          
        </ThemeProvider>

      </body>

    </html>
  );


}




```


globel.css

```
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html {
  overscroll-behavior: none;
  /* user-select: none; */
  box-sizing: border-box;

}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

```
