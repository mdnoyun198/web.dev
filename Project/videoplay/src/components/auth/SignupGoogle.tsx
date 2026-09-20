"use client";

import Image from "next/image";
import { signIn } from "next-auth/react"

export default function SignupGoogle() {



  return (
    <div className="w-full mt-1 border dark:border-neutral-700 border-neutral-300 rounded-md">
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        type="button"
        className="signup-google w-full px-4 py-2 flex gap-2 items-center justify-center rounded-lg duration-150 h-13 sm:h-11 cursor-pointer"
      >
        <Image
          className="w-6 h-6"
          src="/icone/google.svg"
          alt="google logo"
          width={24}
          height={24}
          loading="lazy"
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
