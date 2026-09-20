'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"
import ProfileEdit from './ProfileEdit'
import OrderStatus from './OrderStatus'

type dataType = {
    name: string,
    email: string,
    image?: string | null,
    address: string,
    phone: string,
}

function ProfileBox() {

    const [openForm, setOpenForm] = useState('profile')

    const { data: session, status } = useSession()
    const router = useRouter()

    // TypeScript-এ empty object ({}) দিলে এরর আসতে পারে, তাই null ব্যবহার করা ভালো
    const [data, setData] = useState<dataType | null>(null)

    // ডেটা ফেচিংয়ের জন্য নতুন State
    const [isFetching, setIsFetching] = useState(true)

    // ProfileBox.tsx

    useEffect(() => {
        let cancelled = false;

        async function profileData() {
            setIsFetching(true); // ফেচিং শুরুর আগে true নিশ্চিত করুন
            try {
                const res = await fetch('/api/profile', {
                    method: 'GET'
                });

                if (res.ok) {
                    const json = await res.json();
                    if (!cancelled) {
                        setData(json);
                    }
                } else {
                    console.error("Profile API response standard error:", res.status);
                }
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                if (!cancelled) {
                    setIsFetching(false);
                }
            }
        }

        if (status === 'authenticated') {
            profileData();
        } else if (status === 'unauthenticated') {
            setIsFetching(false);
        }

        return () => {
            cancelled = true;
        };
    }, [status]);


    // Auth স্ট্যাটাস লোডিং অথবা ডেটা ফেচিং যেকোনো একটি চললেই Loading কম্পোনেন্ট দেখাবে
    if (status === 'loading' || isFetching) {
        return <Loading />
    }

    // সেশন না থাকলে বা ডেটা না এলে null রিটার্ন করবে
    if (!session || !data) {
        return null
    }
    return (<>

        {openForm === 'profile' &&

            <div className="min-h-full w-full max-w-125 sm:theme-border  mx-auto p-5 rounded-lg">

                <div className="w-30 h-30 justify-self-center rounded-full  overflow-hidden">
                    <Image
                        alt='profile'
                        src={data.image ? data.image : '/icone/profile.svg'}
                        width={100}
                        height={100}
                        priority
                        loading="eager"
                        className={`w-full h-full object-cover ${!data.image ? '' : ''}`}
                    />
                </div>
                <div className="mt-4 flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold ">{data.name}</h2>
                    <p className="mt-1 text-sm font-medium ">{data.email}</p>
                </div>

                <div className="mt-5 grid w-full grid-cols-2 gap-3 text-sm">

                    <button
                        onClick={() => setOpenForm('profileEdit')}
                        className="cursor-pointer justify-center rounded-lg theme-border  p-3  font-medium  ">

                        Profile Edit

                    </button>

                    <button
                        onClick={() => setOpenForm('orders')}
                        className="cursor-pointer justify-center rounded-lg theme-border p-3  font-medium  ">
                        Order Status

                    </button>

                </div>



                {/* Delivery Information Section */}
                <div className="mt-5 flex flex-col gap-3 w-full rounded-xl   p-4 theme-border relative">

                    <h3 className="text-md">Delivery Information</h3>

                    <p className="text-sm">{data.address}</p>

                    <p className="text-sm">{data.phone}</p>

                    <button
                        onClick={() => setOpenForm('profileEdit')}
                        className="absolute top-0 right-0 m-3 cursor-pointer ">
                        <Image
                            alt="pencil"
                            src='/icone/pencil.svg'
                            width={20}
                            height={20}
                            className="dark:invert"
                        />
                    </button>
                </div>


                {/* Actions / Buttons */}
                <div className="mt-10 w-full">
                    <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="w-full rounded-xl p-3 bg-red-500/10 text-red-500 cursor-pointer">
                        Sign Out
                    </button>
                </div>

            </div>

        }

        {openForm === 'profileEdit' && <ProfileEdit setOpenForm={setOpenForm} />}

        {openForm === 'orders' && <OrderStatus setOpenForm={setOpenForm} />}

    </>)
}

export default ProfileBox
