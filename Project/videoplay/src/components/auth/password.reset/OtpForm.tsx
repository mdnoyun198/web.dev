'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type OtpFormProps = {
    email: string;
};

const OtpForm = ({ email }: OtpFormProps) => {
    const router = useRouter();
    const [message, setMessage] = useState("Enter OTP sent to your email");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                router.push('/login');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/auth/password.reset/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();
        setLoading(false);
        setMessage(data.message);

        if (res.ok) {
            setIsSuccess(true);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-2 w-full md:mt-10'>
            <p className={isSuccess ? "text-green-500" : ""}>{message}</p>
            
            <input
                type="text"
                placeholder='Enter OTP'
                className='w-full sm:w-2/3 md:w-3/4 rounded-lg'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
            />
            
            <button
                type='submit'
                disabled={loading || !otp}
                className={`w-full sm:w-2/3 md:w-3/4 rounded-lg bg-pink p-3 text-white transition-opacity hover:opacity-90 ${loading || !otp ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                Verify OTP
            </button>
        </form>
    )
}

export default OtpForm