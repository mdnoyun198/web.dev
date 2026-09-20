'use client'

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
type PasswordFormProps = {
    email: string;
    setStep: (step: 'email' | 'password' | 'otp') => void;
}

const PasswordForm = ({ email, setStep }: PasswordFormProps) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState("Enter your new password");
    const [loading, setLoading] = useState(false);

    // দুইটা পাসওয়ার্ড সেম কিনা এবং খালি কিনা সেটা চেক করা হচ্ছে
    const isPasswordMatched = password === confirmPassword && password.length > 0;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        // Get values from form elements to handle autofill
        const form = e.currentTarget as HTMLFormElement;
        const passwordValue = (form.elements.namedItem('password') as HTMLInputElement)?.value || password;
        const confirmPasswordValue = (form.elements.namedItem('confirmPassword') as HTMLInputElement)?.value || confirmPassword;

        const res = await fetch('/api/auth/password.reset/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: passwordValue }), // ইমেইল এবং পাসওয়ার্ড পাঠানো হচ্ছে
        });

        const data = await res.json();
        setLoading(false);

        if (res.ok) {
            setStep('otp'); // সব ঠিক থাকলে ওটিপি ফর্মে পাঠানো হলো
        } else {
            setMessage(data.message || "Something went wrong");
        }
    }
    const router = useRouter()

    const { status } = useSession()

    return (
        <form onSubmit={handleSubmit} className='flex w-full max-w-md flex-col justify-center items-center gap-5 md:w-[48%] p-10'>
            <p className={!isPasswordMatched && password.length > 0 ? "text-red-500" : ""}>
                {!isPasswordMatched && password.length > 0 ? "Passwords do not match" : message}
            </p>

            <input
                type='password'
                name='password'
                placeholder="Enter new password"
                className='w-full rounded-lg text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type='password'
                name='confirmPassword'
                placeholder="Confirm new password"
                className='w-full rounded-lg text-sm'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button
                type='submit'
                disabled={loading || !isPasswordMatched}
                className={`w-full rounded-lg p-3 text-sm font-medium transition-opacity hover:opacity-90 button ${loading || !isPasswordMatched ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                Submit
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

export default PasswordForm