"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const favoritesCount = useSelector((state: RootState) => state.favorites.favorites.length);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const username = localStorage.getItem("username");
        setIsLoggedIn(!!token);
        setUsername(username);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername(null);
        router.push("/login");
    };

    return (
        <div className="bg-[#9B1B30] text-[#F5F3F0] px-8 py-4 flex justify-between items-center z-20 fixed top-0 left-0 w-full">
            <div className="text-xl font-bold">
                <Link href="/">MC MUTFAK</Link>
            </div>

            <div className="hidden lg:flex space-x-4 text-sm font-bold items-center">
                {isLoggedIn ? (
                    <div className="relative">

                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center focus:outline-none"
                        >
                            <FaUser size={24} />
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-4 text-sm min-w-[250px]">
                                <p className="mb-2">Hoşgeldin, {username || "Kullanıcı"}!</p>
                                <Link
                                    href="/favorites"
                                    className="mb-2 w-full bg-[#A3C586] text-white py-1 rounded hover:bg-[#D1BFA4] flex items-center justify-center"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    Favorilerim {favoritesCount > 0 && `(${favoritesCount})`}
                                </Link>
                                <button
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full bg-[#9B1B30] text-white py-1 rounded hover:bg-[#D1BFA4]"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm border bg-[#D1BFA4] text-white font-bold px-7 py-2 rounded-3xl flex items-center"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm border bg-[#A3C586] text-white px-7 py-2 rounded-3xl font-bold flex items-center"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>

            <div className="lg:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#D1BFA4] text-sm font-bold flex flex-col space-y-4 px-6 py-4 lg:hidden">
                    {isLoggedIn ? (
                        <>
                            <Link href="/favorites" className="block py-2 text-black text-center">
                                Favorilerim {favoritesCount > 0 && `(${favoritesCount})`}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block py-2 bg-[#A3C586] text-center text-black rounded-3xl"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="block py-2 border bg-[#F5F3F0] text-black border-white rounded-3xl text-center"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="block py-2 bg-[#A3C586] text-center text-black rounded-3xl"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
