# Dark / Light Mode Setup (next-themes)

## Install

```bash
npm install next-themes
```

## Files

### `components/DarkLightBtn.tsx`

```tsx
'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

function DarkLightBtn() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch: don't render theme-dependent UI
  // until the client has mounted.
  if (!mounted) {
    return <button className="opacity-0">Theme</button>
  }

  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}

export default DarkLightBtn
```

### `app/layout.tsx`

```tsx
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-row">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### `app/globals.css`

```css
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
  box-sizing: border-box;
  scroll-behavior: smooth;
 /* user-select: none; */
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### `./next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  allowedDevOrigins: ['192.168.0.100'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  
};

export default nextConfig;

```

## Gotchas we hit (and why the fixes work)

1. **Nested `:root` inside `.dark` never matches.**
   `:root` always refers to `<html>` itself — it can't be re-scoped by nesting it inside `.dark`. Variables must be set directly on `.dark`, not on a `:root` nested inside it.

2. **`suppressHydrationWarning` on `<html>`.**
   `next-themes` injects an inline script that sets `class="dark"` / `style="color-scheme: dark"` on `<html>` *before* React hydrates, to avoid a flash of the wrong theme. This intentionally makes the client's `<html>` attributes differ from the server-rendered ones, so React's hydration check will warn unless `suppressHydrationWarning` is set (one level deep — safe here, won't hide real mismatches in children).

3. **`mounted` guard on the toggle button.**
   `theme`/`resolvedTheme` is `undefined` during SSR and on the very first client render (before `next-themes` reads `localStorage`). Rendering theme-dependent output immediately causes a hydration mismatch. Gate the button behind a `mounted` state set in `useEffect` so the first client render matches the server output, then swap in the real button after mount.

4. **Use `resolvedTheme`, not `theme`, for conditional UI.**
   `theme` can be `"system"`; `resolvedTheme` always resolves to the actual applied `"light"` / `"dark"` value.
