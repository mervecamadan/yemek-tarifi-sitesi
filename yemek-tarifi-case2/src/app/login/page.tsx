"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/api";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const { username, password } = formData;

            await login(username, password);
            localStorage.setItem("username", username);
            console.log("Giriş başarılı! Kullanıcı:", username);

            router.push("/");
        } catch (err) {
            setError("Giriş başarısız. Lütfen kullanıcı adı ve şifrenizi kontrol edin.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-start px-20 bg-[url('/login.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-[#fffdfdfb] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-[#9B1B30] mb-6">
                    Log In
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b1416]"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Enter your password"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#A3C586] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#8fb775] transition">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
