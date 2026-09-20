'use client'

import { useTheme } from "next-themes"
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from "react";

function DarkLightBtn() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Next.js এর Hydration error এড়ানোর জন্য এই useEffect ব্যবহার করতে হয়
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-6 h-6"></div>;

    return (
        <>
            {resolvedTheme === 'dark' ? (
                <button className="text-neutral-300" onClick={() => setTheme('light')}><Sun /></button>
            ) : (
                <button className="text-neutral-600" onClick={() => setTheme('dark')}><Moon /></button>
            )}
        </>
    )
}

export default DarkLightBtn