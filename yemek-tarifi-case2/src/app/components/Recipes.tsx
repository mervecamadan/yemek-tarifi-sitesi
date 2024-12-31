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
import { MdOutlineArrowDropDown } from "react-icons/md";

const MultiSelectDropdown = ({ label, options, selected, onChange }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleCheckboxChange = (option: any) => {
        if (selected.includes(option)) {
            onChange(selected.filter((item: any) => item !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    return (
        <div className="relative">
            <button
                className="p-2 border rounded text-black text-base bg-white w-48"
                onClick={handleToggle}
            >
                {label}
            </button>
            {isOpen && (
                <div className="absolute top-12 left-0 bg-white border rounded shadow-lg z-10 w-48 max-h-60 overflow-y-auto">
                    {options.map((option: any) => (
                        <label
                            key={option}
                            className="p-2 hover:bg-gray-100 flex items-center space-x-2"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

const Recipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [filters, setFilters] = useState({
        prepTimeMinutes: [] as number[],
        cookTimeMinutes: [] as number[],
        servings: [] as number[],
        difficulty: [] as string[],
    });

    const [prepTimeOptions, setPrepTimeOptions] = useState<number[]>([]);
    const [cookTimeOptions, setCookTimeOptions] = useState<number[]>([]);
    const [servingOptions, setServingOptions] = useState<number[]>([]);
    const [difficultyOptions, setDifficultyOptions] = useState<string[]>([]);

    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleFavoriteToggle = (recipe: Recipe, event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(toggleFavorite(recipe));
    };

    const isFavorite = (id: number) => {
        return favorites.some((recipe) => recipe.id === id);
    };

    const applyFilters = () => {
        let filtered = recipes;

        if (filters.prepTimeMinutes.length) {
            filtered = filtered.filter((recipe) =>
                filters.prepTimeMinutes.includes(recipe.prepTimeMinutes)
            );
        }
        if (filters.cookTimeMinutes.length) {
            filtered = filtered.filter((recipe) =>
                filters.cookTimeMinutes.includes(recipe.cookTimeMinutes)
            );
        }
        if (filters.servings.length) {
            filtered = filtered.filter((recipe) =>
                filters.servings.includes(recipe.servings)
            );
        }
        if (filters.difficulty.length) {
            filtered = filtered.filter((recipe) =>
                filters.difficulty.includes(recipe.difficulty)
            );
        }

        setFilteredRecipes(filtered);
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);

        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
                setFilteredRecipes(data);

                const prepTimes = Array.from(new Set(data.map((recipe) => recipe.prepTimeMinutes))).sort((a, b) => a - b);
                const cookTimes = Array.from(new Set(data.map((recipe) => recipe.cookTimeMinutes))).sort((a, b) => a - b);
                const servings = Array.from(new Set(data.map((recipe) => recipe.servings))).sort((a, b) => a - b);
                const difficulties = Array.from(new Set(data.map((recipe) => recipe.difficulty)));

                setPrepTimeOptions(prepTimes);
                setCookTimeOptions(cookTimes);
                setServingOptions(servings);
                setDifficultyOptions(difficulties);
            } catch (error) {
                console.error("Tarifler yüklenemedi:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mt-1 px-8 text-black text-base">
                <div className="flex space-x-10">
                    <MultiSelectDropdown
                        label={
                            <div className="flex justify-center items-center">
                                <span>Prep Time</span>
                                <MdOutlineArrowDropDown className="ml-1 text-gray-500 w-6 h-6" />
                            </div>
                        }
                        options={prepTimeOptions}
                        selected={filters.prepTimeMinutes}
                        onChange={(selected: number[]) =>
                            setFilters((prev) => ({ ...prev, prepTimeMinutes: selected }))
                        }
                    />
                    <MultiSelectDropdown
                        label={
                            <div className="flex justify-center items-center">
                                <span>Cook Time</span>
                                <MdOutlineArrowDropDown className="ml-1 text-gray-500 w-6 h-6" />
                            </div>
                        }
                        options={cookTimeOptions}
                        selected={filters.cookTimeMinutes}
                        onChange={(selected: number[]) =>
                            setFilters((prev) => ({ ...prev, cookTimeMinutes: selected }))
                        }
                    />
                    <MultiSelectDropdown
                        label={
                            <div className="flex justify-center items-center">
                                <span>Servings</span>
                                <MdOutlineArrowDropDown className="ml-1 text-gray-500 w-6 h-6" />
                            </div>
                        }
                        options={servingOptions}
                        selected={filters.servings}
                        onChange={(selected: number[]) =>
                            setFilters((prev) => ({ ...prev, servings: selected }))
                        }
                    />
                    <MultiSelectDropdown
                        label={
                            <div className="flex justify-center items-center">
                                <span>Difficulty</span>
                                <MdOutlineArrowDropDown className="ml-1 text-gray-500 w-6 h-6" />
                            </div>
                        }
                        options={difficultyOptions}
                        selected={filters.difficulty}
                        onChange={(selected: string[]) =>
                            setFilters((prev) => ({ ...prev, difficulty: selected }))
                        }
                    />
                </div>

                <button
                    className="bg-orange-500 text-white px-8 py-2 ml-16 rounded text-base"
                    onClick={applyFilters}
                >
                    Filter
                </button>

                <button
                    className="bg-[#A3C586] text-white px-8 py-2 rounded text-base"
                    onClick={() => {
                        setFilters({
                            prepTimeMinutes: [],
                            cookTimeMinutes: [],
                            servings: [],
                            difficulty: [],
                        });
                        setFilteredRecipes(recipes);
                    }}
                >
                    Clear
                </button>


            </div>

            {/*Tarifler*/}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 mt-12">
                {(filteredRecipes.length > 0 ? filteredRecipes : recipes).map((recipe) => (
                    <div key={recipe.id} className="bg-[#fae7d2] p-4 rounded-lg shadow-xl hover:shadow-xl transition-shadow space-y-3 relative">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="rounded-lg w-full h-72 object-cover mb-2 shadow-md"
                        />

                        <Link href={`/recipe/${recipe.id}`}>
                            <h3 className="text-base font-bold text-[#9B1B30] bg-orange-50 text-center flex items-center justify-center">
                                {recipe.name}
                                <PiCursorClickThin className="ml-3 text-gray-600" />
                            </h3>
                        </Link>

                        {isLoggedIn && (
                            <button
                                onClick={(event) => handleFavoriteToggle(recipe, event)}
                                className="absolute bottom-4 right-4 text-3xl z-10"
                                aria-label="Toggle Favorite"
                            >
                                {isFavorite(recipe.id) ? (
                                    <IoIosStar className="text-orange-500 shadow-lg" />
                                ) : (
                                    <IoIosStarOutline className="text-orange-500 shadow-lg" />
                                )}
                            </button>
                        )}

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
        </div>
    );
};

export default Recipes;
