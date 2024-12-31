"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import Link from "next/link";
import { toggleFavorite } from "../redux/favoritesSlice";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    const handleFavoriteToggle = (id: number, name: string, image: string) => {
        dispatch(toggleFavorite({ id, name, image }));
    };

    return (
        <div className="p-24">
            {favorites.length > 0 ? (
                <ul className="space-y-4 text-[#A3C586] font-extrabold">
                    {favorites.map(({ id, name, image }) => (
                        <li
                            key={id}
                            className="flex items-center justify-center space-x-6 pb-4"
                        >
                            <div className="bg-[#fae7d2] p-4 rounded-lg shadow-xl flex items-center justify-start relative">

                                <button
                                    onClick={() => handleFavoriteToggle(id, name, image)}
                                    className="absolute top-2 right-2 text-3xl"
                                >
                                    {favorites.some((recipe) => recipe.id === id) ? (
                                        <IoIosStar className="text-[#FFD700]" />
                                    ) : (
                                        <IoIosStarOutline className="text-gray-500" />
                                    )}
                                </button>

                                <img
                                    src={image}
                                    alt={name}
                                    className="w-48 h-48 object-cover rounded-lg shadow-lg"
                                />

                                <div className="flex flex-col items-start justify-between ml-6 w-64">
                                    <h2 className="text-xl font-semibold">{name}</h2>
                                    <Link
                                        href={`/recipe/${id}`}
                                        className="text-white bg-orange-500 font-bold border border-orange-500 px-4 py-2 rounded hover:bg-orange-600 mt-1"
                                    >
                                        Tarif Detayına Git
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="font-bold text-2xl flex justify-center">
                    You haven't added any recipes
                </p>
            )}
        </div>
    );
};

export default FavoritesPage;