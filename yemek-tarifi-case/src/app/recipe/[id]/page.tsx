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

type Params = {
    id: string;
};

const RecipeDetail = ({ params }: { params: Params }) => {
    const router = useRouter();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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

    return (
        <div className="max-w-4xl mx-auto p-20 mt-6">
            <h1 className="text-3xl font-bold text-[#9B1B30] text-center">{recipe.name}</h1>
            <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-96 object-cover my-4 rounded-lg"
            />
            <p className="text-2xl text-white text-center bg-[#A3C586] font-bold my-6">Description {recipe.description}</p>
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

            <h2 className="text-2xl text-white text-center bg-[#A3C586] font-bold my-6">Ingredients</h2>
            <ul className="list-disc ml-6">
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2 className="text-2xl text-white text-center bg-[#A3C586] font-bold my-6">Instructions</h2>
            <ol className="list-decimal ml-6">
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeDetail;
