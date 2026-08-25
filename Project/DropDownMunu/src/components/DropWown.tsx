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