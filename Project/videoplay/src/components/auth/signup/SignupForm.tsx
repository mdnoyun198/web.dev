
'use client'
import Link from 'next/link'
import SignupGoogle from '@/components/auth/SignupGoogle'
import { useState } from 'react';
import OtpForm from './OtpForm';


type SignupProps = {
    setOpenForm?: (open: 'Login') => void;
};

function SignupForm() {

    const [formdata, setFormdata] = useState({

        name: '',
        email: '',
        password: ''

    })

    const [message, setMessage] = useState("Enter Signup information");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'signup' | 'otp'>('signup')
    const [email, setEmail] = useState("");
  


    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        setLoading(true)

        // Get values from form elements to handle autofill
        const form = e.currentTarget as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || formdata.name;
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || formdata.email;
        const password = (form.elements.namedItem('password') as HTMLInputElement)?.value || formdata.password;

        const res = await fetch('/api/auth/signup/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
        });


        if (res.ok) {
            setEmail(email)
            setFormdata({
                name: "",
                email: "",
                password: ""
            });
            setStep('otp')
        }

        const data = await res.json()
        setLoading(false)
        setMessage(data.message)

    }



    return (
        <>
            {step === 'signup' &&

                <form onSubmit={handleSubmit} className='flex w-full max-w-md flex-col justify-center items-center gap-5 md:w-[48%]'>

                    <p>{message}</p>

                    <input
                        type='text'
                        name='name'
                        placeholder="Full Name"
                        className='w-full rounded-lg text-sm'
                        onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder="Enter Email"
                        className='w-full rounded-lg text-sm'
                        onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        className='w-full rounded-lg text-sm'
                        onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className={`w-full rounded-lg p-3 text-sm font-medium cursor-pointer button transition-opacity ${loading && 'opacity-50'}`}>
                        Sign Up
                    </button>

                    <div className='flex flex-col gap-4 w-full'>

                        {/* আপনার গুগল সাইনআপ কম্পোনেন্ট */}
                        <SignupGoogle />

                        <p className="bottomText text-sm text-center mt-1.5">
                            Already have an account?{" "}
                            <Link href='/login'>
                                <span
                                    className="text-pink cursor-pointer hover:underline">
                                    Login
                                </span>
                            </Link>
                        </p>
                    </div>

                </form>
            }


            {step === 'otp' &&
                <OtpForm email={email} />
            }

        </>
    )
}

export default SignupForm
