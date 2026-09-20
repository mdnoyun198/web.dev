'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type OtpFormProps = {
    email: string;
};

function OtpForm({ email }: OtpFormProps) {

    const router = useRouter();
    const [message, setMessage] = useState("Enter otp");
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

        setLoading(true)
        e.preventDefault();

        const res = await fetch('/api/auth/signup/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                otp,
            }),
        });

        const data = await res.json()
        setLoading(false)
        setMessage(data.message)

        if (res.ok) {
            setIsSuccess(true)
        }

    }


    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center gap-2 w-full md:mt-10'>
            <p>{message}</p>
            <input
                type="text"
                placeholder='Enter OTP'
                className='w-full sm:w-2/3 md:w-3/4 rounded-lg'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button
                type='submit'
                disabled={loading}
                className={`w-full sm:w-2/3 md:w-3/4 rounded-lg bg-pink p-3 text-white  cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            Submit
            </button>


        </form>
    )
}

export default OtpForm
function setOpenForm(arg0: string) {
    throw new Error("Function not implemented.");
}

