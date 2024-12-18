import axios from "axios";
import { Recipe } from "../types/recipe";

interface RecipesResponse {
    recipes: Recipe[];
}

interface LoginResponse {
    token: string;
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

export const login = async (username: string, password: string): Promise<string> => {
    try {
        const response = await axios.post<LoginResponse>("https://dummyjson.com/auth/login", {
            username,
            password,
        });

        const { token } = response.data;
        localStorage.setItem("authToken", token);
        return token;
    } catch (error) {
        console.error("Giriş işlemi sırasında bir hata oluştu:", error);
        throw error;
    }
};


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");


    if (config && config.headers) {
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            delete config.headers["Authorization"];
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
