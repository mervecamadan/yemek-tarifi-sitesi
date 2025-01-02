"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    firstName: string;
    lastName: string;
    age: number;
    username: string;
    image: string;
    email: string;
    phone: string;
    birthDate: string;
    height: number;
    weight: number;
    eyeColor: string;
}

interface UsersResponse {
    users: User[];
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    console.log("user", user);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = localStorage.getItem("username");
                if (!username) {
                    setError("Kullanıcı giriş yapmamış.");
                    return;
                }

                const response = await axios.get<UsersResponse>("https://dummyjson.com/users");
                const users = response.data.users;

                const loggedInUser = users.find((u: User) => u.username === username);
                if (!loggedInUser) {
                    setError("Kullanıcı bulunamadı.");
                    return;
                }

                setUser(loggedInUser);
            } catch (err) {
                setError("Kullanıcı bilgileri yüklenirken bir hata oluştu.");
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!user) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="flex items-center mb-4">
                    <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                    </div>
                </div>
                <p className="text-gray-700">
                    <strong>Age:</strong> {user.age}
                </p>
                <p className="text-gray-700">
                    <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700">
                    <strong>Phone:</strong> {user.phone}
                </p>
                <p className="text-gray-700">
                    <strong>Birth Date:</strong> {new Date(user.birthDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                    <strong>Height:</strong> {user.height}
                </p>
                <p className="text-gray-700">
                    <strong>Weight:</strong> {user.weight}
                </p>
                <p className="text-gray-700">
                    <strong>Eye Color:</strong> {user.eyeColor}
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;
