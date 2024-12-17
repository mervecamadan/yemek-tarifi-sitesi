"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Recipe } from "../types/recipe";
import { getRecipes } from "../lib/api";

const Recipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

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
                <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                    <div className="bg-[#f8e0c4] p-4 rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="rounded-lg w-full h-48 object-cover mb-4"
                        />

                        <h3 className="text-lg font-bold text-[#9B1B30] bg-orange-50 text-center">
                            {recipe.name}
                        </h3>

                        <div className="text-sm text-gray-800 mt-2">
                            <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
                            <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
                            <p><strong>Servings:</strong> {recipe.servings}</p>
                            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                            <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing} kcal</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Recipes;
