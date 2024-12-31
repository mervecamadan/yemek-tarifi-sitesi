"use client";
import React, { useState } from "react";
import { signUp } from "../lib/api";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        username: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.trim(),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, surname, email, username, password } = formData;


        if (!name || !surname || !email || !username || !password) {
            setErrorMessage("Lütfen tüm alanları doldurduğunuzdan emin olun.");
            setSuccessMessage("");
            return;
        }

        try {
            const response = await signUp(name, surname, email, username, password);
            if (response.message) {
                setSuccessMessage("Kayıt başarılı! Giriş yapabilirsiniz.");
                setErrorMessage("");
            } else {
                setErrorMessage("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/signup.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-[#fffdfdf8] opacity-95 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-[#9B1B30] mb-1">
                    Create an Account
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="surname" className="block text-sm font-bold mb-2">
                            Surname
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Enter your surname"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Enter your email"
                        />
                    </div>
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
                            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Create a username"
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
                            placeholder="Create a password"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                    )}

                    {successMessage && (
                        <div className="text-green-500 text-sm mb-4">{successMessage}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#A3C586] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#8fb775] transition">
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    <strong>Already have an account?{" "}</strong>
                    <a href="/login" className="text-[#9B1B30] font-bold hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
