'use client'

import { usePathname } from "next/navigation"
import NavBar from "./NavBar"

function NavBarWrapper() {

    const pathneme = usePathname()

    const notAllwed = ['/admin', '', '']

    if (notAllwed.includes(pathneme)) {

        return null

    }

    return <NavBar />
}

export default NavBarWrapper
