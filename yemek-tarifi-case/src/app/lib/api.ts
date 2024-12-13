import axios from "axios";
import { Recipe } from "../types/recipe";

interface RecipesResponse {
    recipes: Recipe[];
}

export const getRecipes = async (): Promise<Recipe[]> => {
    try {

        const response = await axios.get<RecipesResponse>("https://dummyjson.com/recipes");

        return response.data.recipes;
    } catch (error) {
        console.error("Tarifleri çekerken bir hata oluştu:", error);
        throw error;
    }
};

export const getRecipeById = async (id: number): Promise<Recipe> => {
    try {
        const response = await axios.get<Recipe>(`https://dummyjson.com/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error(`ID'si ${id} olan tarifi çekerken bir hata oluştu:`, error);
        throw error;
    }
};
