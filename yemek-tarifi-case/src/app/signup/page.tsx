"use client";
import React, { useState } from "react";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/signup.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-[#fffdfdf8] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-[#9B1B30] mb-6">
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-bold mb-2">
                            Surname
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Enter your name"
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Enter your email"
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
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9B1B30]"
                            placeholder="Create a password"
                        />
                    </div>
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