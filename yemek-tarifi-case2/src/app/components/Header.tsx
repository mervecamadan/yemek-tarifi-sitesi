"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaUser } from "react-icons/fa6";
import { searchRecipes } from "../lib/api";
import { Recipe } from '../types/recipe';

// Debounce fonksiyonu burada tanımlandı
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>): void => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Recipe[]>([]);
    const favoritesCount = useSelector((state: RootState) => state.favorites.favorites.length);
    const router = useRouter();
    const userMenuRef = useRef<HTMLDivElement>(null);

    const debounceSearch = useCallback(
        debounce(async (query: string) => {
            if (query.trim()) {
                try {
                    const results = await searchRecipes(query);
                    setSearchResults(results);
                } catch (error) {
                    console.error("Arama hatası:", error);
                }
            } else {
                setSearchResults([]);
            }
        }, 400),
        []
    );

    useEffect(() => {
        debounceSearch(searchTerm);
    }, [searchTerm, debounceSearch]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const username = localStorage.getItem("username");
        setIsLoggedIn(!!token);
        setUsername(username);

        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
            if (menuOpen) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuOpen]);

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
                <Link href="/">MC KITCHEN</Link>
            </div>

            <div className="flex items-center relative">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-2 py-1 rounded-lg text-black text-sm w-56"
                />
                {searchResults.length > 0 && (
                    <ul className="absolute mt-2 bg-white text-black rounded-lg shadow-lg w-48 max-h-60 overflow-y-auto top-full">
                        {searchResults.map((recipe) => (
                            <li key={recipe.id} className="px-4 py-2 hover:bg-gray-200 text-base">
                                <Link href={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex space-x-4 text-sm font-bold items-center">
                {isLoggedIn ? (
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center focus:outline-none"
                        >
                            <FaUser size={24} />
                        </button>
                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-4 text-sm min-w-[200px]">
                                <p className="mb-2">Welcome, {username || "Kullanıcı"}!</p>
                                <Link
                                    href="/profile"
                                    className="mb-2 w-full bg-[#A3C586] text-white py-1 rounded hover:bg-[#D1BFA4] flex items-center justify-center"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/favorites"
                                    className="mb-2 w-full bg-orange-500 text-white py-1 rounded hover:bg-[#D1BFA4] flex items-center justify-center"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    Favorites {favoritesCount > 0 && `(${favoritesCount})`}
                                </Link>

                                <Link
                                    href="/shoppinglist"
                                    className="mb-2 w-full bg-[#669df0] text-white py-1 rounded hover:bg-[#D1BFA4] flex items-center justify-center"
                                    onClick={() => setUserMenuOpen(false)}
                                >
                                    Shopping List
                                </Link>

                                <button
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full bg-[#9B1B30] text-white py-1 rounded hover:bg-[#D1BFA4]"
                                >
                                    LOG OUT
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm border bg-[#D1BFA4] text-white font-bold px-7 py-2 rounded-3xl flex items-center justify-center"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm border bg-[#A3C586] text-white px-7 py-2 rounded-3xl font-bold flex items-center justify-center"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
