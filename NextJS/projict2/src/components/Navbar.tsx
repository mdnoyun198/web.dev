'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'


function Navbar() {

    const pathName = usePathname()

    console.log(pathName)

    const navItem =
        [
            {
                'url': '/',
                'label': 'workers',
                'img': '/icon/NavBar/workers.svg'
            },

            {
                'url': '/jobs',
                'label': 'jobs',
                'img': '/icon/NavBar/jobs.svg'
            },

            {
                'url': '/institutions',
                'label': 'institutions',
                'img': '/icon/NavBar/institutions.svg'
            },

            {
                'url': '/chats',
                'label': 'chats',
                'img': '/icon/NavBar/chats.svg'
            },

            {
                'url': '/profile',
                'label': 'profile',
                'img': '/icon/NavBar/profile.svg'
            },


        ]


    return (
        <nav className='border-box fixed bottom-0 w-full h-[10%] lg:fixed lg:top-0 lg:left-0 lg:w-[12%] lg:h-screen lg:flex lg:flex-col lg:justify-start md:fixed md:top-0 md:left-0 md:w-[12%] md:h-screen md:flex md:flex-col md:justify-start z-40 bg-white'>

            {/* লোগো ডেস্কটপ */}
            <div className='hidden md:hidden lg:flex justify-center w-full pt-8 px-4'>
                <Image
                    src="/text.sw.svg"
                    alt="Workers"
                    width={80}
                    height={40}
                    priority
                    style={{ height: 'auto', width: '90%' }}
                />
            </div>

            {/* লোগো ট্যাবলেট */}
            <div className='hidden lg:hidden md:flex justify-center w-full pt-8 px-4'>
                <Image
                    src="/logo.sw.svg"
                    alt="Workers"
                    width={80}
                    height={40}
                    priority
                />
            </div>

            {/* মেনু লিস্ট */}
            <ul className='flex h-full justify-around items-center lg:flex-col lg:justify-start lg:items-start lg:mt-16 lg:gap-8 lg:pl-[20%] md:mt-12 md:flex-col md:justify-start gap-5'>






                {navItem.map((item, index) => {

                    console.log(index)

                    return < Link key={index} href={item.url} className="w-full" >

                        <li className={` flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all text-sm md:flex-col lg:flex-row hover:bg-slate-50 text-black  ${pathName === item.url ? 'isActive' : ''}   `}>
                            <Image
                                src={item.img}
                                alt="Workers"
                                width={25}
                                height={25}
                            />
                            <span className="hidden lg:inline md:inline">{item.label}</span>
                        </li>
                    </Link>


                })}



            </ul>
        </nav >
    )
}

export default Navbar