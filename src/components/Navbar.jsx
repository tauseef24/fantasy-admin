import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
        <nav className="w-full bg-gradient-to-tr from-blue-100 to-purple-50 text-huckleberry-700">
            <div className="w-full max-w-7xl mx-auto">
            <div className="flex justify-between h-14 items-center">
                <Link className="flex items-center gap-2" href="#">
                <div className="w-14 h-14">
                    <img
                    src="https://www.legitgambling.com/images/icons/dfs.svg"
                    alt=""
                    />
                </div>
                </Link>
                <nav className="hidden md:flex gap-4">
                <Link
                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                    to="http://localhost:5173/admin/sports"
                >
                    Home
                </Link>
                <Link
                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                    href="#"
                >
                    About
                </Link>
                <Link
                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                    href="#"
                >
                    Services
                </Link>
                <Link
                    className="font-medium flex items-center text-lg transition-colors hover:underline"
                    href="#"
                >
                    Contact
                </Link>
                </nav>
                <Link
                to={"/login"}
                className="border border-slate-300 font-medium rounded-md px-4 py-1.5 text-sm"
                >
                Sign in
                </Link>
            </div>
            </div>
        </nav>
  )
}

export default Navbar