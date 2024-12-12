"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="bg-[#9B1B30] text-[#F5F3F0] px-6 py-4 flex justify-between items-center relative z-20">
            <div className="text-xl font-bold">
                MC MUTFAK
            </div>

            <div className="hidden lg:flex space-x-2 text-sm font-bold items-center">

                <Link
                    href="/"
                    className="text-sm border bg-[#D1BFA4] border-lime-900 text-white font-bold px-7 py-2 rounded-3xl flex items-center">
                    Log In
                </Link>
                <Link
                    href="/"
                    className="text-sm border bg-[#A3C586] text-white border-lime-900 px-7 py-2 rounded-3xl font-bold flex items-center">
                    Sign Up
                </Link>
            </div>

            <div className="lg:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#D1BFA4] text-sm font-bold flex flex-col space-y-4 px-6 py-4 lg:hidden">
                    <Link
                        href="/"
                        className="block py-2 border bg-[#F5F3F0] text-black border-white rounded-3xl text-center">
                        Log In
                    </Link>
                    <Link
                        href="/"
                        className="block py-2 bg-[#A3C586] text-center text-black rounded-3xl">
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;