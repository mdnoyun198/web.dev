'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SignupGoogle from '../SignupGoogle'
import { useRouter, useSearchParams } from 'next/navigation' // <-- useSearchParams অ্যাড করা হয়েছে
import { useLoginAction } from '@/hooks/useLoginAction'


const errorMessages: Record<string, string> = {
    MissingFields: "Email and password are required",
    NoUserFound: "This email does not exist",
    GoogleAccountNoPassword: "This account uses Google Sign-In. Please log in with Google",
    WrongPassword: "Wrong password",
    CredentialsSignin: "Invalid login credentials",
    UserBlocked: "Your account has been suspended or blocked." // <-- নতুন ব্লক মেসেজ অ্যাড করা হয়েছে
};


function LoginForm() {

    const route = useRouter()
    const searchParams = useSearchParams() // <-- URL থেকে ডেটা পড়ার জন্য


    const [formData, setFormdata] = useState({
        email: '',
        password: ''
    })

    const [message, setMessage] = useState('Enter login information')
    const [loading, setLoading] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);


    // <-- গুগল লগইনের এরর ধরার জন্য এই useEffect টা অ্যাড করা হয়েছে -->
        useEffect(() => {
        const error = searchParams.get('error')

        if (error) {
            setMessage(
                errorMessages[error] ??
                "Something went wrong. Please try again."
            )
        }
    }, [searchParams])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || formData.email;
        const password = (form.elements.namedItem('password') as HTMLInputElement)?.value || formData.password;

        const res = await useLoginAction(email, password);

        if (!res.ok) {
            setMessage(errorMessages[res.error] ?? "Something went wrong. Please try again.");
            setLoading(false);
        } else {
            setMessage("Login successful!");
            setIsLoginSuccess(true);

            // router.push('/profile') এর জায়গায় window.location.href ব্যবহার করুন
            window.location.href = '/profile';
        }
    }


    return (<>

        <form onSubmit={handleSubmit} className='flex w-full max-w-md flex-col justify-center items-center gap-5 md:w-[48%]'>
            {/* এখানে message স্টেটটা লাল রঙে বা আপনার পছন্দমতো স্টাইল করে দেখাতে পারেন */}
            <p className={message === 'Enter login information' || isLoginSuccess ? '' : 'text-red-500 text-sm'}>
                {message}
            </p>

            <input
                type='email'
                name='email'
                placeholder="Enter Email"
                className='w-full rounded-lg text-sm'
                value={formData.email}
                onChange={(e) => setFormdata((prev) => ({ ...prev, email: e.target.value }))}
            />
            <input
                type="password"
                name='password'
                placeholder='Password'
                className='w-full rounded-lg text-sm'
                value={formData.password}
                onChange={(e) => setFormdata((prev) => ({ ...prev, password: e.target.value }))}
            />
            <button
                type='submit'
                disabled={loading}
                className='w-full rounded-lg p-3 text-sm font-medium cursor-pointer button transition-opacity hover:opacity-90'>
                {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className='flex flex-col gap-4 w-full'>


                <p className='text-pink self-center cursor-pointer text-sm text-center' >   <Link href="/password.reset" >Forgot your password?</Link></p>

                <SignupGoogle />

                <p className="bottomText text-sm text-center mt-1.5">
                    You have no account?{" "}
                    <Link href='/signup'>
                        <span
                            className="text-pink cursor-pointer hover:underline">
                            Signup
                        </span>
                    </Link>
                </p>
            </div>

        </form >
    </>)
}

export default LoginForm;