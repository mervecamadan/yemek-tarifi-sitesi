"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Recipe } from "../types/recipe";
import { getRecipes } from "../lib/api";
import { PiCursorClickThin } from "react-icons/pi";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleFavorite } from "../redux/favoritesSlice";

const Recipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    const handleFavoriteToggle = (recipe: Recipe, event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(toggleFavorite(recipe));
    };

    const isFavorite = (id: number) => {
        return favorites.some((recipe) => recipe.id === id);
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
            } catch (error) {
                console.error("Tarifler yüklenemedi:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 mt-8">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="bg-[#fae7d2] p-4 rounded-lg shadow-xl hover:shadow-xl transition-shadow space-y-5 relative">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="rounded-lg w-full h-48 object-cover mb-4"
                    />

                    <Link href={`/recipe/${recipe.id}`}>
                        <h3 className="text-lg font-bold text-[#9B1B30] bg-orange-50 text-center flex items-center justify-center">
                            {recipe.name}
                            <PiCursorClickThin className="ml-3 text-gray-600" />
                        </h3>
                    </Link>

                    <button
                        onClick={(event) => handleFavoriteToggle(recipe, event)}
                        className="absolute bottom-4 right-4 text-3xl z-10"
                        aria-label="Toggle Favorite"
                    >
                        {isFavorite(recipe.id) ? (
                            <IoIosStar className="text-orange-500" />
                        ) : (
                            <IoIosStarOutline className="text-orange-500" />
                        )}
                    </button>

                    <div className="text-sm text-gray-800 mt-2">
                        <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
                        <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
                        <p><strong>Servings:</strong> {recipe.servings}</p>
                        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                        <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                        <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing} kcal</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Recipes;