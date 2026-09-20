'use client'

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type EmailFormProps = {
    setStep: (step: 'email' | 'password' | 'otp') => void;
    setGlobalEmail: (email: string) => void;
}

const EmailForm = ({ setStep, setGlobalEmail }: EmailFormProps) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState("Enter your registered Email");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        // GET রিকোয়েস্ট পাঠিয়ে চেক করা ইউজার আছে কিনা
        const res = await fetch(`/api/auth/password.reset/submit?email=${email}`, {
            method: 'GET',
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            setGlobalEmail(email); // প্যারেন্ট স্টেটে ইমেইল সেভ করা হলো
            setStep('password');   // পাসওয়ার্ড ফর্মে পাঠানো হলো
        } else {
            setMessage(data.message || "User not found");
        }
    }


    const router = useRouter()

    const { status } = useSession()


    return (
        <form onSubmit={handleSubmit} className='flex w-full max-w-md flex-col justify-center items-center gap-5 md:w-[48%] p-10'>
            <p>{message}</p>

            <input
                type='email'
                placeholder="Enter Email"
                className='w-full rounded-lg text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <button
                type='submit'
                disabled={loading || !email}
                className={`w-full rounded-lg p-3 text-sm font-medium transition-opacity hover:opacity-90 button ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                Next
            </button>

            {status === 'unauthenticated' &&
                <div className='flex flex-col gap-4 w-full'>
                    <p className="bottomText text-sm text-center mt-1.5">
                        Go back to{" "}
                        <Link href='/login'>
                            <span className="text-pink cursor-pointer hover:underline">
                                Login
                            </span>
                        </Link>
                    </p>
                </div>
            }
            {status === 'authenticated' &&
                <div className='flex flex-col gap-4 w-full'>
                    <p className="bottomText text-sm text-center mt-1.5">
                        Go back to{" "}

                        <span
                            onClick={() => router.push('profile')}
                            className="text-pink cursor-pointer hover:underline">
                            Profile
                        </span>

                    </p>
                </div>
            }
        </form>
    )
}

export default EmailForm