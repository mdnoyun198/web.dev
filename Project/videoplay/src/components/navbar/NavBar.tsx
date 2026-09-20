'use client'
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, Menu, House, GraduationCap, BookOpenText, Play, UserRound } from "lucide-react"
import DarkLightBtn from "@/components/DarkLightBtn"
import { useSession } from "next-auth/react"

function NavBar() {

  const navLinks = [
    { href: "/", label: "Home", icon: House },
    { href: "/courses", label: "Courses", icon: GraduationCap },
    { href: "/notes", label: "Notes", icon: BookOpenText },
    { href: "/tutorials", label: "Tutorials", icon: Play },
  ]

  const pathname = usePathname()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { status } = useSession()

  return (
    <>
      {/* ================= MOBILE TOP HEADER ================= */}
      <header className="flex md:hidden py-4 px-4 items-center justify-between gap-3 w-full border-b border-(--theme-border)">
        <button className="p-1" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>

        {/* Responsive Clean Search Bar */}
        <div className="flex flex-1 items-center gap-2  border border-(--theme-border)  rounded-full px-4 py-2">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm placeholder:text-gray-400 text-black dark:text-white p-0 no-style "
          />
        </div>

        <DarkLightBtn />
      </header>


      {/* ================= MOBILE BOTTOM NAV ================= */}
      {isMenuOpen && (
        <nav
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-start w-full h-full"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* ৮০% উইডথ কন্টেইনার */}
          <div
            className="w-[70%] sm:w-[60%] h-full bg-background border-r border-(--theme-border) p-5 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* টপ সেকশন: লোগো ও মেনু লিঙ্কস */}
            <div className="flex flex-col gap-6">

              {/* লোগো */}
              <div className="flex items-center justify-between pb-4 border-b border-(--theme-border)">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-bold text-lg">
                  English Learning
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-black dark:hover:text-white p-1 text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              {/* মেনু লিঙ্কস (আইকনসহ) */}
              <ul className="flex flex-col gap-1">
                {navLinks.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link key={index} href={item.href} onClick={() => setIsMenuOpen(false)}>
                      <li
                        className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors 
                        ${isActive ? 'bg-(--theme-color-lite) text-black dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-(--theme-color-lite) dark:hover:bg-neutral-900'}`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </li>
                    </Link>
                  );
                })}
              </ul>

            </div>

            {/* বটম সেকশন: লগইন ও সাইনআপ বাটন */}
            <div className="flex flex-col gap-2 pt-4 border-t border-(--theme-border)">
              <button className="w-full text-sm font-medium py-2.5 rounded-md border border-(--theme-border) hover:bg-gray-50 dark:hover:bg-neutral-900 transition">
                Login
              </button>
              <button className="w-full text-sm font-medium py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                Signup
              </button>
            </div>

          </div>
        </nav>
      )}

      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:flex w-full border-b border-(--theme-border) lg:flex-1">
        <div className="w-full max-w-(--max-width) mx-auto flex items-center justify-between py-5 px-4">

          <div className="flex flex-row items-center gap-6">
            {/* Logo */}
            <Link href="/" className="hidden lg:flex items-center gap-1 font-bold text-lg  ">
              <span>English Learning</span>
            </Link>

            {/* Desktop Links */}
            <ul className="flex flex-row items-center gap-2 text-sm font-medium">
              {navLinks.map((item, index) => {
                const isActive = pathname === item.href;

                return (
                  <Link key={index} href={item.href}>
                    <li
                      className={`px-4 py-2 rounded-md flex justify-center items-center transition-colors
                      ${isActive ? 'bg-(--theme-color-lite)' : 'text-gray-600 dark:text-gray-300 hover:bg-(--theme-color-lite) '}`}
                    >
                      <span>{item.label}</span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-5">

            {/* Desktop Search Bar */}
            <div className="flex items-center gap-2  rounded-full px-4 py-1.5 w-full max-w-54 lg:w-64  border border-(--theme-border) focus-ef">
              <Search size={14} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent no-style outline-none w-full text-sm placeholder:text-gray-400 text-black dark:text-white"
              />
            </div>

            {/* Auth Buttons */}
            {status === 'unauthenticated' &&
              <div className="flex items-center gap-2">
                <Link href="/login" >
                  <button className="text-sm font-medium px-6 py-2 rounded-md border border-(--theme-border) transition">
                    Login
                  </button>
                </Link>
                <Link href='/singup'>
                  <button className="text-sm font-medium px-6 py-2 rounded-md border border-(--theme-border) transition">
                    Signup
                  </button>
                </Link>
              </div>
            }

            {status === 'authenticated' &&

              <div className="flex items-center gap-2">

                <Link href='/profile'>
                  <button className="text-sm font-medium px-6 py-2 rounded-md border border-(--theme-border) transition">
                    Account Details
                  </button>
                </Link>
              </div>
            }


            {/* Theme Button */}
            <DarkLightBtn />
          </div>

        </div>
      </nav>

    </>
  )
}

export default NavBar