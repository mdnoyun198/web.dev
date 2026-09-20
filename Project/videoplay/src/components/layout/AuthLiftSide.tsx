'use client'

import Image from "next/image"

function AuthLiftSide() {
    return (
        <div className="flex flex-col md:mt-10 items-center gap-2 md:gap-5 w-full md:w-[32%] text-center">
            <div className="flex items-center gap-2 shrink-0">
                <Image
                    src="/icone/logo.svg"
                    height={34}
                    width={34}
                    alt="logo"
                />
                <span className="text-lg lg:text-xl font-bold text-pink mt-2">
                    ShopHub
                </span>
            </div>
            <h1 className="hidden md:block">Welcome to ShopHub</h1>
        </div>
    )
}

export default AuthLiftSide
