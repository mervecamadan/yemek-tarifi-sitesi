"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecipeById } from "../../lib/api";
import { Recipe } from "../../types/recipe";
import { CiTimer } from "react-icons/ci";
import { LuCookingPot } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { BsEmojiSmile } from "react-icons/bs";
import { TbToolsKitchen2 } from "react-icons/tb";
import { AiOutlineFire } from "react-icons/ai";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleFavorite } from "../../redux/favoritesSlice";

type Params = {
    id: string;
};

const RecipeDetail = ({ params }: { params: Params }) => {
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    const resolvedParams = params as Params;

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }

        const fetchData = async () => {
            try {
                const { id } = resolvedParams;
                if (!id) {
                    throw new Error("ID parametresi eksik");
                }

                const data = await getRecipeById(parseInt(id));
                setRecipe(data);
            } catch (error: any) {
                console.error("Tarif yüklenemedi:", error);
                setError("Tarif yüklenemedi, lütfen tekrar deneyin.");
                router.push("/");
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        }
    }, [resolvedParams, router, isAuthenticated]);

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-20">{error}</div>;
    }

    if (!recipe) {
        return <div className="text-center mt-20">Tarif bulunamadı!</div>;
    }

    const isFavorite = recipe.id && favorites.some((favorite) => favorite.id === recipe.id);

    const handleFavorite = () => {
        if (recipe.id) {
            const favoriteRecipe = {
                id: recipe.id,
                name: recipe.name,
                image: recipe.image,
            };
            dispatch(toggleFavorite(favoriteRecipe));
        }
    };

    const handleAddToShoppingList = () => {
        if (recipe) {
            const shoppingListItem = recipe.ingredients.map((ingredient) => ({
                recipeName: recipe.name,
                ingredient: ingredient,
            }));

            const currentList = JSON.parse(localStorage.getItem("shoppingList") || "[]");
            const updatedList = [...currentList, ...shoppingListItem];


            localStorage.setItem("shoppingList", JSON.stringify(updatedList));

            alert("Ingredients added to the shopping list!");
        }
    };



    return (
        <div className="max-w-3xl mx-auto p-20 mt-2">
            <div className="flex justify-center items-center space-x-6">
                <h1 className="text-xl font-bold text-[#9B1B30]">{recipe.name}</h1>
                <button onClick={handleFavorite} aria-label="Add to favorites">
                    {isFavorite ? (
                        <IoIosStar className="text-[#FFD700] text-3xl" />
                    ) : (
                        <IoIosStarOutline className="text-gray-500 text-3xl" />
                    )}
                </button>
            </div>
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-80 h-80 object-cover my-4 rounded-xl mx-auto shadow-2xl"
            />
            <p className="text-xl text-white text-center bg-[#A3C586] font-bold my-6">
                Description {recipe.description}
            </p>
            <p className="flex items-center">
                <CiTimer className="mr-3" />
                <strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes
            </p>
            <p className="flex items-center">
                <LuCookingPot className="mr-3" />
                <strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes
            </p>
            <p className="flex items-center">
                <GoPerson className="mr-3" />
                <strong>Servings:</strong> {recipe.servings}
            </p>
            <p className="flex items-center">
                <BsEmojiSmile className="mr-3" />
                <strong>Difficulty:</strong> {recipe.difficulty}
            </p>
            <p className="flex items-center">
                <TbToolsKitchen2 className="mr-3" />
                <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <p className="flex items-center">
                <AiOutlineFire className="mr-3" />
                <strong>Calories per Serving:</strong> {recipe.caloriesPerServing} kcal
            </p>


            <h2 className="text-xl text-white text-center bg-[#A3C586] font-bold my-6">
                Ingredients
            </h2>

            <ul className="list-disc ml-6">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <button
                onClick={handleAddToShoppingList}
                className="mt-6 px-4 py-2 bg-[#3b5228] text-white rounded-lg"
            >
                Add Ingredients to Shopping List
            </button>
            <h2 className="text-xl text-white text-center bg-[#A3C586] font-bold my-6">
                Instructions
            </h2>
            <ol className="list-decimal ml-6">
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeDetail;
