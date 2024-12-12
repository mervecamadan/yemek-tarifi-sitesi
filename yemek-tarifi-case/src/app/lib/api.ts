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
